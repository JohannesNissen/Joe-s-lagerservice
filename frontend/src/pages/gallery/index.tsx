import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import GalleryItem from "components/LagerService/GalleryItem";
import useItemContext from "contexts/useItemContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, fetchItems } = useItemContext();

  useRouter();
  const [, setDone] = useState<boolean>(false);

  useEffect(() => {
    fetchItems().then(() => {
      setDone(true);
    });
  }, [fetchItems]);

  return (
    <div>
      <p>lol</p>
      <GalleryItem storage={items} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register new item</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={onOpen}>Open Modal</Button>
    </div>
  );
};

export default IndexPage;
