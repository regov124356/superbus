using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class AnnouncementUpdateDto
{
    [MaxLength(100)]
    public string? Title { get; set; }
    [MaxLength(1000)]
    public string? Content { get; set; }
    public bool? IsActive { get; set; }
}
