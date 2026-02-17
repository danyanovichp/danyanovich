import { type WorkflowNode, type WorkflowConnection } from '@/data/portfolioProjects';

interface WorkflowDiagramProps {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

const NODE_W = 150;
const NODE_H = 60;
const SVG_W = 1000;
const SVG_H = 340;

const WorkflowDiagram = ({ nodes, connections }: WorkflowDiagramProps) => {
  const getNodeById = (id: string) => nodes.find((n) => n.id === id)!;

  const getConnectionPoints = (from: WorkflowNode, to: WorkflowNode) => {
    const fromCx = (from.x / 100) * SVG_W + NODE_W / 2;
    const fromCy = (from.y / 100) * SVG_H + NODE_H / 2;
    const toCx = (to.x / 100) * SVG_W + NODE_W / 2;
    const toCy = (to.y / 100) * SVG_H + NODE_H / 2;

    const dx = toCx - fromCx;
    const dy = toCy - fromCy;

    let fromX: number, fromY: number, toX: number, toY: number;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        fromX = (from.x / 100) * SVG_W + NODE_W;
        toX = (to.x / 100) * SVG_W;
      } else {
        fromX = (from.x / 100) * SVG_W;
        toX = (to.x / 100) * SVG_W + NODE_W;
      }
      fromY = fromCy;
      toY = toCy;
    } else {
      fromX = fromCx;
      toX = toCx;
      if (dy > 0) {
        fromY = (from.y / 100) * SVG_H + NODE_H;
        toY = (to.y / 100) * SVG_H;
      } else {
        fromY = (from.y / 100) * SVG_H;
        toY = (to.y / 100) * SVG_H + NODE_H;
      }
    }

    return { fromX, fromY, toX, toY };
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl p-6 bg-muted/20 border border-border/10">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full min-w-[500px]"
        style={{ height: 'auto' }}
      >
        <defs>
          {connections.map((conn, i) => {
            const fromNode = getNodeById(conn.from);
            return (
              <linearGradient
                key={`grad-${i}`}
                id={`conn-grad-${conn.from}-${conn.to}`}
                x1="0%" y1="0%" x2="100%" y2="0%"
              >
                <stop offset="0%" stopColor={`hsl(${fromNode.color})`} stopOpacity="0.7" />
                <stop offset="100%" stopColor={`hsl(${getNodeById(conn.to).color})`} stopOpacity="0.7" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = getNodeById(conn.from);
          const toNode = getNodeById(conn.to);
          const { fromX, fromY, toX, toY } = getConnectionPoints(fromNode, toNode);
          const dx = toX - fromX;
          const dy = toY - fromY;
          const cx1 = fromX + dx * 0.4;
          const cy1 = fromY + dy * 0.1;
          const cx2 = toX - dx * 0.4;
          const cy2 = toY - dy * 0.1;
          return (
            <path
              key={`conn-${i}`}
              d={`M ${fromX} ${fromY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toX} ${toY}`}
              fill="none"
              stroke={`url(#conn-grad-${conn.from}-${conn.to})`}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.6"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const nx = (node.x / 100) * SVG_W;
          const ny = (node.y / 100) * SVG_H;
          return (
            <g key={node.id}>
              <rect
                x={nx}
                y={ny}
                width={NODE_W}
                height={NODE_H}
                rx={30}
                ry={30}
                fill={`hsl(${node.color} / 0.12)`}
                stroke={`hsl(${node.color} / 0.3)`}
                strokeWidth="1.5"
              />
              <text
                x={nx + 22}
                y={ny + NODE_H / 2 + 1}
                fontSize="20"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {node.icon}
              </text>
              <text
                x={nx + 42}
                y={ny + NODE_H / 2 + 1}
                fontSize="14"
                fontWeight="500"
                className="fill-foreground/70"
                dominantBaseline="central"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default WorkflowDiagram;
