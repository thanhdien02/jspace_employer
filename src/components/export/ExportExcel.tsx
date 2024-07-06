import React from "react";
import * as XLSX from "xlsx";

interface ExportExcelProps {
  data: Array<Record<string, any>>;
}

const ExportExcel: React.FC<ExportExcelProps> = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the buffer
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Create a link element
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "Data.xlsx"; // Default name, user will change it in the dialog

    // Append to the document and trigger click
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return <button onClick={exportToExcel}>Export to Excel</button>;
};

export default ExportExcel;
