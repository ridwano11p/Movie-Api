using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using webapi.Models;
using Microsoft.EntityFrameworkCore;


namespace Firstapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly MovieContext _context;

        public MovieController(MovieContext context)
        {
            _context = context;
        }

        // GET: /Movie
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return _context.Movies.ToList();
        }

        // GET /Movie/5
        [HttpGet("{id}")]
        public ActionResult<Movie> Get(int id)
        {
            var movie = _context.Movies.Find(id);

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        // POST /Movie
        [HttpPost]
        public ActionResult<Movie> Post(Movie movie)
        {
            _context.Movies.Add(movie);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = movie.Id }, movie);
        }

        // PUT /Movie/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE /Movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movie = _context.Movies.Find(id);

            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
