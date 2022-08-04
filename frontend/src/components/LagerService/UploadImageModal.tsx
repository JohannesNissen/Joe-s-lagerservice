import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { ItemContext } from "contexts/ItemContext";
// import Image from "next/image";
import { FC, useCallback, useContext, useState } from "react";
import React from "react";
import { FileParameter } from "services/backend/client.generated";
import { logger } from "utils/logger";

type Props = {
  title: string;
  buttonName: string;
  buttonColor: string;
  onSubmit: (id: number, file: FileParameter) => Promise<string>;
  galleryId: number;
};

const UploadImageModal: FC<Props> = ({ title, buttonName, buttonColor, onSubmit, galleryId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { itemDetails } = useContext(ItemContext);

  const [value, setValue] = useState<FileParameter>();
  const handleChange = useCallback(event => {
    if (!event.target.files) return;
    logger(event.target.files);
    const realValue: FileParameter = {
      data: event.target.files[0],
      fileName: event.target.files[0]?.name
    };
    setValue(realValue);
  }, []);

  const save = useCallback(() => {
    if (value !== null) {
      onSubmit(galleryId, value)
        .then(response => {
          itemDetails.imagePath = response;
        })
        .then(() => onClose());
    }
  }, [galleryId, itemDetails, onClose, onSubmit, value]);

  return (
    <React.Fragment>
      <Image
        cursor="pointer"
        src={"https://localhost:5001" + itemDetails?.imagePath}
        maxW="100%"
        height="100%"
        alt="Juan"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Navn</FormLabel>
              <Input type="file" name="file" onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"blue"} mr={3} onClick={save}>
              Gem
            </Button>
            <Button onClick={onClose}>Fortryd</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default UploadImageModal;
