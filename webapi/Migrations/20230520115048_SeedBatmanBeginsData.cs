using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class SeedBatmanBeginsData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "Id", "Image", "Movie Name", "Rating", "Release Year" },
                values: new object[] { 1, "https://cdn.cinematerial.com/p/297x/lq2dvjme/batman-begins-movie-poster-md.jpg?v=1456291514", "Batman Begins", 8.2m, 2005 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
