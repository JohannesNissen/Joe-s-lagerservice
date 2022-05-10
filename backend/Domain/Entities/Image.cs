using Domain.Common;

namespace Domain.Entities
{
  public class Image : AuditableEntity
  {
    public int Id { get; set; }
    public int ItemId { get; set; }
    public int Index { get; set; }
    public string FilePath { get; set; }

    public virtual Item Item { get; set; }

  }
}
