# DFW Christmas Lights Proposal Generator

A professional proposal generator for DFW Christmas Lights LLC. Create stunning, customized proposals with hero images, pricing calculations, and PDF merging capabilities.

## Features

✅ **Cover Page with Hero Image** - Upload beautiful Christmas lights photos that appear in the final PDF
✅ **Logo Integration** - Add your company logo to the cover page
✅ **Pricing Calculator** - Automatic calculations with $7/ft default pricing
✅ **PDF Upload** - Upload Strandr mockups and INCHR measurement reports
✅ **Drag-and-Drop Sections** - Reorder sections to customize your proposal flow
✅ **Professional Sections** - About Us, Timeline, Terms & Conditions, Signature Page
✅ **Auto-Save** - Automatic saving every 30 seconds to localStorage
✅ **PDF Export** - One-click export to professional PDF with page numbers

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit `http://localhost:5173` to use the application.

## Build

```bash
npm run build
```

## Usage

### 1. Project Setup
- Upload your company logo
- Upload a hero image (high-resolution Christmas lights photo)
- Enter client information (name, proposal number, date, address, etc.)

### 2. Build Your Proposal
- Navigate through sections using the sidebar
- Customize each section:
  - **Cover Page**: Preview your hero image and logo
  - **About Us**: Pre-filled with company information
  - **Strandr Mockups**: Upload design visualization PDFs
  - **INCHR Measurements**: Upload measurement report PDFs
  - **Pricing Quote**: Enter linear footage and additional items
  - **Timeline**: Add project milestones with dates
  - **Terms & Conditions**: Review and customize terms
  - **Signature Page**: Configure signature details

### 3. Export PDF
- Click "Export PDF" in the header
- Professional PDF downloads with all sections merged
- Uploaded PDFs maintain original quality
- Page numbers automatically added

## Key Features

### Hero Image in PDF
The hero image uses proper image embedding (not CSS backgrounds) to ensure it appears correctly in the final PDF. This is a critical feature for professional-looking proposals.

### Pricing Calculator
- Default price per foot: **$7**
- Automatic subtotal calculation
- Tax calculation (8.25% Texas default)
- Additional items support
- Formatted currency display

### PDF Merging
- Seamlessly merges uploaded Strandr and INCHR PDFs
- Maintains original PDF quality
- No degradation during merge process

### Auto-Save
- Saves to browser localStorage every 30 seconds
- Data persists between sessions
- No data loss on browser refresh

## Technologies Used

- **Vite** - Fast build tool
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **pdf-lib** - PDF generation and manipulation
- **@dnd-kit** - Drag-and-drop reordering

## Browser Support

- Chrome (recommended)
- Safari
- Edge
- Works on desktop and iPad

## Tips for Best Results

1. **Hero Images**: Use high-resolution photos (at least 1920x1080) for best PDF quality
2. **Logos**: Upload PNG with transparent background for professional look
3. **PDFs**: Upload Strandr and INCHR files before generating final proposal
4. **Pricing**: Review calculations before exporting
5. **Test**: Preview each section before final export

## Support

For issues or questions, contact DFW Christmas Lights LLC.

## License

Proprietary - DFW Christmas Lights LLC

---

Built with ❤️ for closing $10,000+ holiday lighting contracts!
