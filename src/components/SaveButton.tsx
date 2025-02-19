import { useReactFlow } from "@xyflow/react";

import { useVersionsStore } from "../store/useVersionsStore.ts";
import type { AppNode } from "../nodes/types";

export function SaveButton() {
  const addVersion = useVersionsStore((state) => state.add);
  const reactFlow = useReactFlow();

  async function clickHandler() {
    const nodes = reactFlow.getNodes() as AppNode[];
    const edges = reactFlow.getEdges();

    await addVersion(nodes, edges);
  }

  return (
    <button
      type="button"
      onClick={clickHandler}
      className="px-2 bg-green-200 hover:bg-green-500 rounded-md"
    >
      Save
    </button>
  );
}
