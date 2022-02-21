import { dataSet } from './DataSet'
import React from 'react'
import MaterialTable from 'material-table';
const Table = () => {
    let cols = [...new Set(dataSet.map((item) => (item.name)))]
    //console.log(cols)
    const newData = []
    dataSet.forEach((d) => {
        const index = newData.findIndex((x) => x.name === d.job)
        if (index === -1) {
            const obj = {};
            cols.forEach((ele) => { if (ele === d.name) { obj[ele] = d.target; } else { obj[ele] = 0 } })

            obj.name = d.job
            obj.total = 0
            newData.push(obj)
        } else {
            const o = newData[index];
            if (o.hasOwnProperty(d.name)) {
                //console.log(d.name, o[d.name], d.target)
                o[d.name] = o[d.name] + d.target
            } else {
                o[d.name] = d.target
            }
        }
    })
    /* console.log(newData); */
    var result = newData.reduce((acc, n) => {
        for (var keys in n) {
            if (acc.hasOwnProperty(keys)) acc[keys] = ((isNaN(acc[keys])) ? 'Total' : (acc[keys] + n[keys]));
            else acc[keys] = n[keys];
        }
        return acc;
    }, {})
    let newDataSet = [...newData, result]
    let totalData = newDataSet;
    for (let i = 0; i < totalData.length; i++) {
        // totalData[i].total = newDataSet[i].total + 5.
        const x = Object.values(totalData[i])
        let total = 0;
        x.forEach((a) => {
            if (typeof a === 'number') {
                total += a;
            }
        })
        if (i === (totalData.length) - 1) { newDataSet[i].total = " "; }
        else {
            newDataSet[i].Total = total;
        }
    }
    let newCol = ['name', ...cols, 'Total']
    //console.log(newCol)
    let columns = newCol.map((item) => {
        return { key: item, title: ((item === 'name') ? 'Job/Name' : item), field: item, }
    })


    return (<div style={{ height: 400, width: '100%' }}>
        <MaterialTable title=''
            columns={columns}
            data={newDataSet}
            options={{
                search: false,
                paging: false,
                headerStyle: { backgroundColor: 'grey', fontWeight: 800, fontSize: 22 },
            }}
        />
    </div>)
}
export default Table;
