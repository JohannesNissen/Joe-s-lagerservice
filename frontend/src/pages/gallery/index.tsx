import GalleryItem from "components/LagerService/GalleryItem";
import useItemContext from "contexts/useItemContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
    </div>
  );
};

export default IndexPage;
