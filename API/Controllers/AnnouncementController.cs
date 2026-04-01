using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/announcements")]
    [ApiController]
    public class AnnouncementController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAnnouncements([FromQuery] PaginationParamsDto paginationParams)
        {
            var offset = ((long)paginationParams.PageNumber - 1) * paginationParams.PageSize;
            if (offset > int.MaxValue)
                return BadRequest("Pagination offset is too large.");

            var rows = await context.Announcements
                .AsNoTracking()
                .Where(a => a.IsActive)
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
                .Where(a => a.Id == id && a.IsActive)
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
    }
}

