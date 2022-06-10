window.CONFIG = {
    sib: import.meta.env.VITE_SIB,
    sibEmail: import.meta.env.VITE_SIB_EMAIL,
    sibName: import.meta.env.VITE_SIB_NAME,
    mqttHostname: "mqtt.eclipseprojects.io",
    mqttHttpPort: 80,
    mqttSslPort: 443,
    mqttPath: "/mqtt",
    mailTemplate: `Hello $NAME, here is your ticket for the event $EVENT.

    <img src="data:image/png;base64, $B64" alt="QRCODE" />
    
    This ticket is also joined as a file to this mail.
    `
}