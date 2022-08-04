import { createContext } from "react";
import { FileParameter } from "services/backend/client.generated";

import { useImageContext } from "./useImageContext";

// This is the image gallery context initialization
type ImageContextType = ReturnType<typeof useImageContext>;
export const ImageContext = createContext<ImageContextType>({
  uploadImage: async (_id: number, _file: FileParameter) => {
    return "";
  }
});
