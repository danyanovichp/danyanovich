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
  const getNodeCenter = (node: WorkflowNode) => ({
    x: (node.x / 100) * SVG_W + NODE_W / 2,
    y: (node.y / 100) * SVG_H + NODE_H / 2,
  });

  const getNodeById = (id: string) => nodes.find((n) => n.id === id)!;

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
          const from = getNodeCenter(getNodeById(conn.from));
          const to = getNodeCenter(getNodeById(conn.to));
          const dx = to.x - from.x;
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
