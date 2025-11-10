import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Generate Cover Page PDF with hero image
 * CRITICAL: Uses actual image embedding, NOT CSS background
 */
export const generateCoverPage = async (projectInfo, logo, heroImage) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size: 8.5" x 11"

  const { width, height } = page.getSize();

  try {
    // Embed hero image
    let heroImg;
    if (heroImage) {
      const imageType = heroImage.startsWith('data:image/png')
        ? 'png'
        : heroImage.startsWith('data:image/jpeg') || heroImage.startsWith('data:image/jpg')
        ? 'jpg'
        : null;

      if (imageType === 'png') {
        heroImg = await pdfDoc.embedPng(heroImage);
      } else if (imageType === 'jpg') {
        heroImg = await pdfDoc.embedJpg(heroImage);
      }

      if (heroImg) {
        // Draw hero image to fill the entire page
        const imgDims = heroImg.scale(1);
        const aspectRatio = imgDims.width / imgDims.height;
        const pageAspectRatio = width / height;

        let drawWidth, drawHeight, xOffset, yOffset;

        if (aspectRatio > pageAspectRatio) {
          // Image is wider than page
          drawHeight = height;
          drawWidth = height * aspectRatio;
          xOffset = (width - drawWidth) / 2;
          yOffset = 0;
        } else {
          // Image is taller than page
          drawWidth = width;
          drawHeight = width / aspectRatio;
          xOffset = 0;
          yOffset = (height - drawHeight) / 2;
        }

        page.drawImage(heroImg, {
          x: xOffset,
          y: yOffset,
          width: drawWidth,
          height: drawHeight,
        });

        // Draw dark overlay for text readability
        page.drawRectangle({
          x: 0,
          y: 0,
          width: width,
          height: height,
          color: rgb(0, 0, 0),
          opacity: 0.4,
        });
      }
    }

    // Embed and draw logo
    if (logo) {
      const logoType = logo.startsWith('data:image/png')
        ? 'png'
        : logo.startsWith('data:image/jpeg') || logo.startsWith('data:image/jpg')
        ? 'jpg'
        : null;

      let logoImg;
      if (logoType === 'png') {
        logoImg = await pdfDoc.embedPng(logo);
      } else if (logoType === 'jpg') {
        logoImg = await pdfDoc.embedJpg(logo);
      }

      if (logoImg) {
        const logoDims = logoImg.scale(0.3);
        page.drawImage(logoImg, {
          x: 40,
          y: height - 100,
          width: logoDims.width,
          height: logoDims.height,
        });
      }
    }

    // Add text content
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Title
    page.drawText('Holiday Lighting Proposal', {
      x: width / 2 - 200,
      y: height / 2 + 50,
      size: 40,
      font: fontBold,
      color: rgb(1, 1, 1),
    });

    // Client Name
    if (projectInfo.clientName) {
      page.drawText(projectInfo.clientName, {
        x: width / 2 - 100,
        y: height / 2 - 10,
        size: 24,
        font: fontBold,
        color: rgb(1, 1, 1),
      });
    }

    // Address
    if (projectInfo.address) {
      page.drawText(projectInfo.address, {
        x: width / 2 - 100,
        y: height / 2 - 40,
        size: 16,
        font: fontRegular,
        color: rgb(1, 1, 1),
      });
    }

    // Footer box
    page.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: 100,
      color: rgb(0.117, 0.227, 0.541), // Navy color
      opacity: 0.9,
    });

    // Proposal Number
    page.drawText('Proposal Number', {
      x: 40,
      y: 60,
      size: 10,
      font: fontBold,
      color: rgb(0.961, 0.620, 0.043), // Gold color
    });
    page.drawText(projectInfo.proposalNumber || 'N/A', {
      x: 40,
      y: 45,
      size: 12,
      font: fontRegular,
      color: rgb(1, 1, 1),
    });

    // Date
    page.drawText('Date', {
      x: width - 150,
      y: 60,
      size: 10,
      font: fontBold,
      color: rgb(0.961, 0.620, 0.043), // Gold color
    });
    page.drawText(projectInfo.date || 'N/A', {
      x: width - 150,
      y: 45,
      size: 12,
      font: fontRegular,
      color: rgb(1, 1, 1),
    });
  } catch (error) {
    console.error('Error generating cover page:', error);
  }

  return pdfDoc;
};

/**
 * Generate About Us page
 */
export const generateAboutUsPage = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);

  const { width, height } = page.getSize();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Title
  page.drawText('About DFW Christmas Lights', {
    x: 50,
    y: height - 60,
    size: 24,
    font: fontBold,
    color: rgb(0.117, 0.227, 0.541),
  });

  // Content
  const content = [
    'Professional Holiday Lighting Services',
    '',
    'DFW Christmas Lights LLC specializes in professional holiday lighting design,',
    'installation, and maintenance throughout the Dallas-Fort Worth metroplex.',
    '',
    'Why Choose DFW Christmas Lights?',
    '',
    '• Professional Installation - Experienced team handles everything',
    '• Commercial-Grade Lights - Highest quality LED lights',
    '• Custom Designs - Tailored to your property',
    '• Safety First - Fully insured with proper training',
    '• Hassle-Free - Installation, maintenance, and removal',
  ];

  let yPosition = height - 100;
  content.forEach((line) => {
    const isBold = line.includes('Why Choose') || line.includes('Professional Holiday');
    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: line.startsWith('•') ? 11 : isBold ? 14 : 12,
      font: isBold ? fontBold : fontRegular,
      color: rgb(0.2, 0.2, 0.2),
    });
    yPosition -= line === '' ? 10 : 20;
  });

  return pdfDoc;
};

/**
 * Generate Pricing Quote page
 */
export const generatePricingPage = async (pricingData, projectInfo) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);

  const { width, height } = page.getSize();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Title
  page.drawText('Pricing Quote', {
    x: 50,
    y: height - 60,
    size: 24,
    font: fontBold,
    color: rgb(0.117, 0.227, 0.541),
  });

  // Client info
  page.drawText(`Client: ${projectInfo.clientName}`, {
    x: 50,
    y: height - 90,
    size: 12,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });

  let yPosition = height - 130;

  // Base Pricing
  page.drawText('Base Pricing', {
    x: 50,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  yPosition -= 25;

  const basePrice =
    (pricingData.pricePerFoot || 0) * (pricingData.linearFootage || 0);

  page.drawText(
    `${pricingData.linearFootage || 0} ft × $${
      pricingData.pricePerFoot || 7
    } per ft`,
    {
      x: 70,
      y: yPosition,
      size: 11,
      font: fontRegular,
      color: rgb(0.3, 0.3, 0.3),
    }
  );

  page.drawText(`$${basePrice.toFixed(2)}`, {
    x: width - 120,
    y: yPosition,
    size: 11,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  yPosition -= 30;

  // Additional Items
  if (pricingData.additionalItems && pricingData.additionalItems.length > 0) {
    page.drawText('Additional Items', {
      x: 50,
      y: yPosition,
      size: 14,
      font: fontBold,
      color: rgb(0.2, 0.2, 0.2),
    });
    yPosition -= 25;

    pricingData.additionalItems.forEach((item) => {
      page.drawText(item.name, {
        x: 70,
        y: yPosition,
        size: 11,
        font: fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      page.drawText(`$${parseFloat(item.price).toFixed(2)}`, {
        x: width - 120,
        y: yPosition,
        size: 11,
        font: fontBold,
        color: rgb(0.2, 0.2, 0.2),
      });
      yPosition -= 20;
    });
    yPosition -= 10;
  }

  // Calculate totals
  const additionalTotal =
    pricingData.additionalItems?.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0),
      0
    ) || 0;
  const subtotal = basePrice + additionalTotal;
  const tax = subtotal * ((pricingData.taxRate || 0) / 100);
  const total = subtotal + tax;

  // Draw line
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: width - 50, y: yPosition },
    thickness: 1,
    color: rgb(0.7, 0.7, 0.7),
  });
  yPosition -= 25;

  // Subtotal
  page.drawText('Subtotal:', {
    x: 70,
    y: yPosition,
    size: 12,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });
  page.drawText(`$${subtotal.toFixed(2)}`, {
    x: width - 120,
    y: yPosition,
    size: 12,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  yPosition -= 25;

  // Tax
  page.drawText(`Tax (${pricingData.taxRate || 0}%):`, {
    x: 70,
    y: yPosition,
    size: 12,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });
  page.drawText(`$${tax.toFixed(2)}`, {
    x: width - 120,
    y: yPosition,
    size: 12,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  yPosition -= 35;

  // Total
  page.drawRectangle({
    x: 40,
    y: yPosition - 10,
    width: width - 80,
    height: 40,
    color: rgb(0.117, 0.227, 0.541),
    opacity: 0.1,
  });

  page.drawText('TOTAL:', {
    x: 70,
    y: yPosition,
    size: 16,
    font: fontBold,
    color: rgb(0.117, 0.227, 0.541),
  });
  page.drawText(`$${total.toFixed(2)}`, {
    x: width - 140,
    y: yPosition,
    size: 20,
    font: fontBold,
    color: rgb(0.117, 0.227, 0.541),
  });

  return pdfDoc;
};

/**
 * Generate Timeline page
 */
export const generateTimelinePage = async (timelineData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);

  const { width, height } = page.getSize();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Title
  page.drawText('Project Timeline', {
    x: 50,
    y: height - 60,
    size: 24,
    font: fontBold,
    color: rgb(0.117, 0.227, 0.541),
  });

  let yPosition = height - 110;

  timelineData.items.forEach((item, index) => {
    // Draw dot
    page.drawCircle({
      x: 70,
      y: yPosition + 5,
      size: 5,
      color: rgb(0.961, 0.620, 0.043),
    });

    // Draw line to next item
    if (index < timelineData.items.length - 1) {
      page.drawLine({
        start: { x: 70, y: yPosition },
        end: { x: 70, y: yPosition - 40 },
        thickness: 2,
        color: rgb(0.117, 0.227, 0.541),
      });
    }

    // Description
    page.drawText(item.description || 'Milestone', {
      x: 90,
      y: yPosition + 5,
      size: 12,
      font: fontBold,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Date
    page.drawText(item.date || 'TBD', {
      x: 90,
      y: yPosition - 10,
      size: 10,
      font: fontRegular,
      color: rgb(0.4, 0.4, 0.4),
    });

    yPosition -= 50;
  });

  return pdfDoc;
};

/**
 * Generate Terms & Conditions page
 */
export const generateTermsPage = async (termsData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);

  const { width, height } = page.getSize();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Title
  page.drawText('Terms & Conditions', {
    x: 50,
    y: height - 60,
    size: 24,
    font: fontBold,
    color: rgb(0.117, 0.227, 0.541),
  });

  // Content
  const lines = termsData.content.split('\n');
  let yPosition = height - 100;

  lines.forEach((line) => {
    if (yPosition < 50) return; // Don't overflow page

    const isBold =
      line.toUpperCase() === line && line.trim().length > 0 && line.length < 50;
    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 10,
      font: isBold ? fontBold : fontRegular,
      color: rgb(0.2, 0.2, 0.2),
      maxWidth: width - 100,
    });
    yPosition -= 14;
  });

  return pdfDoc;
};

/**
 * Generate Signature page
 */
export const generateSignaturePage = async (signatureData, projectInfo) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);

  const { width, height } = page.getSize();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Title
  page.drawText('Proposal Acceptance', {
    x: width / 2 - 100,
    y: height - 60,
    size: 24,
    font: fontBold,
    color: rgb(0.117, 0.227, 0.541),
  });

  // Intro text
  const introText =
    'By signing below, I accept the terms and conditions outlined in this proposal';
  page.drawText(introText, {
    x: 50,
    y: height - 110,
    size: 11,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
    maxWidth: width - 100,
  });

  const yStart = height - 200;

  // Client Signature
  page.drawText('Client Signature', {
    x: 60,
    y: yStart,
    size: 12,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawLine({
    start: { x: 60, y: yStart - 40 },
    end: { x: 280, y: yStart - 40 },
    thickness: 1,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawText('Print Name:', {
    x: 60,
    y: yStart - 60,
    size: 10,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(signatureData.clientName || projectInfo.clientName || '', {
    x: 60,
    y: yStart - 75,
    size: 11,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Date:', {
    x: 60,
    y: yStart - 95,
    size: 10,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(signatureData.date || '', {
    x: 60,
    y: yStart - 110,
    size: 11,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Company Representative
  page.drawText('Company Representative', {
    x: 340,
    y: yStart,
    size: 12,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawLine({
    start: { x: 340, y: yStart - 40 },
    end: { x: 560, y: yStart - 40 },
    thickness: 1,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawText('Print Name:', {
    x: 340,
    y: yStart - 60,
    size: 10,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText('DFW Christmas Lights LLC', {
    x: 340,
    y: yStart - 75,
    size: 11,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Date:', {
    x: 340,
    y: yStart - 95,
    size: 10,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(signatureData.date || '', {
    x: 340,
    y: yStart - 110,
    size: 11,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Footer note
  page.drawRectangle({
    x: 40,
    y: 60,
    width: width - 80,
    height: 50,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText(
    'This proposal is valid for 30 days. A 50% deposit is required to secure your installation date.',
    {
      x: 50,
      y: 80,
      size: 9,
      font: fontRegular,
      color: rgb(0.3, 0.3, 0.3),
      maxWidth: width - 100,
    }
  );

  return pdfDoc;
};

/**
 * Merge all PDFs into final proposal
 */
export const mergeProposal = async (proposalData) => {
  const finalPdf = await PDFDocument.create();

  try {
    // 1. Add Cover Page
    if (proposalData.heroImage) {
      const coverPdf = await generateCoverPage(
        proposalData.projectInfo,
        proposalData.logo,
        proposalData.heroImage
      );
      const [coverPage] = await finalPdf.copyPages(coverPdf, [0]);
      finalPdf.addPage(coverPage);
    }

    // 2. Add About Us
    const aboutPdf = await generateAboutUsPage();
    const [aboutPage] = await finalPdf.copyPages(aboutPdf, [0]);
    finalPdf.addPage(aboutPage);

    // 3. Add Strandr PDFs
    if (proposalData.sectionData.strandr?.pdfs) {
      for (const pdf of proposalData.sectionData.strandr.pdfs) {
        const pdfBytes = await fetch(pdf.data).then((res) => res.arrayBuffer());
        const uploadedPdf = await PDFDocument.load(pdfBytes);
        const pages = await finalPdf.copyPages(
          uploadedPdf,
          uploadedPdf.getPageIndices()
        );
        pages.forEach((page) => finalPdf.addPage(page));
      }
    }

    // 4. Add INCHR PDFs
    if (proposalData.sectionData.inchr?.pdfs) {
      for (const pdf of proposalData.sectionData.inchr.pdfs) {
        const pdfBytes = await fetch(pdf.data).then((res) => res.arrayBuffer());
        const uploadedPdf = await PDFDocument.load(pdfBytes);
        const pages = await finalPdf.copyPages(
          uploadedPdf,
          uploadedPdf.getPageIndices()
        );
        pages.forEach((page) => finalPdf.addPage(page));
      }
    }

    // 5. Add Pricing
    const pricingPdf = await generatePricingPage(
      proposalData.sectionData.pricing,
      proposalData.projectInfo
    );
    const [pricingPage] = await finalPdf.copyPages(pricingPdf, [0]);
    finalPdf.addPage(pricingPage);

    // 6. Add Timeline
    const timelinePdf = await generateTimelinePage(proposalData.sectionData.timeline);
    const [timelinePage] = await finalPdf.copyPages(timelinePdf, [0]);
    finalPdf.addPage(timelinePage);

    // 7. Add Terms
    const termsPdf = await generateTermsPage(proposalData.sectionData.terms);
    const [termsPage] = await finalPdf.copyPages(termsPdf, [0]);
    finalPdf.addPage(termsPage);

    // 8. Add Signature
    const signaturePdf = await generateSignaturePage(
      proposalData.sectionData.signature,
      proposalData.projectInfo
    );
    const [signaturePage] = await finalPdf.copyPages(signaturePdf, [0]);
    finalPdf.addPage(signaturePage);

    // Add page numbers
    const pages = finalPdf.getPages();
    const font = await finalPdf.embedFont(StandardFonts.Helvetica);

    pages.forEach((page, index) => {
      if (index > 0) {
        // Skip page number on cover
        const { height } = page.getSize();
        page.drawText(`${index + 1}`, {
          x: 300,
          y: 20,
          size: 10,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
        });
      }
    });

    return finalPdf;
  } catch (error) {
    console.error('Error merging proposal:', error);
    throw error;
  }
};

export const downloadProposal = async (proposalData) => {
  try {
    const finalPdf = await mergeProposal(proposalData);
    const pdfBytes = await finalPdf.save();

    // Create download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Proposal_${proposalData.projectInfo.proposalNumber || 'Draft'}.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Error downloading proposal:', error);
    return false;
  }
};
