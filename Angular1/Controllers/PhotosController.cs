using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Angular1.Controllers.Resources;
using Angular1.Core;
using Angular1.Core.Models;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Angular1.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]   
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment _environment;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IPhotoRepository _photoRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly PhotoSettings _photoSettings;

        public PhotosController(IHostingEnvironment environment, IVehicleRepository vehicleRepository, IPhotoRepository photoRepository, IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            _environment = environment;
            _vehicleRepository = vehicleRepository;
            _photoRepository = photoRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoSettings = options.Value;
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotos(int vehicleId)
        {
            var photos = await _photoRepository.GetPhotos(vehicleId);

            return Ok(_mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos));
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            if (file == null)
                return BadRequest("File is null");

            if (file.Length == 0)
                return BadRequest("File is empty");

            if (file.Length > _photoSettings.MaxBytes)
                return BadRequest("Maximum file size exceeded");

            if (!_photoSettings.IsAccepted(file.FileName))
                return BadRequest("Unsupported file format");
                
            var vehicle = await _vehicleRepository.GetVehicleAsync(vehicleId, false);
            if (vehicle == null)
                return NotFound();

            var uploadPath = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var fileName = $"{Guid.NewGuid().ToString()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var newPhoto = new Photo {FileName = fileName};
            vehicle.Photos.Add(newPhoto);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Photo, PhotoResource>(newPhoto));
        }
    }
}