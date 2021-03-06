import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  VStack
} from "@chakra-ui/react";
import { MdFilterList } from "@react-icons/all-files/md/MdFilterList";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import type SelectType from "types/SelectType";
import { queryToArr } from "utils/queryStringUtils";

type Props = {
  queryKey: string;
  queryGroup?: string;
  filterCb?: (_qkey: string, _chosenOptions: SelectType["id"]) => void;

  options: SelectType[];
};

const QuerySingleSelectBtn: FC<Props> = ({
  filterCb = () => null,
  queryKey,
  queryGroup = "t",
  options
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [checkedItem, setCheckedItem] = useState<SelectType["id"]>("ANY");

  const router = useRouter();

  useEffect(() => {
    const filters = queryToArr(router.query.thfilter ?? []);

    filters.forEach(filter => {
      const [checkQueryGroup, checkKey, value] = filter.split("_");

      if (queryGroup === checkQueryGroup) {
        if (queryKey === checkKey) {
          setCheckedItem(value);
          filterCb(queryKey, value);
        }
      }
    });
  }, [router, router.query, filterCb, queryGroup, queryKey]);

  const onClick = useCallback(() => {
    const copy = { ...router.query };
    const filters = queryToArr(copy.thfilter ?? []).filter(filter => {
      const [checkQueryGroup, checkKey] = filter.split("_");
      return !(queryGroup === checkQueryGroup && queryKey === checkKey);
    });
    if (checkedItem === "ANY") {
      filterCb(queryKey, null);
    } else {
      filters.push(`${queryGroup}_${queryKey}_${checkedItem}`);
    }
    copy["thfilter"] = filters;
    router.replace(
      {
        query: copy
      },
      undefined,
      { shallow: true }
    );
    setIsOpen(false);
  }, [checkedItem, filterCb, queryGroup, queryKey, router]);

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <IconButton
          size="xs"
          aria-label="Filter column"
          colorScheme={checkedItem !== "ANY" ? "orange" : "gray"}
          onClick={() => setIsOpen(true)}
          icon={<MdFilterList />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Filter</PopoverHeader>
        <PopoverBody>
          <RadioGroup name="test" onChange={(x: string) => setCheckedItem(x)} value={checkedItem}>
            <VStack align="left" minH={30} maxH={60} overflowY="auto">
              <Radio value={"ANY"} isChecked={"ANY" === checkedItem}>
                Any
              </Radio>
              {options.map(o => (
                <Radio key={o.id} value={o.id} isChecked={o.id === checkedItem}>
                  {o.name}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </PopoverBody>
        <PopoverFooter>
          <Button onClick={onClick}>Apply</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default QuerySingleSelectBtn;
