import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

let nivelAtual = 100; 

client.on("connect", () => {
  console.log("PUB Reservatório: conectado");
  let i = 0;

  const t = setInterval(() => {
    
    nivelAtual -= (Math.random() * 5).toFixed(1) * 1;
    nivelAtual = Math.max(0, nivelAtual);

    const msg = `nivel ${nivelAtual.toFixed(1)}%`;

    client.publish("estufa/agua/nivel", msg, { qos: 1 }, () => {
      console.log(` PUBACK recebido — leitura ${i} confirmada`);
    });

    // alerta visual conforme o nivel
    if (nivelAtual <= 20) {
      console.log(` PUB Reservatório enviou: leitura ${i} → ${nivelAtual.toFixed(1)}% NÍVEL CRÍTICO!`);
    } else if (nivelAtual <= 50) {
      console.log(`  PUB Reservatório enviou: leitura ${i} → ${nivelAtual.toFixed(1)}% atenção`);
    } else {
      console.log(` PUB Reservatório enviou: leitura ${i} → ${nivelAtual.toFixed(1)}%`);
    }

    i++;

    if (i === 10) {
      clearInterval(t);
      client.end();
    }
  }, 2000);
});
