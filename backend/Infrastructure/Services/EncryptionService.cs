using System;
using System.Text;
using System.IO;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Application.Common.Interfaces;
using Application.Common.Options;

namespace Infrastructure.Services
{
  public class EncryptionService : IEncryptionService
  {

    private const int SALTSIZE = 128 / 8;

    private readonly EncryptionOptions _options;

    public EncryptionService(IOptions<EncryptionOptions> options)
    {
      _options = options.Value;
    }

    public string CreateHash(string plaintext)
    {
      byte[] salt = RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes
                                                             // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
      string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
          password: plaintext,
          salt: salt,
          prf: KeyDerivationPrf.HMACSHA256,
          iterationCount: 100000,
          numBytesRequested: 256 / 8));
      throw new NotImplementedException();
    }
    public static string CreateSalt(int size)
    {
      //Generate a cryptographic random number.
      RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
      byte[] buff = new byte[size];
      rng.GetBytes(buff);
      return Convert.ToBase64String(buff);
    }

    public string GenerateHash(string input, bool useSalt = true)
    {
      var salt = useSalt ? CreateSalt(SALTSIZE) : "";
      byte[] bytes = Encoding.UTF8.GetBytes(input);
      SHA256Managed sHA256ManagedString = new SHA256Managed();
      byte[] hash = sHA256ManagedString.ComputeHash(bytes);
      return Convert.ToBase64String(hash) + salt;
    }

    public bool AreEqual(string plainTextInput, string hashedInput)
    {

      string newHashedPin = GenerateHash(plainTextInput, false);
      Console.WriteLine($"new: {newHashedPin}\nold: {hashedInput}");
      return newHashedPin == hashedInput.Substring(0, hashedInput.Length - 24);
    }
    public string DecryptFromAes(string cipherText)
    {
      // Check arguments.
      if (cipherText == null || cipherText.Length <= 0)
        throw new ArgumentNullException("cipherText");
      if (_options.AesKey == null || _options.AesKey.Length <= 0)
        throw new ArgumentNullException("Key");
      if (_options.AesIV == null || _options.AesIV.Length <= 0)
        throw new ArgumentNullException("IV");

      // Declare the string used to hold
      // the decrypted text.
      byte[] cipher = Encoding.ASCII.GetBytes(cipherText);
      string plaintext = null;

      // Create an AesManaged object
      // with the specified key and IV.
      using (AesManaged aesAlg = new AesManaged())
      {
        aesAlg.Key = Encoding.ASCII.GetBytes(_options.AesKey);
        aesAlg.IV = Encoding.ASCII.GetBytes(_options.AesIV);

        // Create a decryptor to perform the stream transform.
        ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

        // Create the streams used for decryption.
        using (MemoryStream msDecrypt = new MemoryStream(cipher))
        {
          using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
          {
            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
            {

              // Read the decrypted bytes from the decrypting stream
              // and place them in a string.
              plaintext = srDecrypt.ReadToEnd();
            }
          }
        }
      }

      return plaintext;
    }

    public string EncryptToAES(string plainText)
    {// Check arguments.
      if (plainText == null || plainText.Length <= 0)
        throw new ArgumentNullException("plainText");
      if (_options.AesKey == null || _options.AesKey.Length <= 0)
        throw new ArgumentNullException("Key");
      if (_options.AesIV == null || _options.AesIV.Length <= 0)
        throw new ArgumentNullException("IV");
      byte[] encrypted;

      // Create an AesManaged object
      // with the specified key and IV.
      using (var aesAlg = new AesManaged())
      {
        aesAlg.Key = Encoding.ASCII.GetBytes(_options.AesKey);
        aesAlg.IV = Encoding.ASCII.GetBytes(_options.AesIV);

        // Create an encryptor to perform the stream transform.
        ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

        // Create the streams used for encryption.
        using (MemoryStream msEncrypt = new MemoryStream())
        {
          using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
          {
            using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
            {
              //Write all data to the stream.
              swEncrypt.Write(plainText);
            }
            encrypted = msEncrypt.ToArray();
          }
        }
      }

      // Return the encrypted bytes from the memory stream.
      return Encoding.ASCII.GetString(encrypted);
    }
  }
}
