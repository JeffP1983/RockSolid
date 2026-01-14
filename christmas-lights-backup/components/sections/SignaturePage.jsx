import { useState, useEffect } from 'react';
import useProposalStore from '../../store/proposalStore';

const SignaturePage = () => {
  const { sectionData, updateSectionData, projectInfo } = useProposalStore();
  const signatureData = sectionData.signature;

  const [formData, setFormData] = useState({
    clientName: signatureData.clientName || projectInfo.clientName || '',
    date: signatureData.date || new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    updateSectionData('signature', formData);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Signature Page
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleChange('clientName', e.target.value)}
              placeholder="Client full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview</h3>

        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h4 className="text-2xl font-bold text-navy mb-6 text-center">
            Proposal Acceptance
          </h4>

          <div className="space-y-8">
            <p className="text-gray-700">
              By signing below, I accept the terms and conditions outlined in this
              proposal and authorize DFW Christmas Lights LLC to proceed with the
              work as described.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Client Signature */}
              <div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Client Signature
                  </label>
                  <div className="border-b-2 border-gray-400 h-12 flex items-end">
                    <span className="text-gray-400 italic text-sm pb-1">
                      Signature
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-gray-600">Print Name:</div>
                  <div className="font-semibold text-gray-800">
                    {formData.clientName || '_____________________'}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-600">Date:</div>
                  <div className="font-semibold text-gray-800">
                    {formData.date || '_____________________'}
                  </div>
                </div>
              </div>

              {/* Company Representative */}
              <div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Representative
                  </label>
                  <div className="border-b-2 border-gray-400 h-12 flex items-end">
                    <span className="text-gray-400 italic text-sm pb-1">
                      Signature
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-gray-600">Print Name:</div>
                  <div className="font-semibold text-gray-800">
                    DFW Christmas Lights LLC
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-600">Date:</div>
                  <div className="font-semibold text-gray-800">
                    {formData.date || '_____________________'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                This proposal is valid for 30 days from the date above. After
                acceptance, a 50% deposit is required to secure your installation
                date.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> The signature page will be included in the final
          PDF. Clients can print, sign, and return this page to accept the proposal.
        </p>
      </div>
    </div>
  );
};

export default SignaturePage;
