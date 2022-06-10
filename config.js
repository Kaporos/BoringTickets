window.CONFIG = {
    //sib: "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",
    sib: import.meta.env.VITE_SIB,
    sibEmail: import.meta.sibEmail.VITE_SIB_EMAIL,
    sibName: import.meta.sibName.VITE_SIB_NAME,
    mqttHostname: "mqtt.eclipseprojects.io",
    mqttHttpPort: 80,
    mqttSslPort: 443,
    mqttPath: "/mqtt",
    mailTemplate: `Hello $NAME, here is your ticket for the event $EVENT.

    <img src="data:image/png;base64, $B64" alt="QRCODE" />
    
    This ticket is also joined as a file to this mail.
    `
}