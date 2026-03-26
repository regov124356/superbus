using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.DTOs;
using API.Constants;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Entities;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAnnouncements(PaginationParamsDto paginationParams)
        {
            if (paginationParams.PageNumber < 1) paginationParams.PageNumber = 1;
            if (paginationParams.PageSize < 1) paginationParams.PageSize = 10;

            var rows = await context.Announcements
                .AsNoTracking()
                .Where(a => a.IsActive)
                .OrderByDescending(a => a.UpdatedAt ?? a.CreatedAt)
                .ThenByDescending(a => a.Id)
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize + 1)
                .Select(a => new AnnouncementResponseDto
                {
                    Title = a.Title,
                    Content = a.Content,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt
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
        
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<IActionResult> CreateAnnouncement(AnnouncementCreateDto request)
        {
            var item = new Announcement
            {
                Title = request.Title,
                Content = request.Content,
                IsActive = request.IsActive
             };

             await context.Announcements.AddAsync(item);
             if (await context.SaveChangesAsync() == 0) return BadRequest("Failed to create announcement");

             return Ok();
        }

    }
}
