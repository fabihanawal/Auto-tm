import jsPDF from 'jspdf';

export interface KhatianRecord {
  khatianNo: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  mouza: string;
  jlNo: string;
  surveyType: string;
  owners: Array<{
    name: string;
    fatherOrHusband: string;
    address: string;
    share: string;
  }>;
  plots: Array<{
    dagNo: string;
    landType: string;
    plotArea: string;
    khatianShareArea: string;
  }>;
  totalArea: string;
  remarks: string;
  qrId: string;
  issueDate: string;
}

// Convert English numbers to Bengali numerals
export const toBengaliNum = (num: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((char) => {
      const parsed = parseInt(char, 10);
      return !isNaN(parsed) ? banglaDigits[parsed] : char;
    })
    .join('');
};

// Generate realistic mock details for a Khatian number
export const createMockKhatianRecord = (
  khatianNo: string,
  divisionName: string,
  districtName: string,
  upazilaName: string,
  unionName: string,
  mouzaName: string,
  jlNo: string,
  surveyType: string
): KhatianRecord => {
  const num = parseInt(khatianNo, 10) || 1;
  const sampleOwners = [
    { name: 'মোঃ রফিকুল ইসলাম', fatherOrHusband: 'মৃত আঃ রহমান', address: mouzaName, share: '০.৫০০০' },
    { name: 'মোছাঃ নাসিমা বেগম', fatherOrHusband: 'মোঃ রফিকুল ইসলাম', address: mouzaName, share: '০.২৫০০' },
    { name: 'মোঃ তারেক হাসান', fatherOrHusband: 'মোঃ রফিকুল ইসলাম', address: mouzaName, share: '০.২৫০০' },
  ];

  const sampleLandTypes = ['নাল', 'বাস্তু / বাড়ি', 'ধানি জমি', 'ভিটি', 'বাগান', 'পুকুর'];
  const baseDag = (num * 3 + 120) % 900 + 10;

  return {
    khatianNo,
    division: divisionName,
    district: districtName,
    upazila: upazilaName,
    union: unionName,
    mouza: mouzaName,
    jlNo,
    surveyType,
    owners: sampleOwners.slice(0, (num % 3) + 1),
    plots: [
      {
        dagNo: toBengaliNum(baseDag),
        landType: sampleLandTypes[num % sampleLandTypes.length],
        plotArea: toBengaliNum(((num % 5) * 0.15 + 0.35).toFixed(2)) + ' একর',
        khatianShareArea: toBengaliNum(((num % 5) * 0.12 + 0.2).toFixed(2)) + ' একর (' + toBengaliNum(((num % 5) * 12 + 20)) + ' শতক)',
      },
      {
        dagNo: toBengaliNum(baseDag + 1),
        landType: sampleLandTypes[(num + 1) % sampleLandTypes.length],
        plotArea: toBengaliNum(((num % 3) * 0.10 + 0.18).toFixed(2)) + ' একর',
        khatianShareArea: toBengaliNum(((num % 3) * 0.10 + 0.18).toFixed(2)) + ' একর (' + toBengaliNum(((num % 3) * 10 + 18)) + ' শতক)',
      },
    ],
    totalArea: toBengaliNum(((num % 5) * 12 + 20) + ((num % 3) * 10 + 18)) + ' শতক',
    remarks: 'সরকারি নিয়ম অনুযায়ী খাজনা দাখিলা হাল সন পর্যন্ত পরিশোধিত। দখলদার সঠিক আছে।',
    qrId: 'EP-' + Math.floor(10000000 + Math.random() * 90000000),
    issueDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
  };
};

/**
 * Generate a PDF for a Khatian record using jsPDF
 */
export const generateKhatianPDF = async (record: KhatianRecord): Promise<Blob> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Outer border styling
  doc.setDrawColor(22, 101, 52); // Dark Emerald Green
  doc.setLineWidth(1.2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setDrawColor(187, 247, 208); // Light emerald inner border
  doc.setLineWidth(0.4);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Background watermark
  doc.setFontSize(38);
  doc.setTextColor(230, 245, 235);
  doc.text('eporchia.gov.bd', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });

  // Top Header Banner
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(14, 14, pageWidth - 28, 30, 2, 2, 'F');

  doc.setTextColor(22, 101, 52);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('GOVERNMENT OF THE PEOPLE\'S REPUBLIC OF BANGLADESH', pageWidth / 2, 22, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Ministry of Land | Land Record & Survey Department (eporchia.gov.bd)', pageWidth / 2, 28, { align: 'center' });

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`ONLINE RECORD OF RIGHTS (KHATIAN / PORCHIA - ${record.surveyType})`, pageWidth / 2, 37, { align: 'center' });

  // Metadata Grid Box
  let y = 50;
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.rect(14, y, pageWidth - 28, 26, 'FD');

  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'bold');

  // Left Column
  doc.text('Division (Bibhag):', 18, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(record.division, 55, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('District (Zilla):', 18, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(record.district, 55, y + 13);

  doc.setFont('helvetica', 'bold');
  doc.text('Upazila / Circle:', 18, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.text(record.upazila, 55, y + 20);

  // Right Column
  doc.setFont('helvetica', 'bold');
  doc.text('Mouza Name:', 105, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`${record.mouza} (J.L. ${record.jlNo})`, 140, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Survey Type:', 105, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(record.surveyType, 140, y + 13);

  doc.setFont('helvetica', 'bold');
  doc.text('Khatian Number:', 105, y + 20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38); // Red emphasis
  doc.setFontSize(12);
  doc.text(record.khatianNo, 140, y + 20);

  // Section 1: Owners Table
  y += 33;
  doc.setFillColor(22, 101, 52);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('1. PARTICULARS OF RECORDED OWNERS (MALIK / KHATIAN-HOLDERS)', 18, y + 5);

  y += 7;
  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 6, 'FD');
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8);
  doc.text('SL', 17, y + 4.5);
  doc.text('Owner Name & Guardian', 30, y + 4.5);
  doc.text('Address', 120, y + 4.5);
  doc.text('Share (Hissa)', 165, y + 4.5);

  y += 6;
  doc.setFont('helvetica', 'normal');
  record.owners.forEach((owner, idx) => {
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y, pageWidth - 14, y);
    doc.text(`${idx + 1}`, 17, y + 5);
    doc.text(`${owner.name} (${owner.fatherOrHusband})`, 30, y + 5);
    doc.text(owner.address, 120, y + 5);
    doc.text(owner.share, 165, y + 5);
    y += 7;
  });

  // Section 2: Land Plot Details (Dag No)
  y += 6;
  doc.setFillColor(22, 101, 52);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('2. PLOT DETAILS & LAND CLASSIFICATION (DAG NO & SHRENI)', 18, y + 5);

  y += 7;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 6, 'FD');
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8);
  doc.text('Plot No (Dag)', 18, y + 4.5);
  doc.text('Land Class (Shreni)', 60, y + 4.5);
  doc.text('Gross Plot Area', 105, y + 4.5);
  doc.text('Khatian Share Area', 150, y + 4.5);

  y += 6;
  doc.setFont('helvetica', 'normal');
  record.plots.forEach((plot) => {
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y, pageWidth - 14, y);
    doc.text(plot.dagNo, 18, y + 5);
    doc.text(plot.landType, 60, y + 5);
    doc.text(plot.plotArea, 105, y + 5);
    doc.text(plot.khatianShareArea, 150, y + 5);
    y += 7;
  });

  // Total Summary Row
  y += 2;
  doc.setFillColor(240, 253, 244);
  doc.rect(14, y, pageWidth - 28, 8, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(9);
  doc.text('Total Khatian Land Area:', 18, y + 5.5);
  doc.text(record.totalArea, 80, y + 5.5);

  // Verification & Remarks Box
  y += 14;
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, y, pageWidth - 28, 24);

  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL VERIFICATION & SYSTEM CERTIFICATION:', 18, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(`1. This is a computer generated copy extracted from Bangladesh e-Porchia Online Portal.`, 18, y + 10);
  doc.text(`2. Reference Tracking UID: ${record.qrId} | Generation Timestamp: ${new Date().toISOString()}`, 18, y + 14);
  doc.text(`3. To verify authenticity, visit https://eporchia.gov.bd and input Khatian ${record.khatianNo}.`, 18, y + 18);

  // Digital Seal Badge representation
  doc.setDrawColor(22, 101, 52);
  doc.circle(pageWidth - 36, y + 12, 9);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('LAND MINISTRY', pageWidth - 36, y + 10, { align: 'center' });
  doc.text('GOVT OF BD', pageWidth - 36, y + 13, { align: 'center' });
  doc.text('VERIFIED', pageWidth - 36, y + 16, { align: 'center' });

  // Footer notes
  const footerY = pageHeight - 16;
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Document auto-fetched via eporchia.gov.bd Automated Downloader Engine. Confidential & Secured.', pageWidth / 2, footerY, { align: 'center' });

  return doc.output('blob');
};

/**
 * Triggers direct browser download of the generated PDF
 */
export const downloadKhatianFile = async (
  record: KhatianRecord,
  filename?: string
): Promise<void> => {
  const blob = await generateKhatianPDF(record);
  const targetName =
    filename ||
    `${record.district}_${record.upazila}_${record.mouza}_Khatian_${record.khatianNo}.pdf`
      .replace(/[\s/]/g, '_');

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = targetName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
