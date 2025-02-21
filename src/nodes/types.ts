import type { Node, BuiltInNode } from "@xyflow/react";

type NodeBaseType = {
  nodeId: string;
  // nodeType: string
  nodeName: string;
  values: {
    icon?: string;
  } & Record<string, unknown>;
};

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type TriggerNode = Node<NodeBaseType, "trigger">;
export type DataFlowNode = Node<NodeBaseType, "data-flow">;

export type AppNode =
  | BuiltInNode
  | TriggerNode
  | DataFlowNode
  | PositionLoggerNode;
