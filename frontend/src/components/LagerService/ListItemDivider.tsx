import { Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  width?: string;
  margins?: string;
};

const ListItemDivider: FC<Props> = ({ width = "inherit", margins }) => {
  return <Box height="2px" width={width} mx={margins} border="solid 1px black" />;
};

export default ListItemDivider;
