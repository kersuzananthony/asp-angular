﻿using Angular1.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Angular1.Database
{
    public class VegaDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Make> Makes { get; set; }
        
        public DbSet<Model> Models { get; set; }
        
        public DbSet<Feature> Features { get; set; }
        
        public DbSet<Vehicle> Vehicles { get; set; }
        
        public DbSet<Photo> Photos { get; set; }
        
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new {vf.FeatureId, vf.VehicleId});
            
            base.OnModelCreating(modelBuilder);
        }
    }
}