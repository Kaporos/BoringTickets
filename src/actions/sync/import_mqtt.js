import {getEvent} from "../storage/getEvent";
import {randomIntFromInterval} from "../random";
import Swal from "sweetalert2";

let client;
let topic;
let code;
// called when a message arrives
async function onMessageArrived(message) {
    let event = await getEvent(false);
    if (message.payloadString.includes("data:")) {
        console.log("Event received !")
        let content = message.payloadString.split("data:")[1]
        let event = JSON.parse(content)
        localStorage.setItem("code", event.code)
        localStorage.setItem("eventName", event.name)
        localStorage.setItem("customFields", JSON.stringify(event.custom))
        await Swal.fire("Event "+event.name+" successfully imported !")
    }
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
    console.log("Trying to reconnect...")
    client.connect({onSuccess:onConnect})
}


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    client.subscribe(topic);
    console.log("Asking event...");
    let message = new Paho.MQTT.Message("askEvent")
    message.destinationName = topic;
    client.send(message)


}

export async function importEvent(ncode) {
    client = document.location.origin.includes("https") ? 
    new Paho.MQTT.Client("wss://"+CONFIG.mqttHostname+"/"+CONFIG.mqttPath, "clientId-"+randomIntFromInterval(10000,10000000))
        : new Paho.MQTT.Client(CONFIG.mqttHostname, CONFIG.mqttHttpPort, CONFIG.mqttPath, "clientId-"+randomIntFromInterval(10000,10000000));
    console.log(client.clientId)
    code = ncode
    topic = "boringtickets-"+code
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({onSuccess:onConnect});
    window.client = client
}