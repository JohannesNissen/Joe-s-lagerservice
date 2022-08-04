import { Container, FormControl, HStack, VStack } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import React, { FC } from "react";

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  time?: string;
  setTime?: (time: string) => void;
  id: string;
  dated: Date;
  setDated: React.Dispatch<React.SetStateAction<Date>>;
};

const DateTimeInput: FC<Props> = ({ date, setDate, time, setTime, id, dated, setDated }) => {
  return (
    <Container alignItems={"flex-start"} pl="0" maxW="2xl" mb="20px">
      <FormControl>
        <HStack alignItems={"flex-start"}>
          <VStack alignItems={"flex-start"}>
            {/* <Input
              id={id}
              value={date}
              onChange={e => {
                setDate(e.target.value);
              }}
              type="date"
              autoComplete="off"
            /> */}
            <SingleDatepicker name="date-input" date={dated} onDateChange={setDated} />
          </VStack>
          {/* <VStack alignItems={"flex-start"}>
            <FormLabel>Tid</FormLabel>
            <Input
              value={time}
              onChange={e => {
                setTime(e.target.value);
              }}
              type="time"></Input>
          </VStack> */}
        </HStack>
      </FormControl>
    </Container>
  );
};

export default DateTimeInput;
