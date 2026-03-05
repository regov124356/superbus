using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly string _tokenKey;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _expiryInMinutes;

    public TokenService(IConfiguration config)
    {
        _config = config;

        _tokenKey = _config["Jwt:TokenKey"] ?? throw new InvalidOperationException("JWT TokenKey is not configured");
        _issuer = _config["Jwt:Issuer"] ?? throw new InvalidOperationException("JWT Issuer is not configured");
        _audience = _config["Jwt:Audience"] ?? throw new InvalidOperationException("JWT Audience is not configured");
        _expiryInMinutes = int.Parse(_config["Jwt:ExpiryInMinutes"] ?? throw new InvalidOperationException("JWT ExpiryInMinutes is not configured"));
    }

    public string CreateToken(AppUser user)
    {
        if (user == null)
            throw new ArgumentNullException("User cannot be null", nameof(user));

        if (string.IsNullOrWhiteSpace(user.Username))
            throw new ArgumentException("Username cannot be empty", nameof(user));

        if (string.IsNullOrWhiteSpace(user.Role))
            throw new ArgumentException("User role cannot be empty", nameof(user));


        var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.Username),
                new(ClaimTypes.Role, user.Role),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(_expiryInMinutes),
            SigningCredentials = credentials,
            Issuer = _issuer,
            Audience = _audience
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);

    }

    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}
