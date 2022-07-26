/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { ItemIdDto } from "services/backend/client.generated";
import { useSortableData } from "utils/sortTable";

import ItemCard from "./ItemCard";

type Props = {
  storage: ItemIdDto[];
};

const GalleryItem: FC<Props> = ({ storage }) => {
  // Used for showing the events
  const { items, requestSort, sortConfig } = useSortableData(storage);
  //TODO unborrowable item shall only be shown for admins
  return (
    <React.Fragment>
      <Flex
        width="fit-content"
        m={"1rem 4.5rem"}
        wrap={"wrap"}
        justify="flex-start"
        gap={"15px"}
        align={"center"}
        direction={"row"}>
        {items.map((item, index) => (
          <ItemCard key={index} maxW="20vw" item={item} />
        ))}
      </Flex>
    </React.Fragment>
  );
};

export default GalleryItem;
