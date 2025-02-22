import { ReactFlow, Background, Controls } from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";
import "@xyflow/react/dist/style.css";

import { VersionList } from "./components/VersionList";
import { SaveButton } from "./components/SaveButton.tsx";
import { useSelectedVersionStore } from "./store/useSelectedVersionStore";
import { useInitializeApp } from "./hooks/useInitializeApp";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import type { SelectedVersionStoreType } from "./types.ts";

const selector = (state: SelectedVersionStoreType) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function App() {
  useInitializeApp();

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useSelectedVersionStore(useShallow(selector));

  return (
    <div className="h-screen w-screen">
      <div className="flex items-center gap-2">
        <VersionList />
      </div>

      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <div className="relative z-10 inline-block">
          <SaveButton />
        </div>
        <Background />

        <Controls />
      </ReactFlow>
    </div>
  );
}
