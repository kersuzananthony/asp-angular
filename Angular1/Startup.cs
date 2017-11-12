using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular1.Core;
using Angular1.Core.Models;
using Angular1.Database;
using Angular1.Database.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Angular1
{
    public class Startup
    {
//        public Startup(IConfiguration configuration) //
//        {
//            Configuration = configuration;
//        }

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(hostingEnvironment.ContentRootPath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{hostingEnvironment.EnvironmentName}.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<PhotoSettings>(Configuration.GetSection("PhotoSettings"));
            services.AddMvc();
            services.AddDbContext<VegaDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DATABASE_URL"));
            });
            services.AddScoped<IVehicleRepository, VehicleRepository>();
            services.AddScoped<IModelRepository, ModelRepository>();
            services.AddScoped<IFeatureRepository, FeatureRepository>();
            services.AddScoped<IMakeRepository, MakeRepository>();
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new {controller = "Home", action = "Index"});
            });
        }
    }
}