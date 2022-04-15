import { Button, Input } from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import { useHub } from "services/signalR/useHub";

const SignalRSend: FC = () => {
  const { hub } = useHub("exampleHub");

  const [message, setMessage] = useState("");

  const sendMessageToClients = useCallback(async () => {
    await hub.invoke("joinGroup", "GROUP_RED");
    await hub.fireAndForget("sendMessage", message);
  }, [hub, message]);

  return (
    <div>
      <Input value={message} onChange={e => setMessage(e.target.value)} />
      <Button onClick={sendMessageToClients}>Send!</Button>
    </div>
  );
};

export default SignalRSend;
