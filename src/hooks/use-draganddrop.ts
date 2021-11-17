import { useState, DragEvent, useEffect } from 'react';

export default function useDragAndDrop() {
  const [dragOver, setDragOver] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('dragover', (event) => event.preventDefault());
    window.addEventListener('drop', (event) => event.preventDefault());
  }, []);

  const onDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const onDragEnter = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const onDragLeave = () => setDragOver(false);

  return {
    dragOver,
    setDragOver,
    onDragEnter,
    onDragOver,
    onDragLeave,
  };
}
