import { useReactFlow } from "@xyflow/react";

import { useVersionsStore } from "../store/useVersionsStore.ts";
import type { AppNode } from "../nodes/types";
import { useSelectedVersionStore } from "../store/useSelectedVersionStore.ts";

export function SaveButton() {
  const addVersion = useVersionsStore((state) => state.add);
  const reactFlow = useReactFlow();

  async function clickHandler() {
    const nodes = reactFlow.getNodes() as AppNode[];
    const edges = reactFlow.getEdges();

    const id = await addVersion(nodes, edges);
    if (id) {
      const selectedAt = new Date().toJSON();
      useSelectedVersionStore.getState().update({
        id,
        selectedAt,
        nodes,
        edges,
      });

      localStorage.setItem(
        "selectedVersion",
        JSON.stringify({
          versionId: id,
          selectedAt,
        }),
      );
    }
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
