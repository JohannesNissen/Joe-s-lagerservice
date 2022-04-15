import { Button, Stack } from "@chakra-ui/react";
import { FC, useCallback, useRef } from "react";

import UsernamePasswordLogin, { ClickHandler } from "./UsernamePasswordLogin";

const ForwardRefCallback: FC = () => {
  const childRef = useRef<ClickHandler>();

  const clickClientLogin = useCallback(async () => {
    const { username, password } = childRef.current.getState();
    alert(`${username}:${password}`);
  }, []);

  return (
    <Stack>
      <UsernamePasswordLogin ref={childRef} myProps={2} />

      <Button onClick={clickClientLogin} colorScheme="green">
        Login
      </Button>
    </Stack>
  );
};

export default ForwardRefCallback;
