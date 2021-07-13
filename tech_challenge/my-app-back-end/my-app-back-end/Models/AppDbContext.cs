using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_app_back_end.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base (options) 
            { }

        public DbSet<Model> Models { get; set; }
        public DbSet<Truck> Trucks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Truck>()
                .HasKey(t => t.Id);
            modelBuilder.Entity<Truck>()
                .Property(t => t.Id)
                    .ValueGeneratedOnAdd();
            modelBuilder.Entity<Truck>()
                .Property(t => t.ModelYear)
                    .HasMaxLength(4);
            modelBuilder.Entity<Truck>()
                .Property(t => t.ProductionYear)
                    .HasMaxLength(4);
            modelBuilder.Entity<Truck>()
                .HasOne(t => t.Model);

            modelBuilder.Entity<Model>()
                .HasKey(m => m.Id);
            modelBuilder.Entity<Model>()
                .Property(m => m.Name)
                    .HasMaxLength(2);
        }
    }
}
