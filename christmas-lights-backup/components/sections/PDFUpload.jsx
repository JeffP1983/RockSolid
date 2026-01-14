import { useState } from 'react';
import useProposalStore from '../../store/proposalStore';

const PDFUpload = ({ sectionId }) => {
  const { sectionData, addPDF, removePDF } = useProposalStore();
  const pdfs = sectionData[sectionId]?.pdfs || [];
  const [uploading, setUploading] = useState(false);

  const sectionNames = {
    strandr: 'Strandr Mockups',
    inchr: 'INCHR Measurements',
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        alert(`${file.name} is not a PDF file`);
        continue;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        addPDF(sectionId, { name: file.name, data: base64 });
      };
      reader.readAsDataURL(file);
    }

    setUploading(false);
    e.target.value = ''; // Reset input
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Upload {sectionNames[sectionId] || 'PDFs'}
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select PDF files to upload
          </label>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-navy file:text-white
              hover:file:bg-blue-800
              disabled:opacity-50"
          />
          {uploading && (
            <p className="mt-2 text-sm text-blue-600">Uploading...</p>
          )}
        </div>

        {/* Uploaded PDFs List */}
        {pdfs.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Uploaded Files ({pdfs.length})
            </h4>
            {pdfs.map((pdf, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-3 rounded border border-gray-200"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                  <span className="text-gray-700 text-sm">
                    {pdf.name || `PDF ${index + 1}`}
                  </span>
                </div>
                <button
                  onClick={() => removePDF(sectionId, index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded border-2 border-dashed border-gray-300">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-500 text-sm">No PDFs uploaded yet</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong>{' '}
          {sectionId === 'strandr' && (
            <>
              Upload Strandr mockup PDFs showing your lighting design
              visualizations. These will be included in the proposal to show the
              client what their property will look like.
            </>
          )}
          {sectionId === 'inchr' && (
            <>
              Upload INCHR measurement reports with linear footage calculations.
              These provide detailed measurements and technical specifications.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default PDFUpload;
