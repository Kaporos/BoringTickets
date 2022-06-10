import {generateSvg} from "./generateQr";
import {render} from "preact";
import {Ticket} from "../../templates/ticket";
import html2canvas from "html2canvas";

const WIDTH = 800
const HEIGHT = 800

export async function generateTicket(data) {
    let hidden = document.getElementById("hidden")
    render(<Ticket data={data}/>, hidden)
    let canvas = await html2canvas(hidden)
    return canvas.toDataURL("image/png").split("base64,")[1]


}