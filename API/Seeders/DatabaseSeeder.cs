using System;
using API.Constants;
using API.Data;
using API.Entities;
using BCrypt.Net;

namespace API.Seeders;

public static class DatabaseSeeder
{
    public static void SeedAdmin(AppDbContext context, IConfiguration config)
    {
        var adminUsername = config["AdminAccount:Username"];
        var adminPassword = config["AdminAccount:Password"];

        if (string.IsNullOrEmpty(adminUsername) || string.IsNullOrEmpty(adminPassword))
        {
            throw new Exception("Admin credentials not found in configuration. Skipping admin seeding.");
        }

        if (!context.Users.Any(u => u.Username == adminUsername))
        {
            context.Users.Add(new AppUser
            {
                Username = adminUsername,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                Role = Roles.Admin,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            });
            context.SaveChanges();
        }
    }
}
