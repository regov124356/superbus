using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Constants;
using API.DTOs;
using API.Entities;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/admin/announcements")]
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    public class AdminAnnouncementController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAnnouncements([FromQuery] PaginationParamsDto paginationParams)
        {
            var offset = ((long)paginationParams.PageNumber - 1) * paginationParams.PageSize;
            if (offset > int.MaxValue)
                return BadRequest("Pagination offset is too large.");

            var rows = await context.Announcements
                .AsNoTracking()
                .OrderByDescending(a => a.UpdatedAt ?? a.CreatedAt)
                .ThenByDescending(a => a.Id)
                .Skip((int)offset)
                .Take(paginationParams.PageSize + 1)
                .Select(a => new AnnouncementResponseDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Content = a.Content,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt,
                    IsActive = a.IsActive
                }).ToListAsync();

            var hasNextPage = rows.Count > paginationParams.PageSize;

            var items = rows.Take(paginationParams.PageSize).ToList();

            return Ok(new
            {
                pageNumber = paginationParams.PageNumber,
                pageSize = paginationParams.PageSize,
                hasNextPage,
                items
            });
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAnnouncementById(int id)
        {
            var item = await context.Announcements
                .AsNoTracking()
                .Where(a => a.Id == id)
                .Select(a => new AnnouncementResponseDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Content = a.Content,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt,
                    IsActive = a.IsActive
                }).FirstOrDefaultAsync();

            if (item == null) return NotFound("Announcement not found");

            return Ok(item);
        }


        [HttpPost]
        public async Task<IActionResult> CreateAnnouncement([FromBody] AnnouncementCreateDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Content))
                return ValidationProblem(ModelState);

            var item = new Announcement
            {
                Title = request.Title.Trim(),
                Content = request.Content.Trim(),
                IsActive = request.IsActive
            };

            await context.Announcements.AddAsync(item);
            await context.SaveChangesAsync();

            var response = new AnnouncementResponseDto
            {
                Id = item.Id,
                Title = item.Title,
                Content = item.Content,
                UpdatedAt = item.UpdatedAt,
                IsActive = item.IsActive,
                CreatedAt = item.CreatedAt
            };
            return CreatedAtAction(nameof(GetAnnouncementById), new { id = item.Id }, response);
        }


        [HttpPatch("{id:int}")]
        public async Task<IActionResult> UpdateAnnouncementById(int id, [FromBody] AnnouncementUpdateDto request)
        {
            var item = await context.Announcements.FindAsync(id);
            if (item == null) return NotFound("Announcement not found");

            var changed = false;

            if (request.Title is not null)
            {
                if (string.IsNullOrWhiteSpace(request.Title))
                    return BadRequest("Title cannot be empty");

                item.Title = request.Title;
                changed = true;
            }

            if (request.Content is not null)
            {
                if (string.IsNullOrWhiteSpace(request.Content))
                    return BadRequest("Content cannot be empty");

                item.Content = request.Content;
                changed = true;
            }

            if (request.IsActive.HasValue)
            {
                item.IsActive = request.IsActive.Value;
                changed = true;
            }

            if (!changed) return BadRequest("At least one field must be updated");

            item.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAnnouncementById(int id)
        {
            var item = await context.Announcements.FindAsync(id);
            if (item == null) return NotFound("Announcement not found");

            context.Announcements.Remove(item);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
