import { useCallback } from "react";
import { client } from "services/backend/client";
import { FileParameter, ImageFetchClient } from "services/backend/client.generated";
import { logger } from "utils/logger";

export interface ImageContextType {
  uploadImage: (_id: number, _file: FileParameter) => Promise<string>;
}

export const useImageContext: () => ImageContextType = () => {
  // POST /api/ImageGallery/{imageGalleryId}
  const uploadImage = useCallback(async (_id: number, _file: FileParameter) => {
    const imageClient = await client(ImageFetchClient);
    logger("lskdmasldkjalsdkjalkj");
    const result = await imageClient.image_UploadImages(_id, _file);
    return result;
  }, []);

  return {
    uploadImage
  };
};
