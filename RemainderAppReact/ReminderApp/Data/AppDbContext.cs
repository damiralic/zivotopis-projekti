using Microsoft.EntityFrameworkCore;
using ReminderApp.Models;

namespace ReminderApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

    public DbSet<Remainder> Remainders { get; set; }
    }

}
