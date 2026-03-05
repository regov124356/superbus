using API.Data;
using API.DTOs;
using API.Helpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(AppDbContext context, ITokenService tokenService) : ControllerBase
    {

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (loginDto == null)
            {
                return BadRequest(new { message = "Invalid request" });
            }

            if (string.IsNullOrWhiteSpace(loginDto.Username) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest(new { message = "Username and password are required" });
            }

            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            if (!user.IsActive)
            {
                return Unauthorized(new { message = "Account is inactive" });
            }

            // Check if account is locked out
            if (user.LockoutEnd.HasValue && user.LockoutEnd.Value > DateTime.UtcNow)
            {
                var remainingTime = (user.LockoutEnd.Value - DateTime.UtcNow).Minutes;
                return Unauthorized(new { message = $"Account is locked. Try again in {remainingTime} minutes" });
            }

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);

            if (!isPasswordValid)
            {
                // Increment failed login attempts
                user.FailedLoginAttempts++;

                // Lock account after 5 failed attempts
                if (user.FailedLoginAttempts >= 5)
                {
                    user.LockoutEnd = DateTime.UtcNow.AddMinutes(15);
                    await context.SaveChangesAsync();
                    return Unauthorized(new { message = "Account locked due to multiple failed login attempts. Try again in 15 minutes" });
                }

                await context.SaveChangesAsync();
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // Reset failed login attempts on successful login
            user.FailedLoginAttempts = 0;
            user.LockoutEnd = null;

            var token = tokenService.CreateToken(user);
            var refreshToken = tokenService.GenerateRefreshToken();

            // Hash the refresh token before storing
            user.RefreshToken = TokenHasher.HashToken(refreshToken);
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            user.LastLogin = DateTime.UtcNow;

            await context.SaveChangesAsync();

            return Ok(new AuthResponseDto
            {
                Token = token,
                RefreshToken = refreshToken,
                Username = user.Username,
                Role = user.Role
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(RefreshTokenDto refreshTokenDto)
        {
            if (refreshTokenDto == null || string.IsNullOrWhiteSpace(refreshTokenDto.RefreshToken))
            {
                return BadRequest(new { message = "Refresh token is required" });
            }

            // Hash the incoming token and find user by hash
            var tokenHash = TokenHasher.HashToken(refreshTokenDto.RefreshToken);
            var user = await context.Users.FirstOrDefaultAsync(u => u.RefreshToken == tokenHash);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid refresh token" });
            }

            if (!user.IsActive)
            {
                return Unauthorized(new { message = "Account is inactive" });
            }

            if (user.RefreshTokenExpiryTime == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return Unauthorized(new { message = "Refresh token expired" });
            }

            var newToken = tokenService.CreateToken(user);
            var newRefreshToken = tokenService.GenerateRefreshToken();

            // Hash the new refresh token before storing
            user.RefreshToken = TokenHasher.HashToken(newRefreshToken);
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await context.SaveChangesAsync();

            return Ok(new AuthResponseDto
            {
                Token = newToken,
                RefreshToken = newRefreshToken,
                Username = user.Username,
                Role = user.Role
            });
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var username = User.Identity?.Name;

            if (string.IsNullOrWhiteSpace(username))
            {
                return Unauthorized(new { message = "Invalid user" });
            }

            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;

            await context.SaveChangesAsync();

            return Ok(new { message = "Logged out successfully" });
        }
    }
}
