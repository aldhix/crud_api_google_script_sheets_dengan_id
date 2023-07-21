#  CRUD Rest API Google Script & Sheets dengan Kolom ID
CRUD  Rest API dengan Google Script menyimpan ke Google Sheets.

Contoh discript ini menggunakan 3 colom google sheets yaitu ID, Nama, Kelas. Direkomendasikan membuat google script tidak menggunakan akun Distrik.

## URL

### Mendapatkan semua data (GET):
GET request ke `https://script.google.com/macros/s/ABCDE/exec?action=get`

### Menambahkan data baru (POST):
POST request ke `https://script.google.com/macros/s/ABCDE/exec?action=add` 

dengan body JSON:
```
{
  "nama": "John Doe",
  "kelas": "XII"
}
```


### Memperbarui data (POST):
POST request ke `https://script.google.com/macros/s/ABCDE/exec?action=update&id=ID-YANG-DICARI`

dengan body JSON:
```
{
  "nama": "John Updated",
  "kelas": "XII"
}
```

### Menghapus data (POST):
POST request ke `https://script.google.com/macros/s/ABCDE/exec?action=delete&id=ID-YANG-DICARI`
