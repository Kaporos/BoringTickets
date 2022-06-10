import Swal from "sweetalert2";
import {shareEvent} from "./share_mqtt";
import {importEvent} from "./import_mqtt";
import {randomIntFromInterval} from "../random";


export async function Sync() {
    let result = await Swal.fire({
        title: 'Do you want to',
        text:"Import or Share config",
        showDenyButton: true,
        confirmButtonText: 'Share config',
        denyButtonText: `Import config`,
    })
    if (result.isConfirmed) {
        let code = randomIntFromInterval(1000,9999)
        await shareEvent(""+code)
    } else {
        const { value: code } = await Swal.fire({
            title: 'Enter the sharing code',
            input: 'text',
            inputLabel: 'Code',
            inputValue: "",
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
                if (isNaN(+value)) {
                    return "You need to enter a number"
                }
            }
        })
        await importEvent(code.toString())
    }
}