using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Announcement
{
    [Key]
    public int Id { get; set; }

    [MaxLength(100)]
    public required string Title { get; set; }

    [MaxLength(1000)]
    public required string Content { get; set; }

    public required DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public bool IsActive { get; set; } = true;
}