const AboutUs = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          About DFW Christmas Lights
        </h3>

        <div className="prose max-w-none">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-xl font-bold text-navy mb-4">
              Professional Holiday Lighting Services
            </h4>

            <p className="text-gray-700 mb-4">
              DFW Christmas Lights LLC specializes in professional holiday lighting
              design, installation, and maintenance throughout the Dallas-Fort Worth
              metroplex. With years of experience and a commitment to excellence, we
              transform homes and businesses into spectacular holiday displays.
            </p>

            <h5 className="text-lg font-semibold text-navy mb-3">
              Why Choose DFW Christmas Lights?
            </h5>

            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Professional Installation:</strong> Our experienced team
                  handles everything from design to installation and removal
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Commercial-Grade Lights:</strong> We use only the highest
                  quality LED lights and materials
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Custom Designs:</strong> Every installation is customized to
                  your property's unique features
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Safety First:</strong> Fully insured with proper safety
                  equipment and training
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Hassle-Free:</strong> We handle installation, maintenance,
                  and post-season removal
                </span>
              </li>
            </ul>

            <h5 className="text-lg font-semibold text-navy mb-3">
              Our Process
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-gold mb-2">1</div>
                <div className="text-sm font-semibold text-gray-700">
                  Consultation
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Free on-site assessment
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-gold mb-2">2</div>
                <div className="text-sm font-semibold text-gray-700">
                  Design
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Custom lighting plan
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-gold mb-2">3</div>
                <div className="text-sm font-semibold text-gray-700">
                  Installation
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Professional setup
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-gold mb-2">4</div>
                <div className="text-sm font-semibold text-gray-700">
                  Removal
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Post-season takedown
                </div>
              </div>
            </div>

            <p className="text-gray-700">
              Let us bring the magic of the holiday season to your property with a
              stunning, professional lighting display that will be the envy of the
              neighborhood!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This content will appear in the final proposal. The
          text is pre-filled with default content that highlights your services.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
