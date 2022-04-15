import { CommandErrorCode, SwaggerException } from "./client.generated";

interface BackendCommandException {
  type: string;
  title: string;
  status: number;
  commandErrorCodes: Record<CommandErrorCode, string[]>;
  attributeErrors: Record<string, CommandErrorCode[]>;
}

export const handleNSwagException = (
  error: SwaggerException
): Readonly<BackendCommandException> => {
  const parsedError = JSON.parse(error.response) as BackendCommandException;

  if (parsedError.commandErrorCodes) {
    const attributeMap = Object.entries(parsedError.commandErrorCodes).reduce<
      Record<string, CommandErrorCode[]>
    >((acc, [errorCode, attributes]) => {
      console.debug("Errorbuilding", errorCode, attributes);

      attributes.forEach(attribute => {
        const fixedAttributeName = attribute[0].toLowerCase() + attribute.slice(1);

        console.debug("Errorbuilding attribute", fixedAttributeName);
        if (acc[fixedAttributeName]) {
          if (!acc[fixedAttributeName].includes(errorCode as unknown as CommandErrorCode)) {
            acc[fixedAttributeName].push(errorCode as unknown as CommandErrorCode);
          }
        } else {
          acc[fixedAttributeName] = [errorCode as unknown as CommandErrorCode];
        }
      });

      return acc;
    }, {} as any);

    parsedError.attributeErrors = attributeMap;

    return parsedError;
  }
};
