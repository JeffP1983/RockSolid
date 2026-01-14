import { useState, useEffect } from 'react';
import useProposalStore from '../../store/proposalStore';

const TermsConditions = () => {
  const { sectionData, updateSectionData } = useProposalStore();
  const termsData = sectionData.terms;

  const [content, setContent] = useState(termsData.content || '');

  useEffect(() => {
    updateSectionData('terms', { content });
  }, [content]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Terms & Conditions
        </h3>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent font-mono text-sm"
          placeholder="Enter your terms and conditions..."
        />
      </div>

      {/* Preview */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview</h3>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-xl font-bold text-navy mb-4">
            Terms & Conditions
          </h4>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
              {content || 'No terms and conditions entered yet.'}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Default terms have been pre-filled. Review and
          customize as needed for your business. Include payment terms, warranty
          information, cancellation policy, and liability clauses.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
