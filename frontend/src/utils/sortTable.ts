import React from "react";
import { ItemIdDto } from "services/backend/client.generated";

const compareValues = (firstItem: any, secondItem: any) => {
  if (typeof firstItem === "string" && typeof secondItem === "string") {
    return firstItem.toLowerCase() < secondItem.toLowerCase();
  }
  return firstItem < secondItem;
};

export const useSortableData = (items: ItemIdDto[], config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const firstItem = a[sortConfig.key];
        const secondItem = b[sortConfig.key];

        if (compareValues(firstItem, secondItem)) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (!compareValues(firstItem, secondItem)) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
