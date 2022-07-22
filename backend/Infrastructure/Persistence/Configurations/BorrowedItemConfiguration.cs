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
        .WithMany(u => u.ItemsLent)
        .HasForeignKey(p => p.UserId);
    }
  }
}
