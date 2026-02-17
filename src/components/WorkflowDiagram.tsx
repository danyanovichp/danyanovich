import { type WorkflowNode, type WorkflowConnection } from '@/data/portfolioProjects';

interface WorkflowDiagramProps {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

const NODE_W = 100;
const NODE_H = 44;
const SVG_W = 900;
const SVG_H = 200;

const WorkflowDiagram = ({ nodes, connections }: WorkflowDiagramProps) => {
  const getNodeCenter = (node: WorkflowNode) => ({
    x: (node.x / 100) * SVG_W + NODE_W / 2,
    y: (node.y / 100) * SVG_H + NODE_H / 2,
  });

  const getNodeById = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-card/50 backdrop-blur-xl border border-border/20 p-4">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full min-w-[600px]"
        style={{ height: 'auto', maxHeight: 220 }}
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
                <stop offset="0%" stopColor={`hsl(${fromNode.color})`} stopOpacity="0.8" />
                <stop offset="100%" stopColor={`hsl(${getNodeById(conn.to).color})`} stopOpacity="0.8" />
              </linearGradient>
            );
          })}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const from = getNodeCenter(getNodeById(conn.from));
          const to = getNodeCenter(getNodeById(conn.to));
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const cx1 = from.x + dx * 0.4;
          const cy1 = from.y;
          const cx2 = to.x - dx * 0.4;
          const cy2 = to.y;
          return (
            <path
              key={`conn-${i}`}
              d={`M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`}
              fill="none"
              stroke={`url(#conn-grad-${conn.from}-${conn.to})`}
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              opacity="0.7"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const nx = (node.x / 100) * SVG_W;
          const ny = (node.y / 100) * SVG_H;
          return (
            <g key={node.id}>
              {/* Node background */}
              <rect
                x={nx}
                y={ny}
                width={NODE_W}
                height={NODE_H}
                rx={14}
                ry={14}
                fill={`hsl(${node.color} / 0.12)`}
                stroke={`hsl(${node.color} / 0.4)`}
                strokeWidth="1.5"
              />
              {/* Icon */}
              <text
                x={nx + 16}
                y={ny + NODE_H / 2 + 1}
                fontSize="16"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {node.icon}
              </text>
              {/* Label */}
              <text
                x={nx + 32}
                y={ny + NODE_H / 2 + 1}
                fontSize="11"
                fontWeight="600"
                fill="currentColor"
                className="fill-foreground"
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
