using Microsoft.EntityFrameworkCore;
using NotebookApp.Models;

namespace NotebookApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Notebook> Notebooks { get; set; }
    }
}
