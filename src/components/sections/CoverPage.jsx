import useProposalStore from '../../store/proposalStore';

const CoverPage = () => {
  const { projectInfo, logo, heroImage } = useProposalStore();

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Cover Page Preview
        </h3>

        {/* Cover Page Preview - This mimics what will be in the PDF */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden aspect-[8.5/11]">
          {/* Hero Image - MUST use img tag with position absolute, NOT CSS background */}
          {heroImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          )}

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Logo at top */}
            {logo && (
              <div className="p-8">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="h-16 object-contain bg-white rounded p-2"
                />
              </div>
            )}

            {/* Title section - centered */}
            <div className="flex-grow flex items-center justify-center px-8">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                  Holiday Lighting Proposal
                </h1>
                <div className="text-2xl font-semibold mb-2">
                  {projectInfo.clientName || 'Client Name'}
                </div>
                <div className="text-xl">
                  {projectInfo.address || 'Property Address'}
                </div>
              </div>
            </div>

            {/* Footer info */}
            <div className="p-8 bg-navy bg-opacity-90">
              <div className="grid grid-cols-2 gap-4 text-white text-sm">
                <div>
                  <div className="font-semibold text-gold">Proposal Number</div>
                  <div>{projectInfo.proposalNumber || 'N/A'}</div>
                </div>
                <div>
                  <div className="font-semibold text-gold">Date</div>
                  <div>{projectInfo.date || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> The hero image will appear in the final PDF. Make sure
          it's high resolution for best results.
        </p>
      </div>
    </div>
  );
};

export default CoverPage;
