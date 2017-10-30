using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Angular1.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make 1')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make 2')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make 3')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make 4')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make 5')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make1 - Model A', (SELECT ID FROM Makes WHERE Name = 'Make 1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make1 - Model B', (SELECT ID FROM Makes WHERE Name = 'Make 1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make2 - Model A', (SELECT ID FROM Makes WHERE Name = 'Make 2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make2 - Model B', (SELECT ID FROM Makes WHERE Name = 'Make 2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make3 - Model A', (SELECT ID FROM Makes WHERE Name = 'Make 3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make3 - Model B', (SELECT ID FROM Makes WHERE Name = 'Make 3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make4 - Model A', (SELECT ID FROM Makes WHERE Name = 'Make 4'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make4 - Model B', (SELECT ID FROM Makes WHERE Name = 'Make 4'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make5 - Model A', (SELECT ID FROM Makes WHERE Name = 'Make 5'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make5 - Model B', (SELECT ID FROM Makes WHERE Name = 'Make 5'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes WHERE NAME IN ('Make 1', 'Make 2', 'Make 3')");
        }
    }
}
