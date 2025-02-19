import type {
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";

import type { AppNode } from "./nodes/types";

export type VersionsStoreType = {
  versions: IVersion[];
  count: number;
  first?: IVersion;
  last?: IVersion;
  add: (nodes: AppNode[], edges: Edge[]) => Promise<number | null>;
  getAll: () => Promise<void>;
};

export type SelectedVersionState = {
  id: number | null;
  selectedAt: string | null;
  nodes: AppNode[];
  edges: Edge[];
};

export type SelectedVersionStoreType = SelectedVersionState & {
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  update: (state: SelectedVersionState) => void;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
};

export type IVersion = {
  id: number;
  name: string;
  nodes: AppNode[];
  edges: Edge[];
  created_at: string;
};

export type IVersionSelected = {
  versionId: number;
  selected_at: string;
};
