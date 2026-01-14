import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultSections = [
  { id: 'cover', name: 'Cover Page', enabled: true, type: 'cover' },
  { id: 'about', name: 'About Us', enabled: true, type: 'about' },
  { id: 'strandr', name: 'Strandr Mockups', enabled: true, type: 'pdf-upload' },
  { id: 'inchr', name: 'INCHR Measurements', enabled: true, type: 'pdf-upload' },
  { id: 'pricing', name: 'Pricing Quote', enabled: true, type: 'pricing' },
  { id: 'timeline', name: 'Timeline', enabled: true, type: 'timeline' },
  { id: 'terms', name: 'Terms & Conditions', enabled: true, type: 'terms' },
  { id: 'signature', name: 'Signature Page', enabled: true, type: 'signature' },
];

const useProposalStore = create(
  persist(
    (set, get) => ({
      // Project Setup
      projectInfo: {
        clientName: '',
        proposalNumber: '',
        date: new Date().toISOString().split('T')[0],
        address: '',
        phone: '',
        email: '',
      },

      // Branding
      logo: null, // Base64 string
      heroImage: null, // Base64 string

      // Sections
      sections: defaultSections,

      // Section Data
      sectionData: {
        strandr: { pdfs: [] }, // Array of base64 PDFs
        inchr: { pdfs: [] }, // Array of base64 PDFs
        pricing: {
          pricePerFoot: 7, // DEFAULT $7/ft
          linearFootage: 0,
          additionalItems: [],
          taxRate: 8.25, // Texas default
        },
        timeline: {
          items: [
            { date: '', description: 'Initial Consultation' },
            { date: '', description: 'Design Approval' },
            { date: '', description: 'Installation' },
            { date: '', description: 'Final Walkthrough' },
          ],
        },
        terms: {
          content: `PAYMENT TERMS
50% deposit required to secure installation date. Remaining balance due upon completion.

WARRANTY
All installations include a 90-day warranty on workmanship. LED bulbs carry manufacturer warranty.

CANCELLATION POLICY
Cancellations made less than 7 days before scheduled installation date are subject to 25% cancellation fee.

PROPERTY ACCESS
Client agrees to provide clear access to all installation areas and ensure power outlets are available.

LIABILITY
DFW Christmas Lights LLC carries full liability insurance. Client is responsible for any pre-existing damage to property.`,
        },
        signature: {
          clientName: '',
          date: '',
        },
      },

      // Actions
      updateProjectInfo: (info) =>
        set({ projectInfo: { ...get().projectInfo, ...info } }),

      setLogo: (logo) => set({ logo }),

      setHeroImage: (heroImage) => set({ heroImage }),

      updateSections: (sections) => set({ sections }),

      updateSectionData: (sectionId, data) =>
        set({
          sectionData: {
            ...get().sectionData,
            [sectionId]: { ...get().sectionData[sectionId], ...data },
          },
        }),

      // Add uploaded PDF to section
      addPDF: (sectionId, pdfBase64) =>
        set({
          sectionData: {
            ...get().sectionData,
            [sectionId]: {
              pdfs: [...(get().sectionData[sectionId]?.pdfs || []), pdfBase64],
            },
          },
        }),

      // Remove PDF from section
      removePDF: (sectionId, index) =>
        set({
          sectionData: {
            ...get().sectionData,
            [sectionId]: {
              pdfs: get().sectionData[sectionId].pdfs.filter((_, i) => i !== index),
            },
          },
        }),

      // Reset all data
      reset: () =>
        set({
          projectInfo: {
            clientName: '',
            proposalNumber: '',
            date: new Date().toISOString().split('T')[0],
            address: '',
            phone: '',
            email: '',
          },
          logo: null,
          heroImage: null,
          sections: defaultSections,
          sectionData: {
            strandr: { pdfs: [] },
            inchr: { pdfs: [] },
            pricing: {
              pricePerFoot: 7,
              linearFootage: 0,
              additionalItems: [],
              taxRate: 8.25,
            },
            timeline: {
              items: [
                { date: '', description: 'Initial Consultation' },
                { date: '', description: 'Design Approval' },
                { date: '', description: 'Installation' },
                { date: '', description: 'Final Walkthrough' },
              ],
            },
            terms: {
              content: `PAYMENT TERMS
50% deposit required to secure installation date. Remaining balance due upon completion.

WARRANTY
All installations include a 90-day warranty on workmanship. LED bulbs carry manufacturer warranty.

CANCELLATION POLICY
Cancellations made less than 7 days before scheduled installation date are subject to 25% cancellation fee.

PROPERTY ACCESS
Client agrees to provide clear access to all installation areas and ensure power outlets are available.

LIABILITY
DFW Christmas Lights LLC carries full liability insurance. Client is responsible for any pre-existing damage to property.`,
            },
            signature: {
              clientName: '',
              date: '',
            },
          },
        }),

      // Last saved timestamp
      lastSaved: null,
      updateLastSaved: () => set({ lastSaved: Date.now() }),
    }),
    {
      name: 'proposal-storage',
      version: 1,
    }
  )
);

export default useProposalStore;
