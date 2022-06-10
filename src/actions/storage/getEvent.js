import Swal from "sweetalert2";
import {route} from "preact-router";

export async function getEvent(userAsk) {
    userAsk = userAsk == undefined ? true : userAsk
    let code = localStorage.getItem("code")
    let event = localStorage.getItem("eventName")
    let custom = localStorage.getItem("customFields") ? JSON.parse( localStorage.getItem("customFields")) : []
    if (code) {
        if (!userAsk || localStorage.getItem("auto") == "true") {
            return {name: event, code: code, custom: custom}
        }
        let result = await Swal.fire({
            title: 'An event is saved on your device',
            text: `Event name: ${event}`,
            showDenyButton: true,
            confirmButtonText: 'Use this one',
            denyButtonText: `Setup another`,
        })
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            return {name: event, code: code, custom: custom}
        } else if (result.isDenied) {
            localStorage.removeItem("eventName")
            localStorage.removeItem("code")
            localStorage.removeItem("customFields")
            return await getEvent()
        }
    }
    const result = await Swal.fire({
        input: 'text',
        inputLabel: 'You can also use sync button in the home page',
        denyButtonText:"Go to home page",
        showDenyButton: true,
        text:"Event Name",
        inputPlaceholder: 'Enter the event name'
    })
    if (result.isDenied) {
        route("/");
        return {}
    }
    let eventName = result.value;
    if (!eventName) {
        return await getEvent()
    }
    const { value: ncode } = await Swal.fire({
        input: 'text',
        inputLabel: 'Event Code',
        inputPlaceholder: 'Enter the event code'
    })
    if (!ncode) {
        return await getEvent()
    }
    localStorage.setItem("code", ncode)
    localStorage.setItem("eventName", eventName)
    return {name: eventName, code: ncode, custom: custom}


}