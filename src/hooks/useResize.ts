import { useCallback, useEffect, useState } from "react";

const GRID_ITEM_WIDTH = 250;
const GRID_ITEM_HEIGHT = 200;
const GRID_GAP = 20;

const useResize = (
  cardRef: React.RefObject<HTMLDivElement | null>,
  setGridColumn: React.Dispatch<React.SetStateAction<number>>,
  setGridRow: React.Dispatch<React.SetStateAction<number>>,
) => {
  const [resizeActive, setResizeActive] = useState(false);
  const [sizeIndicator, setSizeIndicator] = useState<{
    visible: boolean;
    top: string;
    left: string;
    text: string;
  } | null>(null);

  const calculateMaxColumns = useCallback(() => {
    if (!cardRef.current) return 0;
    const containerWidth =
      cardRef.current.closest(".card-grid")?.clientWidth || 0;
    return Math.floor(containerWidth / (GRID_ITEM_WIDTH + GRID_GAP));
  }, [cardRef]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = cardRef.current?.offsetWidth || 0;
      const startHeight = cardRef.current?.offsetHeight || 0;
      const maxColumns = calculateMaxColumns();

      setResizeActive(true);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newWidth = startWidth + (moveEvent.clientX - startX);
        const newHeight = startHeight + (moveEvent.clientY - startY);

        const newColSpan = Math.max(
          1,
          Math.min(
            maxColumns,
            Math.round(newWidth / (GRID_ITEM_WIDTH + GRID_GAP)),
          ),
        );
        const newRowSpan = Math.max(
          1,
          Math.round(newHeight / (GRID_ITEM_HEIGHT + GRID_GAP)),
        );

        setGridColumn(newColSpan);
        setGridRow(newRowSpan);

        // Update size indicator
        setSizeIndicator({
          visible: true,
          top: `${moveEvent.clientY - 30}px`,
          left: `${moveEvent.clientX + 10}px`,
          text: `${newColSpan} × ${newRowSpan}`,
        });
      };

      const handleMouseUp = () => {
        setResizeActive(false);
        setSizeIndicator(null);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [calculateMaxColumns, cardRef, setGridColumn, setGridRow],
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      calculateMaxColumns();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateMaxColumns]);

  return {
    handleMouseDown,
    sizeIndicator,
    resizeActive,
  };
};

export default useResize;
