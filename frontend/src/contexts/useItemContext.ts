import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { client } from "services/backend/client";
import {
  BorrowedItemDto,
  BorrowItemCommand,
  CreateItemCommand,
  EditItemDto,
  ItemDetailsDto,
  ItemFetchClient,
  ItemIdDto,
  ReviewBorrowRequestCommand
} from "services/backend/client.generated";

export interface ItemContextType {
  items: ItemIdDto[];
  dispatchItems: Dispatch<SetStateAction<ItemIdDto[]>>;
  resetItems: () => void;
  fetchItems: () => Promise<void>;
  saveNewItem: (command: CreateItemCommand) => Promise<void>;
  itemDetails: ItemDetailsDto;
  setItemDetails: Dispatch<SetStateAction<ItemIdDto>>;
  fetchItemDetails: (itemId: number) => Promise<void>;
  fetchBorrowRequest: (requestId: number) => Promise<BorrowedItemDto>;
  singleBorrowRequest: BorrowedItemDto;
  reviewBorrowRequest: (id: number, request: ReviewBorrowRequestCommand) => Promise<void>;
  submitRequestToBorrowNewItem: (request: BorrowItemCommand) => Promise<void>;
  EditItem: (_id: number, _editDto: EditItemDto) => Promise<void>;
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

  const reviewBorrowRequest = useCallback(
    async (id: number, request: ReviewBorrowRequestCommand) => {
      const itemClient = await client(ItemFetchClient);
      await itemClient.item_ReviewBorrowRequest(id, request);
    },
    []
  );
  const submitRequestToBorrowNewItem = useCallback(async (request: BorrowItemCommand) => {
    const itemClient = await client(ItemFetchClient);
    await itemClient.item_RequestToBorrow(request);
  }, []);

  const EditItem = useCallback(async (_id: number, _editDto: EditItemDto) => {
    const itemClient = await client(ItemFetchClient);
    await itemClient.item_EditItem(_id, _editDto);
  }, []);

  const resetItems = useCallback(() => {
    dispatchItems([]);
    dispatchRequest(null);
    setItemDetails(null);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    dispatchItems,
    resetItems,
    fetchItems,
    saveNewItem,
    itemDetails,
    setItemDetails,
    fetchItemDetails,
    fetchBorrowRequest,
    singleBorrowRequest,
    reviewBorrowRequest,
    submitRequestToBorrowNewItem,
    EditItem
  };
};

export default useItemContext;
