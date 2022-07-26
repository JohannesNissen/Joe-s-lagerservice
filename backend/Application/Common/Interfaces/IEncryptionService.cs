

namespace Application.Common.Interfaces
{
  public interface IEncryptionService
  {
    string EncryptToAES(string plainText);

    string DecryptFromAes(string cipherText);

    string CreateHash(string plaintext);

    string GenerateHash(string input, bool useSalt = true);

    bool AreEqual(string plainTextInput, string hashedInput);

  }
}
