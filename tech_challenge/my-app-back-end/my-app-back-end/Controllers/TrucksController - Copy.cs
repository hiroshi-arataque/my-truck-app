using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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

        public ModelsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Trucks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Truck>>> GetTrucks()
        {
            return await _context.Trucks.ToListAsync();
        }

        // GET: api/Trucks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Truck>> GetTruck(int id)
        {
            var truck = await _context.Trucks.FindAsync(id);

            if (truck == null)
            {
                return NotFound();
            }

            return truck;
        }

        // PUT: api/Trucks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTruck(int id, Truck truck)
        {
            if (id != truck.Id)
            {
                return BadRequest();
            }

            _context.Entry(truck).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TruckExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Trucks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Truck>> PostTruck(Truck truck)
        {
            _context.Trucks.Add(truck);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTruck", new { id = truck.Id }, truck);
        }

        // DELETE: api/Trucks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Truck>> DeleteTruck(int id)
        {
            var truck = await _context.Trucks.FindAsync(id);
            if (truck == null)
            {
                return NotFound();
            }

            _context.Trucks.Remove(truck);
            await _context.SaveChangesAsync();

            return truck;
        }

        private bool TruckExists(int id)
        {
            return _context.Trucks.Any(e => e.Id == id);
        }
    }
}
