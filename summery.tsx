// @ts-ignore

// This is where all the cards are being rendered, and the main container has the CSS class "card-grid".
<div className="card-grid">
  {cards.map((cardId) => (
    <Card key={cardId} id={cardId} />
  ))}
</div>

// CSS for the "card-grid" container, which controls the layout of the cards.
// The grid dynamically fills available space using "auto-fill" with a minimum card size of 250px.
// Cards are arranged in rows with a height of 200px, and a gap of 20px is maintained between them.
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  gap: 20px;
  width: 100%;
  position: relative;
}

// Inside Card.tsx component

// References the card element to track its size and position.
const cardRef = useRef<HTMLDivElement>(null);

// State variables to manage the card's dynamic span in grid columns and rows.
const [gridColumn, setGridColumn] = useState(1);
const [gridRow, setGridRow] = useState(1);

// Custom hook "useResize" handles resizing logic and updates the grid span values dynamically.
const { handleMouseDown, sizeIndicator, resizeActive } = useResize(
  cardRef,
  setGridColumn,
  setGridRow,
);

return (
  <div
    ref={cardRef}
    className={`card ${resizeActive ? "resizing" : ""}`}
    style={{
      gridColumn: `span ${gridColumn}`,
      gridRow: `span ${gridRow}`,
    }}
    data-grid-column={gridColumn}
    data-grid-row={gridRow}
  >
  ....
  
  // The "gridColumn" and "gridRow" styles dynamically adjust the card's size within the grid.
  // If gridColumn is set to "span 2", the card will occupy two columns, increasing its width.
  // If gridRow is set to "span 3", the card will occupy three rows, increasing its height.
  style={{
    gridColumn: `span ${gridColumn}`,
    gridRow: `span ${gridRow}`,
  }}
