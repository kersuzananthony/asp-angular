using System.Collections.Generic;
using System.Threading.Tasks;
using Angular1.Models;
using Microsoft.AspNetCore.Mvc;
using Angular1.Controllers.Resources;
using Angular1.Database;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Angular1.Controllers
{
    [Route("/api/[controller]")]
    public class MakesController : Controller
    {
        private readonly VegaDbContext _context;

        private readonly IMapper _mapper; 
        
        
        public MakesController(VegaDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await _context.Makes.Include(m => m.Models).ToListAsync();

            return _mapper.Map<List<Make>, List<MakeResource>>(makes);
        }

        [HttpGet("{id}", Name = "GetMake")]
        public async Task<IActionResult> GetById(long id)
        {
            var item = await _context.Makes.Include(m => m.Models).FirstOrDefaultAsync(m => m.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            
            return new ObjectResult(_mapper.Map<Make, MakeResource>(item));
        }
    }
}