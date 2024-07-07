import React from "react";
import * as XLSX from "xlsx";
interface ExportExcelProps {
  data: Array<Record<string, any>>;
  nameFile?: string;
  className?: string;
  title?: string;
}

const ExportExcel: React.FC<ExportExcelProps> = ({
  data,
  nameFile,
  className,
  title = "Export Excel",
}) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    // const wscols = [
    //   { wch: 10 },
    //   { wch: 20 },
    //   { wch: 20 },
    //   { wch: 25 },
    //   { wch: 30 },
    //   { wch: 10 },
    //   { wch: 20 },
    //   { wch: 25 },
    // ];
    // ws["!cols"] = wscols;
    // Tạo một workbook mới và thêm worksheet vào
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Xuất file excel
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    // Tạo URL cho file và mở hộp thoại lưu file
    const url = window.URL.createObjectURL(dataBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nameFile}.xlsx`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return (
    <button onClick={exportToExcel} type="button" className={`${className}`}>
      {title}
    </button>
  );
};

export default ExportExcel;
