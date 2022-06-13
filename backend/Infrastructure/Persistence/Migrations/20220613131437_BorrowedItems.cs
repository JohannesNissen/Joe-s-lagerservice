using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class BorrowedItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BorrowedItem_Item_ItemId",
                table: "BorrowedItem");

            migrationBuilder.DropForeignKey(
                name: "FK_BorrowedItem_Users_UserId",
                table: "BorrowedItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BorrowedItem",
                table: "BorrowedItem");

            migrationBuilder.RenameTable(
                name: "BorrowedItem",
                newName: "BorrowedItems");

            migrationBuilder.RenameIndex(
                name: "IX_BorrowedItem_UserId",
                table: "BorrowedItems",
                newName: "IX_BorrowedItems_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_BorrowedItem_ItemId",
                table: "BorrowedItems",
                newName: "IX_BorrowedItems_ItemId");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "BorrowedItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BorrowedItems",
                table: "BorrowedItems",
                column: "Id");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BorrowedItems_Item_ItemId",
                table: "BorrowedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_BorrowedItems_Users_UserId",
                table: "BorrowedItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BorrowedItems",
                table: "BorrowedItems");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "BorrowedItems");

            migrationBuilder.RenameTable(
                name: "BorrowedItems",
                newName: "BorrowedItem");

            migrationBuilder.RenameIndex(
                name: "IX_BorrowedItems_UserId",
                table: "BorrowedItem",
                newName: "IX_BorrowedItem_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_BorrowedItems_ItemId",
                table: "BorrowedItem",
                newName: "IX_BorrowedItem_ItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BorrowedItem",
                table: "BorrowedItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BorrowedItem_Item_ItemId",
                table: "BorrowedItem",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BorrowedItem_Users_UserId",
                table: "BorrowedItem",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
