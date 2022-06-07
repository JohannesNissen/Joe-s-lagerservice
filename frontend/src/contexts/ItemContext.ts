import { createContext } from "react";
import { CreateItemCommand } from "services/backend/client.generated";

import useItemContext from "./useItemContext";

type ItemContextType = ReturnType<typeof useItemContext>;
export const ItemContext = createContext<ItemContextType>({
  items: [],
  fetchItems: async () => {
    return;
  },
  saveNewItem: async (command: CreateItemCommand) => {
    return;
  },
  itemDetails: {},
  fetchItemDetails: async (itemId: number) => {
    return null;
  }
});
