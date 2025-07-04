"use client";

import {
  Building,
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
import { PreferencesSheet } from '@/components/dashboard/preferences-sheet';
import { usePreferences } from '@/contexts/preferences-context';
import { useClient } from '@/contexts/client-context';
import { useFilters } from '@/contexts/filter-context';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';


export default function DashboardHeader() {
  const { language } = usePreferences();
  const { clients, activeClient, switchClient } = useClient();
  const { Logo, name: clientName, recentSales, products, regions } = activeClient;
  const { selectedRegion, setSelectedRegion, selectedProduct, setSelectedProduct } = useFilters();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${clientName} Dashboard`,
        text: `Check out this analysis for ${clientName}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
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
        pdf.save(`${activeClient.id}-summary.pdf`);
      });
    }
  };

  const handleExportXLS = () => {
    const dataToExport = recentSales.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Recent Sales');
    XLSX.writeFile(workbook, `${activeClient.id}-summary.xlsx`);
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
        saveAs(blob, `${activeClient.id}-summary.docx`);
    });
};
  
  const filterLabels = {
    en: { period: 'Period', region: 'Region', product: 'Product', export: 'Export', client: 'Client' },
    id: { period: 'Periode', region: 'Wilayah', product: 'Produk', export: 'Ekspor', client: 'Klien' },
  };

  const exportLabels = {
    en: { pdf: 'Export as PDF', xls: 'Export as XLS', docx: 'Export as DOCX' },
    id: { pdf: 'Ekspor sebagai PDF', xls: 'Ekspor sebagai XLS', docx: 'Ekspor sebagai DOCX' },
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Logo className="h-8 w-auto text-primary" />
        <h1 className="text-xl font-semibold">{clientName}</h1>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Building className="mr-2 h-4 w-4" />
                {filterLabels[language].client}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {clients.map((client) => (
                <DropdownMenuItem key={client.id} onClick={() => switchClient(client.id)}>
                  {client.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
               <Button variant="outline" className="min-w-[150px] justify-between">
                <span className="truncate pr-1">{selectedRegion === 'All Regions' ? filterLabels[language].region : selectedRegion}</span>
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedRegion('All Regions')}>
                {language === 'id' ? 'Semua Wilayah' : 'All Regions'}
              </DropdownMenuItem>
              {regions.map((region) => (
                <DropdownMenuItem key={region} onClick={() => setSelectedRegion(region)}>
                  {region}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[150px] justify-between">
                <span className="truncate pr-1">{selectedProduct === 'All Products' ? filterLabels[language].product : selectedProduct}</span>
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem onClick={() => setSelectedProduct('All Products')}>
                {language === 'id' ? 'Semua Produk' : 'All Products'}
              </DropdownMenuItem>
              {products.map((product) => (
                <DropdownMenuItem key={product} onClick={() => setSelectedProduct(product)}>
                  {product}
                </DropdownMenuItem>
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
