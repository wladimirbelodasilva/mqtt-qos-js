import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("PUB Incêndio: conectado");
  let i = 0;

  const t = setInterval(() => {
    const detectou = Math.random() < 0.8; 
    if (detectou) {
      client.publish("estufa/alerta/incendio", `ALERTA fumaça detectada! (evento ${i})`, { qos: 2 });
      console.log("PUB Incêndio enviou ALERTA:", i);
      i++;
    }

    if (i === 5) {
      clearInterval(t);
      client.end();
    }
  }, 3000);
});
