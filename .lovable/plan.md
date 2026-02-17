

# Plan: Fix Connection Lines to Connect Block Edges

## Problem

Currently, all connection lines go from the **center** of one node to the **center** of another. This causes lines to overlap and pass through intermediate nodes, making the diagram hard to read (as seen in the screenshot).

## Solution

Update `src/components/WorkflowDiagram.tsx` to calculate connection endpoints at the **edges** of nodes instead of centers:

- If the target node is to the **right** of the source: line starts from the **right edge** of the source and ends at the **left edge** of the target
- If the target node is to the **left**: line starts from the **left edge** and ends at the **right edge**
- If nodes are vertically aligned: connect from the **top/bottom edge** accordingly

The Bezier control points will also be adjusted so curves flow naturally between blocks without crossing through them.

## Technical Details

### File: `src/components/WorkflowDiagram.tsx`

Replace `getNodeCenter` with a new `getConnectionPoints(fromNode, toNode)` function:

```typescript
const getConnectionPoints = (from: WorkflowNode, to: WorkflowNode) => {
  const fromCx = (from.x / 100) * SVG_W + NODE_W / 2;
  const fromCy = (from.y / 100) * SVG_H + NODE_H / 2;
  const toCx = (to.x / 100) * SVG_W + NODE_W / 2;
  const toCy = (to.y / 100) * SVG_H + NODE_H / 2;

  const dx = toCx - fromCx;
  const dy = toCy - fromCy;

  let fromX, fromY, toX, toY;

  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal: connect right edge -> left edge (or vice versa)
    if (dx > 0) {
      fromX = (from.x / 100) * SVG_W + NODE_W; // right edge
      toX = (to.x / 100) * SVG_W;               // left edge
    } else {
      fromX = (from.x / 100) * SVG_W;            // left edge
      toX = (to.x / 100) * SVG_W + NODE_W;       // right edge
    }
    fromY = fromCy;
    toY = toCy;
  } else {
    // Vertical: connect bottom edge -> top edge (or vice versa)
    fromX = fromCx;
    toX = toCx;
    if (dy > 0) {
      fromY = (from.y / 100) * SVG_H + NODE_H; // bottom edge
      toY = (to.y / 100) * SVG_H;               // top edge
    } else {
      fromY = (from.y / 100) * SVG_H;            // top edge
      toY = (to.y / 100) * SVG_H + NODE_H;       // bottom edge
    }
  }

  return { fromX, fromY, toX, toY };
};
```

Update the connections rendering to use these edge points, with Bezier control points that create smooth curves between the block edges.

### Changes summary

| File | Change |
|------|--------|
| `src/components/WorkflowDiagram.tsx` | Replace center-to-center connections with edge-to-edge connections |

