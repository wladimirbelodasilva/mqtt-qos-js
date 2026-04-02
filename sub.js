import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883", {
  clientId: "sub-incendio",
  clean: false 
});

const recebidas = new Set();

client.on("connect", (connack) => {
  console.log(`SUB Incêndio conectado (Sessão recuperada: ${connack.sessionPresent})`);

  client.subscribe("estufa/alerta/incendio", { qos: 2 }, () => {
    console.log("SUB inscrito em estufa/alerta/incendio QoS2");
  });
});

client.on("message", (topic, msg) => {
  const mensagem = msg.toString();

  if (recebidas.has(mensagem)) {
    console.log("❌ DUPLICADA:", mensagem);
  } else {
    recebidas.add(mensagem);
    console.log("🔥 ALERTA RECEBIDO:", mensagem);
  }
});