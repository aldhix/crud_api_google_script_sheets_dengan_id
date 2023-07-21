// Spreadsheet ID dan Sheet Name
const SPREADSHEET_ID = "SPREADSHEET_ID";
const SHEET_NAME = "SHEET_NAME";

// Fungsi untuk menambahkan data baru
function addData(data) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var currentTime = new Date().getTime();
  var id = "ID-" + currentTime;
  data.id = id;

  sheet.appendRow([data.id, data.nama, data.kelas]);
  return { message: "Data telah ditambahkan", data: data };
}

// Fungsi untuk mendapatkan semua data
function getData() {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var result = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {
      id: row[0],
      nama: row[1],
      kelas: row[2],
    };
    result.push(obj);
  }

  return result;
}

// Fungsi untuk mengupdate data berdasarkan ID
function updateData(id, newData) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var rowToUpdate = -1;

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      rowToUpdate = i;
      break;
    }
  }

  if (rowToUpdate !== -1) {
    sheet.getRange(rowToUpdate + 1, 2).setValue(newData.nama); // update kolom nama
    sheet.getRange(rowToUpdate + 1, 3).setValue(newData.kelas); // update kolom kelas
    return { message: "Data telah diupdate", data: newData };
  } else {
    return { message: "ID tidak ditemukan", data: null };
  }
}

// Fungsi untuk menghapus data berdasarkan ID
function deleteData(id) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var rowToDelete = -1;

  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === id) {
      rowToDelete = i;
      break;
    }
  }
   
  if (rowToDelete !== -1) {
    sheet.deleteRow(rowToDelete + 1); // Perhatikan pengindeksan dimulai dari 0, dan baris pertama berisi header
    return { message: "Data telah dihapus", id: id };
  } else {
    return { message: "ID tidak ditemukan", id: null };
  }
}

// Fungsi untuk memproses request HTTP
function doGet(e) {
  var action = e.parameter.action;

  if (action === "get") {
    return ContentService.createTextOutput(JSON.stringify(getData())).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}

// Fungsi untuk memproses request HTTP
function doPost(e) {
  var action = e.parameter.action;
  var id = e.parameter.id;
  var data;

  if (!action) {
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Action tidak ditemukan", error: "Action parameter is missing" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "delete") {
    if (!id) {
      return ContentService.createTextOutput(
        JSON.stringify({ message: "ID tidak ditemukan", error: "ID parameter is missing" })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify(deleteData(id))).setMimeType(
      ContentService.MimeType.JSON
    );
  }

  if (e.postData.contents) {
    try {
      data = JSON.parse(e.postData.contents);
    } catch (error) {
      return ContentService.createTextOutput(
        JSON.stringify({ message: "Invalid JSON data", error: error })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Data tidak ditemukan", error: "No data found in the request" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "add") {
    return ContentService.createTextOutput(JSON.stringify(addData(data))).setMimeType(
      ContentService.MimeType.JSON
    );
  } else if (action === "update") {
    return ContentService.createTextOutput(JSON.stringify(updateData(id, data))).setMimeType(
      ContentService.MimeType.JSON
    );
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Action tidak dikenali", error: "Unknown action" })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
