import { useState, useEffect } from 'react';
import useProposalStore from '../store/proposalStore';
import SectionList from '../components/SectionList';
import SectionEditor from '../components/SectionEditor';
import { downloadProposal } from '../utils/pdfGenerator';

const ProposalBuilder = ({ onBack }) => {
  const store = useProposalStore();
  const { sections, projectInfo, updateLastSaved } = store;
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateLastSaved();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [updateLastSaved]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportError(null);

    try {
      const success = await downloadProposal(store);
      if (!success) {
        setExportError('Failed to generate PDF. Please try again.');
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportError('An error occurred while generating the PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-navy text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Proposal Builder</h1>
            <p className="text-sm text-gray-300">
              {projectInfo.clientName} - {projectInfo.proposalNumber}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className={`px-6 py-2 bg-gold text-navy font-semibold rounded-md hover:bg-yellow-500 transition-colors ${
                isExporting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isExporting ? 'Generating PDF...' : '📄 Export PDF'}
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-white text-navy rounded-md hover:bg-gray-100 transition-colors"
            >
              Back to Setup
            </button>
          </div>
        </div>
      </div>

      {/* Export Error Message */}
      {exportError && (
        <div className="max-w-7xl mx-auto mt-4 px-6">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span>{exportError}</span>
            <button
              onClick={() => setExportError(null)}
              className="absolute top-0 right-0 px-4 py-3"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Section List */}
          <div className="col-span-3">
            <SectionList
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
            />
          </div>

          {/* Main Editor Area */}
          <div className="col-span-9">
            <SectionEditor section={selectedSection} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalBuilder;
