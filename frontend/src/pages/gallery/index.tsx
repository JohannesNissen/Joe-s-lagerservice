import "draft-js/dist/Draft.css";

import GalleryItem from "components/LagerService/GalleryItem";
import ModalRegisterNewItem from "components/LagerService/ModalRegisterNewItem";
import useItemContext from "contexts/useItemContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { CreateItemCommand } from "services/backend/client.generated";

const NewItemHeaders = {
  Choose_operation: "",
  Register_new: "Register new item",
  Add_to_existing: ""
};

const IndexPage: NextPage = () => {
  const { items, fetchItems, saveNewItem } = useItemContext();

  useRouter();
  const [, setDone] = useState<boolean>(false);

  const registerNewItem = useCallback(
    (command: CreateItemCommand) => {
      return saveNewItem(command);
    },
    [saveNewItem]
  );

  useEffect(() => {
    fetchItems().then(() => {
      setDone(true);
    });
  }, [fetchItems]);

  return (
    <div>
      <p>lol</p>
      <GalleryItem storage={items} />
      <ModalRegisterNewItem onSave={registerNewItem} />
    </div>
  );
};

export default IndexPage;
