using System;

namespace API.DTOs;

public class AnnouncementResponseDto
{
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
