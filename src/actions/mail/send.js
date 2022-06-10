/* Boring Tickets is designed to work without proper backend. To send mail i'll use services like Sendinblue*/

import {getEvent} from "../storage/getEvent";

const MOCK = false;

export async function sendMail(to, ticket) {
    let event = await getEvent(false);
    let mail = window.CONFIG.mailTemplate
    mail = mail.replace("$NAME", to.name)
    mail = mail.replace("$EVENT", event.name)
    mail = mail.replace("$B64", ticket)
    return fetch(MOCK ? "" : "https://api.sendinblue.com/v3/smtp/email", {
        body: JSON.stringify({
            "sender": {
                "name": window.CONFIG.sibName,
                "email": window.CONFIG.sibEmail
            },
            "to": [{
                "email": to.email,
                "name": to.name
            }],
            "subject": `${event.name} - Tickets`,
            "htmlContent": mail,
            "attachment": [{"content":ticket, "name":"ticket.png"}]
        }),
        headers: {
            Accept: "application/json",
            "Api-Key": CONFIG.sib,
            "Content-Type": "application/json"},
    method: "POST"
    })
}

