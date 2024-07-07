import * as XLSX from "xlsx";
export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
export const exportToExcel = (data: any, nameFile: string) => {
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
