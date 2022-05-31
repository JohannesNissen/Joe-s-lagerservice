import { createContext } from "react";

import useItemContext from "./useItemContext";

type ItemContextType = ReturnType<typeof useItemContext>;
export const ItemContext = createContext<ItemContextType>({
  items: [],
  fetchItems: async () => {
    return;
  },
  itemDetails: {},
  fetchItemDetails: async (itemId: number) => {
    return null;
  }
});
