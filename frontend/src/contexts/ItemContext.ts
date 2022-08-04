import { createContext } from "react";
import {
  BorrowItemCommand,
  CreateItemCommand,
  ReviewBorrowRequestCommand
} from "services/backend/client.generated";

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
  },
  fetchBorrowRequest: async (requestId: number) => {
    return {};
  },
  singleBorrowRequest: {},
  reviewBorrowRequest: async (id: number, request: ReviewBorrowRequestCommand) => {
    return;
  },
  submitRequestToBorrowNewItem: async (request: BorrowItemCommand) => {
    return;
  },
  EditItem: async (_id: number, _editDto: EditItemDto) => {
    return;
  }
});
