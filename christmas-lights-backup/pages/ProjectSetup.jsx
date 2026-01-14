import { useState } from 'react';
import useProposalStore from '../store/proposalStore';

const ProjectSetup = ({ onComplete }) => {
  const { projectInfo, updateProjectInfo, logo, setLogo, heroImage, setHeroImage } =
    useProposalStore();

  const [formData, setFormData] = useState(projectInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (type === 'logo') {
        setLogo(base64);
      } else if (type === 'hero') {
        setHeroImage(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.clientName || !formData.proposalNumber) {
      alert('Please fill in required fields');
      return;
    }

    if (!logo) {
      alert('Please upload your company logo');
      return;
    }

    if (!heroImage) {
      alert('Please upload a hero image');
      return;
    }

    // Save to store
    updateProjectInfo(formData);

    // Move to next screen
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-blue-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-navy mb-2">
              DFW Christmas Lights
            </h1>
            <p className="text-gray-600">Proposal Generator</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'logo')}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-navy file:text-white
                  hover:file:bg-blue-800"
              />
              {logo && (
                <div className="mt-2">
                  <img
                    src={logo}
                    alt="Logo preview"
                    className="h-20 object-contain"
                  />
                </div>
              )}
            </div>

            {/* Hero Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image (Cover Page) *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'hero')}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-navy file:text-white
                  hover:file:bg-blue-800"
              />
              {heroImage && (
                <div className="mt-2">
                  <img
                    src={heroImage}
                    alt="Hero preview"
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
                placeholder="John Smith"
              />
            </div>

            {/* Proposal Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proposal Number *
              </label>
              <input
                type="text"
                name="proposalNumber"
                value={formData.proposalNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
                placeholder="DFWCL-2024-001"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
                placeholder="123 Main St, Dallas, TX 75001"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
                placeholder="client@example.com"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-navy text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-800 transition-colors"
            >
              Continue to Proposal Builder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectSetup;
