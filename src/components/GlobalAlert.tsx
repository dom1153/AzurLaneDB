// import ships from "../../db/ships.json";
import {
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import Dev from "@/hooks/useDevTools";

// for testing new concepts
export default function GlobalAlert({}) {
  return (
    <>
      {Dev.isLocalhost() ? (
        <HStack spacing={""}>
          <Alert
            status={Dev.isProd() ? "success" : "info"}
            alignItems={"center"}
            textAlign={"center"}
            zIndex={1000}
          >
            <AlertIcon />
            <AlertTitle>Environment mode:</AlertTitle>
            <AlertDescription>
              {Dev.getDevMode().toUpperCase()}
            </AlertDescription>
          </Alert>
          <Alert
            status={"warning"}
            alignItems={"center"}
            textAlign={"center"}
            zIndex={1000}
          >
            <AlertIcon />
            <AlertTitle>Version:</AlertTitle>
            <AlertDescription>"P.P. Alpha" (pre-pre alpha)</AlertDescription>
          </Alert>
        </HStack>
      ) : (
        <></>
      )}
    </>
  );
}
