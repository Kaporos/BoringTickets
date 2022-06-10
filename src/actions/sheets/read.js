/* This file allows user to import all data from a sheet file*/

import { read, writeFileXLSX } from "xlsx";
import Swal from "sweetalert2";

function arrayOfObjectsToTable(rows) {
    let html = '<table>';
    html += '<tr>';
    for( let j in rows[0] ) {
        html += '<th>' + j + '</th>';
    }
    html += '</tr>';
    for( let i = 0; i < rows.length; i++) {
        html += '<tr>';
        for( let j in rows[i] ) {
            html += '<td>' + rows[i][j] + '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    return html
}

export async function ReadFromSheet(data) {
    let workbook = read(data)
    window.workbook = workbook
    let sheet = workbook.Sheets[workbook.SheetNames[0]]
    if (workbook.SheetNames.length > 1) {
        const {value: sheetName} = await Swal.fire({
            title: 'Multiples sheets in your file',
            input: 'select',
            inputOptions: {
                'Sheets': Object.fromEntries(workbook.SheetNames.map(x => [x,x]))
            },
            inputPlaceholder: 'Select a sheet',
        })
        sheet = workbook.Sheets[sheetName]
    }

    //Asking user to select email row.

    let cases = Object.keys(sheet)
    let fields = cases.filter(x => x[1] == "1").map(x => ({name:x, content: sheet[x].h}))
    let containsMail = fields.filter(x => x.content.includes("mail"))
    let placeholder = containsMail.length > 0 ? containsMail[0].name : undefined
    const {value: emailRow} = await Swal.fire({
            title: 'Which row is containing email address ?',
            input: 'select',
            inputValue: placeholder,
            inputOptions: {
                'rows': Object.assign({}, ...fields.map(x => {
                    let data = {}
                    data[x.name] = x.content + " - " + x.name
                    return data
                }))
            },
            inputPlaceholder: 'Select a row',
    })

    let tickets = []
    let userNumber = Object.keys(sheet).map(x => +x[1]).filter(x => !isNaN(x)).sort().reverse()[0]
    for (let x = 2;x <= userNumber+1;x++) {
        let emailC = sheet[emailRow[0]+x]
        let data = {}
        for (let j = 65; j < 91;j++) {
            let letter = String.fromCharCode(j)
            let title = sheet[letter+1]
            let content = sheet[letter+x]
            if (title && content) {
                data[title.h] = content.h
            }
        }
        data = {...{email: emailC?emailC.h : ""}, ...data}
        delete data[sheet[emailRow[0]+1].h]
        emailC ? tickets.push(data) : ""
    }
    let result = await Swal.fire({
        title: 'Is this single line ok ?',
        html: arrayOfObjectsToTable([tickets[0]]),
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    })
        /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
        return tickets
    } else if (result.isDenied) {
        return []
    }


}