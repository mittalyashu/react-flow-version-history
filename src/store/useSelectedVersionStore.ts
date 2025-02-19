import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

import type {
  SelectedVersionState,
  SelectedVersionStoreType,
} from "../types.ts";

export const useSelectedVersionStore = create<SelectedVersionStoreType>(
  (set, get) => ({
    id: null,
    selectedAt: null,
    nodes: [],
    edges: [],

    update: (data: SelectedVersionState) => set(() => ({ ...data })),
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
    setNodes: (nodes) => {
      set({ nodes });
    },
    setEdges: (edges) => {
      set({ edges });
    },
  }),
);
