using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Angular1.Controllers.Resources;
using Angular1.Core;
using Angular1.Core.Models;
using AutoMapper;

namespace Angular1.Controllers
{
    [Route("/api/[controller]")]
    public class MakesController : Controller
    {
        private readonly IMakeRepository _makeRepository;
        
        private readonly IMapper _mapper; 
        
        
        public MakesController(IMakeRepository makeRepository, IMapper mapper)
        {
            _makeRepository = makeRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await _makeRepository.GetMakesAsync();

            return _mapper.Map<List<Make>, List<MakeResource>>(makes);
        }

        [HttpGet("{id}", Name = "GetMake")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _makeRepository.GetMakeAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            
            return Ok(_mapper.Map<Make, MakeResource>(item));
        }
    }
}