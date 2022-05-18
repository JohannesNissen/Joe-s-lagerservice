import { useCallback, useEffect, useState } from "react";
import { client } from "services/backend/client";
import { ItemFetchClient, ItemIdDto } from "services/backend/client.generated";

export interface ItemContextType {
  items: ItemIdDto[];
  fetchItems: () => Promise<void>;
}

const useItemContext: () => ItemContextType = () => {
  const [items, dispatchItems] = useState<ItemIdDto[]>([]);

  /**
   * GET /api/Item
   */
  const fetchItems = useCallback(async () => {
    const itemClient = await client(ItemFetchClient);
    const fetchedItems = await itemClient.item_GetAllItems();
    dispatchItems(fetchedItems);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    fetchItems
  };
};

export default useItemContext;
