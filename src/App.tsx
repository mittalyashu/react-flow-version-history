import { useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { getVersionById, saveVersion } from "./store/versionDb";
import { VersionList } from "./components/VersionList";

export default function App() {
  const isLoaded = useRef<boolean>(false);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges],
  );

  async function initalCopy() {
    if (isLoaded.current) return;

    const initialVersion = await getVersionById(1);
    if (!initialVersion) {
      await saveVersion("initial", nodes, edges);
    }
  }

  useEffect(() => {
    initalCopy();
    isLoaded.current = true;
  }, []);

  return (
    <div className="h-screen w-screen">
      <VersionList />

      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />

        <Controls />
      </ReactFlow>
    </div>
  );
}
