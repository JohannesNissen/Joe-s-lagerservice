/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { ItemIdDto } from "services/backend/client.generated";
import { useSortableData } from "utils/sortTable";

import ItemCard from "./ItemCard";

type Props = {
  storage: ItemIdDto[];
};

const GalleryItem: FC<Props> = ({ storage }) => {
  // Used for showing the events
  const { items, requestSort, sortConfig } = useSortableData(storage);

  return (
    <Container maxW={"8xl"} pt={"60px"}>
      <Stack direction={"row"} justify={"start"}>
        <Stack align={"start"} direction={"row"}>
          {items.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default GalleryItem;
