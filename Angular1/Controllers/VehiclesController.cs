using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Angular1.Controllers.Resources;
using Angular1.Database;
using Angular1.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Angular1.Controllers
{
    [Route("/api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        
        private readonly VegaDbContext _context;

        public VehiclesController(IMapper mapper, VegaDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var model = await _context.Models.FindAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("modelId", "Invalid model id");
                return BadRequest(ModelState);
            }
            
            var vehicle = _mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return Created($"api/vehicles/{vehicle.Id}", _mapper.Map<Vehicle, VehicleResource>(vehicle));
        }
    }
}