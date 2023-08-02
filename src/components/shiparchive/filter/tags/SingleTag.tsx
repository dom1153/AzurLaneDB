import { Tag } from "@chakra-ui/react";

// will need a callback or an atom...
export default function SingleTag({ option }) {
  const { value, type, label, checked } = option;
  return <Tag as="button">{label}</Tag>;
}

function useTag() {}
