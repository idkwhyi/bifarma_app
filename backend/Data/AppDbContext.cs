using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<backend.Models.SampleType> SampleTypes { get; set; }
    public DbSet<backend.Models.Parameter> Parameters { get; set; }
    public DbSet<backend.Models.Method> Methods { get; set; }
    public DbSet<backend.Models.Analysis> Analyses { get; set; }
}
