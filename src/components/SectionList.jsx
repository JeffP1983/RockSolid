import useProposalStore from '../store/proposalStore';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableSection = ({ section, isSelected, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? 'bg-navy text-white'
          : 'bg-white hover:bg-gray-50 text-gray-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{section.name}</span>
        <span className="text-xs opacity-70">
          {section.enabled ? '✓' : ''}
        </span>
      </div>
    </div>
  );
};

const SectionList = ({ selectedSection, onSelectSection }) => {
  const { sections, updateSections } = useProposalStore();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      updateSections(newSections);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Sections</h2>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          {sections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              isSelected={selectedSection?.id === section.id}
              onClick={() => onSelectSection(section)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Drag to reorder sections
        </p>
      </div>
    </div>
  );
};

export default SectionList;
