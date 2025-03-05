import React from "react";

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onMouseDown }) => {
  return <div className="resize-handle" onMouseDown={onMouseDown} />;
};

export default ResizeHandle;
