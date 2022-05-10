

namespace Application.Common.Interfaces
{
  public interface IEncryptionService
  {
    string EncryptToAES(string plainText);

    string DecryptFromAes(string cipherText);

    string CreateHash(string plaintext);

  }
}
