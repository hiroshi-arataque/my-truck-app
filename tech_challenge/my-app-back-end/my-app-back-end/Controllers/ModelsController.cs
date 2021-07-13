using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_app_back_end.Models;

namespace my_app_back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ModelsController(AppDbContext context) {
            _context = context;
        }

        // GET: api/Models
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Model>>> GetModels() {
            return await _context.Models.ToListAsync();
        }
    }
}
