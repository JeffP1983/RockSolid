import CoverPage from './sections/CoverPage';
import AboutUs from './sections/AboutUs';
import PDFUpload from './sections/PDFUpload';
import PricingQuote from './sections/PricingQuote';
import Timeline from './sections/Timeline';
import TermsConditions from './sections/TermsConditions';
import SignaturePage from './sections/SignaturePage';

const SectionEditor = ({ section }) => {
  const renderSection = () => {
    switch (section?.type) {
      case 'cover':
        return <CoverPage />;
      case 'about':
        return <AboutUs />;
      case 'pdf-upload':
        return <PDFUpload sectionId={section.id} />;
      case 'pricing':
        return <PricingQuote />;
      case 'timeline':
        return <Timeline />;
      case 'terms':
        return <TermsConditions />;
      case 'signature':
        return <SignaturePage />;
      default:
        return (
          <div className="text-center text-gray-500 py-12">
            Select a section to edit
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{section?.name}</h2>
      </div>
      {renderSection()}
    </div>
  );
};

export default SectionEditor;
