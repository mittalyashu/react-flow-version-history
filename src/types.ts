import type { Edge } from "@xyflow/react";

import type { AppNode } from "./nodes/types";

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
