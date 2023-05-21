using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class Movie
    {
        public int Id { get; set; }
        [Column("Movie Name")]
        public string? Name { get; set; }
        [Column("Release Year")]
        public int? ReleaseYear { get; set; }
        [Column("Rating")]
        public decimal? Rating { get; set; }
        [Column("Image")]
        public string? Image { get; set; }
    }
}
