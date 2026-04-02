import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("PUB Incêndio conectado");

  let i = 0;

  const enviar = () => {
    const detectou = Math.random() < 0.5; 

    if (detectou) {
      const msg = `ALERTA-incendio-${i}`;

      client.publish("estufa/alerta/incendio", msg, { qos: 2 }, () => {
        console.log(" PUB Incêndio enviou:", msg);
      });

      i++;

      if (i >= 5) {
        console.log("PUB finalizou");
        client.end();
        return;
      }
    } else {
      console.log("✅ Verificação OK — sem fumaça detectada");
    }

    setTimeout(enviar, 3000);
  };

  enviar();
});