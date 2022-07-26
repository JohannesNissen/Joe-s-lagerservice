using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class BorrowedItemConfiguration : IEntityTypeConfiguration<BorrowedItem>
  {
    public void Configure(EntityTypeBuilder<BorrowedItem> builder)
    {
      builder.HasOne(p => p.User)
        .WithMany(u => u.BorrowedItems)
        .HasForeignKey(p => p.UserId);

      builder.HasOne(p => p.Item)
        .WithMany(i => i.Borrowed)
        .HasForeignKey(p => p.ItemId);
    }
  }
}
