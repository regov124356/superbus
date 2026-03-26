using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class AnnouncementCreateDto
{
    [MaxLength(100)]
    [Required]
    public required string Title { get; set; }
    [MaxLength(1000)]
    [Required]
    public required string Content { get; set; }
    public bool IsActive { get; set; } = true;
}
