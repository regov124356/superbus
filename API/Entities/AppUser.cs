using System;
using System.ComponentModel.DataAnnotations;
using API.Constants;

namespace API.Entities;

public class AppUser
{
    [Key]
    public Guid Id { get; set; }

    [MaxLength(50)]
    public required string Username { get; set; }

    [MaxLength(255)]
    public required string PasswordHash { get; set; }

    [MaxLength(50)]
    public required string Role { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLogin { get; set; }
    public bool IsActive { get; set; } = true;

    [MaxLength(500)]
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }

    public int FailedLoginAttempts { get; set; } = 0;
    public DateTime? LockoutEnd { get; set; }
}
