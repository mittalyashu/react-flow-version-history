import { Handle, Position, type NodeProps } from "@xyflow/react";

import type { TriggerNode as TriggerNodeType } from "./types";

export function TriggerNode({ data, id }: NodeProps<TriggerNodeType>) {
  return (
    <div className="react-flow__node-default">
      <div className="flex items-center gap-2">
        {data.values.icon ? (
          <img src={data.values.icon} alt="" className="size-4" />
        ) : null}

        <p className="font-medium">{data.nodeName}</p>
      </div>

      <Handle type="source" position={Position.Bottom} id={id} />
    </div>
  );
}
