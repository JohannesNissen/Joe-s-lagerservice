using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
  public interface IApplicationDbContext
  {


    DbSet<ExampleChild> ExampleChildren { get; set; }
    DbSet<ExampleParent> ExampleParents { get; set; }
    DbSet<User> Users { get; set; }
    DbSet<Item> Items { get; set; }
    DbSet<Item> Images { get; set; }
    DbSet<Notification> Notifications { get; set; }
    DbSet<BorrowedItem> BorrowedItems { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
  }
}
