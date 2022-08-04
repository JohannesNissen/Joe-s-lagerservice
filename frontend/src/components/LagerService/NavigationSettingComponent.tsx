import { Avatar } from "@chakra-ui/avatar";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { UserContext } from "contexts/UserContext";
import router from "next/router";
import React, { FC, useContext } from "react";
import { CreateItemCommand, ItemIdDto } from "services/backend/client.generated";
import { isAdmin } from "utils/isAdmin";

import ModalAddToExistingItem, { openingType } from "./ModalAddToExistingItem";
import ModalRegisterNewItem from "./ModalRegisterNewItem";

type Props = {
  LogOut: () => void;
  registerNewItem: (command: CreateItemCommand) => Promise<void>;
  addAmoutToItem: (item: ItemIdDto) => void;
};

const NavigationSettingsComponent: FC<Props> = ({ LogOut, registerNewItem, addAmoutToItem }) => {
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <React.Fragment>
      <Avatar cursor="pointer" onClick={onOpen} boxSize="2.5rem" name="Test User" />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <br />
            <Heading pl={2} borderBottomWidth="1px" size="md">
              User
            </Heading>
            <Box
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              onClick={() => {
                router.push(`profile/${user.id}`);
              }}>
              <Text>Profile</Text>
            </Box>
            <Box cursor="pointer" onClick={LogOut} _hover={{ textDecoration: "underline" }}>
              Sign out
            </Box>
            {isAdmin(user) && (
              <React.Fragment>
                <br />
                <Heading pl={2} borderBottomWidth="1px" size="md">
                  Gallery
                </Heading>
                <ModalRegisterNewItem onSave={registerNewItem}>
                  Register new item
                </ModalRegisterNewItem>
                <ModalAddToExistingItem type={openingType.Button} addAmoutToItem={addAmoutToItem} />
                <br />
                <Heading pl={2} borderBottomWidth="1px" size="md">
                  Admin
                </Heading>
                <Box
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                  onClick={() => router.push("/admin")}>
                  UserList
                </Box>
              </React.Fragment>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default NavigationSettingsComponent;
