using System;

namespace Application.Common.Exceptions
{
  public class BadRequestException : Exception
  {
    public BadRequestException()
        : base()
    {
    }

    public BadRequestException(string message)
        : base(message)
    {
    }

    public BadRequestException(string argumentName, string argumentValue, string message)
        : base($"Invalid value \"{argumentValue}\" for argument \"{argumentName}\": {message}")
    {
    }
  }
}
