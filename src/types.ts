export type IVersion = {
  id: number;
  name: string;
  nodes: unknown;
  edges: unknown;
  created_at: string;
};

export type IVersionSelected = {
  versionId: number;
  selected_at: string;
};
