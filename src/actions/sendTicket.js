import {SignWithEvent} from "./data/generation";
import {generateTicket} from "./image/generateTicket";
import {sendMail} from "./mail/send";

export async function sendTicket(data, to) {
    data.youtube = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    let signed = await SignWithEvent(data);
    generateTicket(signed).then(async (ticket) => {
        await sendMail(to, ticket)

    })
}