import { useCallback, useEffect, useState } from "react";
import { client } from "services/backend/client";
import { CreateItemCommand, ItemFetchClient, ItemIdDto } from "services/backend/client.generated";

export interface ItemContextType {
  items: ItemIdDto[];
  fetchItems: () => Promise<void>;
  saveNewItem: (command: CreateItemCommand) => Promise<void>;
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

  const saveNewItem = useCallback(async (command: CreateItemCommand) => {
    const itemClient = await client(ItemFetchClient);
    await itemClient.item_CreateItem(command);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    fetchItems,
    saveNewItem
  };
};

export default useItemContext;
