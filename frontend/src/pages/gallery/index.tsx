import "draft-js/dist/Draft.css";

import GalleryItem from "components/LagerService/GalleryItem";
import ModalRegisterNewItem from "components/LagerService/ModalRegisterNewItem";
import useItemContext from "contexts/useItemContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const NewItemHeaders = {
  Choose_operation: "",
  Register_new: "Register new item",
  Add_to_existing: ""
};

const IndexPage: NextPage = () => {
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
      <ModalRegisterNewItem />
    </div>
  );
};

export default IndexPage;
