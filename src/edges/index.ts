import type { Edge, EdgeTypes } from "@xyflow/react";

export const initialEdges: Edge[] = [
  { id: "a->c", source: "a", target: "c", animated: true },
  // { id: "b->d", source: "b", target: "d" },
  { id: "c->d", source: "c", target: "d", animated: true },
  {
    id: "67b6d7a8a447ec00004f918a->67b6d7a8e944ce0000b69ec1",
    source: "67b6d7a8a447ec00004f918a",
    target: "67b6d7a8e944ce0000b69ec1",
    type: "default",
  },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
