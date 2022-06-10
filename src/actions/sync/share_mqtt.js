import {getEvent} from "../storage/getEvent";
import {randomIntFromInterval} from "../random";
import Swal from "sweetalert2";

let client;
let topic;
let code;
// called when a message arrives
async function onMessageArrived(message) {
    let event = await getEvent(false);
    if (message.payloadString.includes("askEvent")) {
        console.log("Event asked...Returning event...")
        let message = new Paho.MQTT.Message("data:"+JSON.stringify(event))
        message.destinationName = topic;
        client.send(message);
    }
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}


// called when the client connects
async function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    client.subscribe(topic);
    console.log("Start sharing");
    await Swal.fire({
        title:"Your code is "+code,
        text:"While this popup is open, your config can be transfered using this code",
        confirmButtonText: "I'm done"
    })
    await stopShare()


}

export async function shareEvent(ncode) {
    client = document.location.origin.includes("https") ? 
    new Paho.MQTT.Client("wss://"+CONFIG.mqttHostname+"/"+CONFIG.mqttPath, "clientId-"+randomIntFromInterval(10000,10000000))
        : new Paho.MQTT.Client(CONFIG.mqttHostname, CONFIG.mqttHttpPort, CONFIG.mqttPath, "clientId-"+randomIntFromInterval(10000,10000000));
    code = ncode
    topic = "boringtickets-"+code
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({onSuccess:onConnect});
}

async function stopShare() {
    console.log("Stop sharing")
    client.disconnect()
    client = undefined
}