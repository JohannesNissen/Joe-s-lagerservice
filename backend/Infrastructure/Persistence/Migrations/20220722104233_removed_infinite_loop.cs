using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class removed_infinite_loop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BorrowedItems_Item_ItemId",
                table: "BorrowedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_BorrowedItems_Users_UserId",
                table: "BorrowedItems");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "BorrowedItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "BorrowedItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BorrowedItems_Item_ItemId",
                table: "BorrowedItems",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BorrowedItems_Users_UserId",
                table: "BorrowedItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BorrowedItems_Item_ItemId",
                table: "BorrowedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_BorrowedItems_Users_UserId",
                table: "BorrowedItems");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "BorrowedItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "BorrowedItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_BorrowedItems_Item_ItemId",
                table: "BorrowedItems",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BorrowedItems_Users_UserId",
                table: "BorrowedItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
