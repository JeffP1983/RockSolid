import { useState, useEffect } from 'react';
import useProposalStore from '../../store/proposalStore';

const Timeline = () => {
  const { sectionData, updateSectionData } = useProposalStore();
  const timelineData = sectionData.timeline;

  const [items, setItems] = useState(timelineData.items || []);

  useEffect(() => {
    updateSectionData('timeline', { items });
  }, [items]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { date: '', description: '' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Project Timeline
        </h3>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
                  />
                </div>
                <div className="col-span-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, 'description', e.target.value)
                    }
                    placeholder="e.g., Initial Consultation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
                  />
                </div>
                <div className="col-span-1 flex items-end">
                  <button
                    onClick={() => removeItem(index)}
                    className="w-full px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mt-4 w-full bg-navy text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
        >
          + Add Timeline Item
        </button>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview</h3>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="relative">
            {items.map((item, index) => (
              <div key={index} className="flex mb-6 last:mb-0">
                {/* Timeline dot and line */}
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-gold rounded-full border-4 border-navy"></div>
                  {index < items.length - 1 && (
                    <div className="w-0.5 h-full bg-navy mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow pb-6">
                  <div className="font-semibold text-navy mb-1">
                    {item.description || 'Milestone'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.date || 'Date TBD'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Add key project milestones to show the client your
          professional timeline. Include dates for consultation, design approval,
          installation, and completion.
        </p>
      </div>
    </div>
  );
};

export default Timeline;
