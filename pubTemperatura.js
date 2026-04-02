import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("PUB temperatura: conectado");
  let i = 0;

  const t = setInterval(() => {
    const temp = (20 + Math.random() * 10).toFixed(1);
    client.publish("estufa/temp/ambiente", `temp ${temp}°C (leitura ${i})`, { qos: 0 });
    console.log("PUB Temperatura enviou:", i, `→ ${temp}°C`);
    i++;

    if (i === 20) {
      clearInterval(t);
      client.end();
    }
  }, 500);
});
