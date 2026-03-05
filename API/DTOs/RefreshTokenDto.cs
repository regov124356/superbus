using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RefreshTokenDto
{
    [Required]
    public required string RefreshToken { get; set; }
}
