import * as Cha from "@chakra-ui/react";
import { useNyi } from "@/hooks/useDevTools";

function ToastAlert() {
  const nyi = useNyi();
  return <Cha.Button onClick={() => nyi()}>Show Toast</Cha.Button>;
}
