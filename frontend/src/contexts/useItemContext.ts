import { useCallback, useEffect, useState } from "react";
import { client } from "services/backend/client";
import {
  BorrowedItemDto,
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
  fetchBorrowRequest: (requestId: number) => Promise<BorrowedItemDto>;
  singleBorrowRequest: BorrowedItemDto;
}

const useItemContext: () => ItemContextType = () => {
  const [items, dispatchItems] = useState<ItemIdDto[]>([]);
  const [itemDetails, setItemDetails] = useState<ItemIdDto>({});
  const [singleBorrowRequest, dispatchRequest] = useState<BorrowedItemDto>({});

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
    await itemClient.item_CreateItem(command).then(response => {
      const item: ItemIdDto = {
        id: response,
        totalInStock: command.amountBought,
        usedInOffice: command.reserveForOffice,
        borrowable: command.borrowable,
        name: command.name,
        description: command.description
      };
      dispatchItems(items => [...items, item]);
    });
  }, []);
  /**
   * GET /api/Item/{id}
   */
  const fetchItemDetails = useCallback(async (itemId: number) => {
    const itemClient = await client(ItemFetchClient);
    const fetchedItemDetails = await itemClient.item_GetItemDetails(itemId);
    setItemDetails(fetchedItemDetails);
  }, []);

  const fetchBorrowRequest = useCallback(async (requestId: number) => {
    const itemClient = await client(ItemFetchClient);
    const borrowRequest = await itemClient.item_getBorrowedItem(requestId);
    dispatchRequest(borrowRequest);
    return borrowRequest;
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    fetchItems,
    saveNewItem,
    itemDetails,
    fetchItemDetails,
    fetchBorrowRequest,
    singleBorrowRequest
  };
};

export default useItemContext;
