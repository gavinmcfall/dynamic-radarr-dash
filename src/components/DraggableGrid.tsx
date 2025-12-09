import { useState, useRef, useCallback, ReactNode } from 'react';

interface Panel {
  id: string;
  content: ReactNode;
}

interface DraggableGridProps {
  panels: Panel[];
  columns?: number;
}

const DraggableGrid = ({ panels: initialPanels, columns = 2 }: DraggableGridProps) => {
  const [panels, setPanels] = useState(initialPanels);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, id: string) => {
    dragNode.current = e.currentTarget;
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    
    // Add a slight delay to allow the drag image to be created
    setTimeout(() => {
      if (dragNode.current) {
        dragNode.current.style.opacity = '0.4';
      }
    }, 0);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragNode.current) {
      dragNode.current.style.opacity = '1';
    }
    setDraggedId(null);
    setDragOverId(null);
    dragNode.current = null;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggedId && id !== draggedId) {
      setDragOverId(id);
    }
  }, [draggedId]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    
    if (!draggedId || draggedId === targetId) return;

    setPanels(prev => {
      const draggedIndex = prev.findIndex(p => p.id === draggedId);
      const targetIndex = prev.findIndex(p => p.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const newPanels = [...prev];
      const [draggedPanel] = newPanels.splice(draggedIndex, 1);
      newPanels.splice(targetIndex, 0, draggedPanel);
      
      return newPanels;
    });

    setDragOverId(null);
  }, [draggedId]);

  return (
    <div 
      className="draggable-grid"
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1.5rem',
      }}
    >
      {panels.map((panel) => (
        <div
          key={panel.id}
          draggable
          onDragStart={(e) => handleDragStart(e, panel.id)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, panel.id)}
          onDrop={(e) => handleDrop(e, panel.id)}
          className={`draggable-panel ${dragOverId === panel.id ? 'draggable-panel--drag-over' : ''} ${draggedId === panel.id ? 'draggable-panel--dragging' : ''}`}
        >
          <div className="drag-handle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="5" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="12" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
            </svg>
          </div>
          {panel.content}
        </div>
      ))}
    </div>
  );
};

export default DraggableGrid;
