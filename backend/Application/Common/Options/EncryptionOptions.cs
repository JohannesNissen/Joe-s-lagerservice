using System;

namespace Application.Common.Options
{
  public class EncryptionOptions
  {
    public const string Encryption = "Encryption";

    public string AesKey { get; set; } = String.Empty;
    public string AesIV { get; set; } = String.Empty;
  }
}
