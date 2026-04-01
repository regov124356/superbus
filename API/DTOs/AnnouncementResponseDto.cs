using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class AnnouncementResponseDto
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime? UpdatedAt { get; set; }
    public required bool IsActive { get; set; }
}
