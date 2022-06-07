import { useCallback, useEffect, useState } from "react";
import { client } from "services/backend/client";
import {
  CreateItemCommand,
  ItemDetailsDto,
  ItemFetchClient,
  ItemIdDto
} from "services/backend/client.generated";

export interface ItemContextType {
  items: ItemIdDto[];
  fetchItems: () => Promise<void>;
  saveNewItem: (command: CreateItemCommand) => Promise<void>;
  itemDetails: ItemDetailsDto;
  fetchItemDetails: (itemId: number) => Promise<void>;
}

const useItemContext: () => ItemContextType = () => {
  const [items, dispatchItems] = useState<ItemIdDto[]>([]);
  const [itemDetails, setItemDetails] = useState<ItemIdDto>({});

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
  /**
   * GET /api/Item/{id}
   */
  const fetchItemDetails = useCallback(async (itemId: number) => {
    const itemClient = await client(ItemFetchClient);
    const fetchedItemDetails = await itemClient.item_GetItemDetails(itemId);
    setItemDetails(fetchedItemDetails);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    fetchItems,
    saveNewItem,
    itemDetails,
    fetchItemDetails
  };
};

export default useItemContext;
