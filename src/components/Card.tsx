import React, { useRef, useState } from "react";
import useResize from "../hooks/useResize";
import ResizeHandle from "./ResizeHandle";

interface CardProps {
  id: string;
}

const Card: React.FC<CardProps> = ({ id }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [gridColumn, setGridColumn] = useState(1);
  const [gridRow, setGridRow] = useState(1);

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
      <div className="card-header">Card {id.split("-")[1]}</div>

      <div className="card-content">
        This is {id}. You can resize this card by dragging the handle in the
        bottom-right corner.
      </div>

      <ResizeHandle onMouseDown={handleMouseDown} />

      {sizeIndicator && (
        <div
          className={`card-size-indicator ${
            sizeIndicator.visible ? "visible" : ""
          }`}
          style={{
            top: sizeIndicator.top,
            left: sizeIndicator.left,
          }}
        >
          {sizeIndicator.text}
        </div>
      )}
    </div>
  );
};

export default Card;
