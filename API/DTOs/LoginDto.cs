using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDto
{
    [Required]
    [MinLength(3)]
    public required string Username { get; set; }
    [Required]
    [MinLength(10)]
    public required string Password { get; set; }
}
