using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Models
{
    public class MovieContext : DbContext
    {
        // Define a constructor that accepts a DbContextOptions object and passes it to the base constructor
        public MovieContext(DbContextOptions<MovieContext> options) : base(options)
        {
        }

        // Define a DbSet property for each entity set
        public DbSet<Movie> Movies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .Property(m => m.Rating)
                .HasPrecision(18, 2); // specify precision and scale here

            //seed new movie into database
            modelBuilder.Entity<Movie>().HasData(
                new Movie
                {
                    Id = 1,
                    Name = "Batman Begins",
                    ReleaseYear = 2005,
                    Rating = 8.2m,
                    Image = "https://cdn.cinematerial.com/p/297x/lq2dvjme/batman-begins-movie-poster-md.jpg?v=1456291514"
                }
            );
        }
    }
}
