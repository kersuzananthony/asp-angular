using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular1.Controllers.Resources;
using Angular1.Core;
using Angular1.Core.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Angular1.Controllers
{
    [Route("/api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        
        private readonly IVehicleRepository _vehicleRepository;
        
        private readonly IModelRepository _modelRepository;

        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository vehicleRepository, IModelRepository modelRepository, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _vehicleRepository = vehicleRepository;
            _modelRepository = modelRepository;
            _unitOfWork = unitOfWork;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetVehicles(VehicleQueryResource queryResource)
        {
            var queryObject = _mapper.Map<VehicleQueryResource, VehicleQuery>(queryResource);
            var queryResult = await _vehicleRepository.GetVehiclesAsync(queryObject);

            return Ok(_mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicleAsync(id);
            
            if (vehicle == null)
                return NotFound();

            return Ok(_mapper.Map<Vehicle, VehicleResource>(vehicle));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource saveVehicleResource)
        {
            var validation = await ValidateResource(saveVehicleResource);
            if (validation != null) return validation;
            
            var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(saveVehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            _vehicleRepository.Add(vehicle);
            await _unitOfWork.CompleteAsync();

            vehicle = await _vehicleRepository.GetVehicleAsync(vehicle.Id);

            return Created($"api/vehicles/{vehicle.Id}", _mapper.Map<Vehicle, VehicleResource>(vehicle));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource saveVehicleResource)
        {
            var validation = await ValidateResource(saveVehicleResource);
            if (validation != null) return validation;

            var vehicle = await _vehicleRepository.GetVehicleAsync(id);
            if (vehicle == null)
                return NotFound();
            
            _mapper.Map(saveVehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await _unitOfWork.CompleteAsync();

            vehicle = await _vehicleRepository.GetVehicleAsync(vehicle.Id);
            
            return Ok(_mapper.Map<Vehicle, VehicleResource>(vehicle));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicleAsync(id, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            _vehicleRepository.Remove(vehicle);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }

        private async Task<IActionResult> ValidateResource(SaveVehicleResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var model = await _modelRepository.GetModelAsync(resource.ModelId);
            if (model != null) return null;
            
            ModelState.AddModelError("modelId", "Invalid model id");
            return BadRequest(ModelState);
        }
    }
}