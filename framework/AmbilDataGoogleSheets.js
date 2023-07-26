class AmbilData {
    constructor(sheetId, nameRows){
        this.result;

        setInterval(()=>{
            this.GetData(sheetId.toString(), nameRows.toString())

        },500)

    }

    GetData(id, nama){
        const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq=SELECT ${nama}`
        fetch(url)
        .then(res => res.text())
        .then(result => {
            const json = JSON.parse(result.substr(47).slice(0, -2));
            const rows = json.table.rows;
            const data = [];

            rows.forEach((e, i) => {
                const dataObject = {
                    value: e.c[0].v,
                    rows: (i+1),
                }
                data.push(dataObject)
            });

            this.result = data;
        })
        .catch(err =>{
            console.error(err)
        })
    }
}

class EditValues {
    constructor(column, row, newValue) {
      this.edit(column, row, newValue);
    }
  
    edit(column, row, value) {
      // Convert column letter to column index (A=1, B=2, etc.)
      var columnIndex = column.toUpperCase().charCodeAt(0) - 64;
  
      // Ganti URL berikut dengan URL aplikasi web yang Anda dapatkan setelah deploy
      var url = "https://script.google.com/macros/s/AKfycbxx-yYbDTGQ38uztXZr8Gcy1cY_TPpCz1y7yUSHYUqlT2O-Xv8RGcCzRj0a5LAHr_2o/exec";
  
      // Buat objek data untuk dikirimkan sebagai permintaan POST
      var data = {
        column: columnIndex,
        row: row,
        newValue: value
      };
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Jangan gunakan 'no-cors' mode karena Anda ingin mendapatkan respons dari server
        // Ganti ke 'cors' mode agar dapat mengakses respons dari server.
        mode: 'no-cors', // Ganti 'no-cors' menjadi 'cors'
        body: JSON.stringify(data)
      })
      .then(response => {
        console.log("Cell value updated!");
        console.log(response);
      })
      .catch(error => {
        console.error("Error updating cell value:", error);
      });
    }
  }
  

  
