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