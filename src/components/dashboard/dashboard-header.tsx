"use client";

import {
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  Share,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Logo } from '@/components/icons';
import { PreferencesSheet } from '@/components/dashboard/preferences-sheet';
import { products, recentSales, regions } from '@/lib/data';
import { usePreferences } from '@/contexts/preferences-context';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';


export default function DashboardHeader() {
  const { language } = usePreferences();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Kraft Heinz MarketSight Dashboard',
        text: 'Check out this analysis of the Kraft Heinz market data!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleExportPDF = () => {
    const dashboardElement = document.getElementById('dashboard-main-content');
    if (dashboardElement) {
      html2canvas(dashboardElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('dashboard-summary.pdf');
      });
    }
  };

  const handleExportXLS = () => {
    const dataToExport = recentSales.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Recent Sales');
    XLSX.writeFile(workbook, 'dashboard-summary.xlsx');
  };

  const handleExportDOCX = () => {
    const header = new TableRow({
        children: [
            new TableCell({ children: [new Paragraph({ text: "Product", bold: true })], width: { size: 35, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ text: "Vendor", bold: true })], width: { size: 25, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ text: "Region", bold: true })], width: { size: 25, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ text: "Amount (USD)", bold: true })], width: { size: 15, type: WidthType.PERCENTAGE } }),
        ],
    });

    const dataRows = recentSales.map(sale => new TableRow({
        children: [
            new TableCell({ children: [new Paragraph(sale.product)] }),
            new TableCell({ children: [new Paragraph(sale.vendor)] }),
            new TableCell({ children: [new Paragraph(sale.region)] }),
            new TableCell({ children: [new Paragraph(sale.amount.toFixed(2))] }),
        ]
    }));

    const table = new Table({
        rows: [header, ...dataRows],
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
    });

    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({ text: "Recent Sales Report", heading: HeadingLevel.HEADING_1 }),
                new Paragraph(" "),
                table,
            ],
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "dashboard-summary.docx");
    });
};
  
  const filterLabels = {
    en: { period: 'Period', region: 'Region', product: 'Product', export: 'Export' },
    id: { period: 'Periode', region: 'Wilayah', product: 'Produk', export: 'Ekspor' },
  };

  const exportLabels = {
    en: { pdf: 'Export as PDF', xls: 'Export as XLS', docx: 'Export as DOCX' },
    id: { pdf: 'Ekspor sebagai PDF', xls: 'Ekspor sebagai XLS', docx: 'Ekspor sebagai DOCX' },
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-semibold">Kraft Heinz MarketSight</h1>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterLabels[language].period}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Calendar mode="range" numberOfMonths={2} />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filterLabels[language].region}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {regions.map((region) => (
                <DropdownMenuItem key={region}>{region}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filterLabels[language].product}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {products.map((product) => (
                <DropdownMenuItem key={product}>{product}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label={filterLabels[language].export}>
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportPDF}>{exportLabels[language].pdf}</DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportXLS}>{exportLabels[language].xls}</DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportDOCX}>{exportLabels[language].docx}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <PreferencesSheet>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </PreferencesSheet>
        </div>
      </div>
    </header>
  );
}
