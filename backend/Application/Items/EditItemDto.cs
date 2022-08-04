namespace Application.Items
{
  public class EditItemDto
  {
    public string Name { get; set; }
    public int TotalInStock { get; set; }
    public int UsedInOffice { get; set; }
    public int AmountLentOut { get; set; }
    public ImageIdDto Images { get; set; }
    public int ImagesToDelete { get; set; }
    public string Description { get; set; }
    public bool Borrowable { get; set; }
  }
}
