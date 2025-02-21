import type { NodeTypes } from "@xyflow/react";

import type { AppNode } from "./types";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { TriggerNode } from "./TriggerNode";
import { DataFlowNode } from "./DataFlowNode";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: {
      label: "wire",
    },
  },
  // {
  //   id: "b",
  //   type: "position-logger",
  //   position: {
  //     x: -100,
  //     y: 100,
  //   },
  //   data: { label: "drag me!" },
  // },
  {
    id: "c",
    position: { x: 0, y: 100 },
    data: {
      label: "your ideas",
    },
  },
  {
    id: "d",
    type: "output",
    position: {
      x: 0,
      y: 200,
    },
    data: { label: "with React Flow" },
  },
  {
    id: "67b6d7a8a447ec00004f918a",
    type: "trigger",
    position: { x: 250, y: 5 },
    data: {
      nodeId: "67b6d7a8a447ec00004f918a",
      nodeName: "Trigger",
      values: {
        icon: "https://studio.lamatic.ai/logo-short.svg",
        trigger: "trigger",
      },
    },
  },
  {
    id: "67b6d7a8e944ce0000b69ec1",
    type: "data-flow",
    position: { x: 250, y: 70 },
    data: {
      nodeId: "67b6d7a8e944ce0000b69ec1",
      nodeName: "Get data from API",
      values: {
        icon: "https://avatars.githubusercontent.com/u/12972006?s=200",
      },
    },
  },
];

export const nodeTypes = {
  trigger: TriggerNode,
  "data-flow": DataFlowNode,
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
