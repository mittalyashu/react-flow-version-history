import { useEffect } from "react";
import { useNodesState, type Node } from "@xyflow/react";

import db from "./versionDb";

export function useSelectedVersion() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

  async function handler() {
    let versionIdStr: string | undefined = undefined;

    // get selected ID
    const getSelectedVersion = localStorage.getItem("selectedVersion");
    if (getSelectedVersion) {
      const selectedVersionObject = JSON.parse(getSelectedVersion);
      versionIdStr = selectedVersionObject?.versionId;
    }

    if (versionIdStr) {
      // get version by ID from db
      const data = await db.versions.get(Number.parseInt(versionIdStr, 10));
      if (data) {
        setNodes(data?.nodes || []);
      }
    }
  }

  useEffect(() => {
    handler();
  }, []);

  return {
    nodes,
    onNodesChange,
  };
}
