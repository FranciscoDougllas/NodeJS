// Declaração do objeto jogador1 com suas propriedades
const jogador1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

// Declaração do objeto jogador2 com suas propriedades
const jogador2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

// Função para rolar um dado e retornar um número aleatório entre 1 e 6
function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função para obter um bloco aleatório (RETA, CURVA ou CONFRONTO)
function obterBlocoAleatorio() {
  const aleatorio = Math.random();
  if (aleatorio < 0.33) return "RETA";
  if (aleatorio < 0.66) return "CURVA";
  return "CONFRONTO";
}

// Função para registrar o resultado do dado rolado
function registrarResultadoDado(nomePersonagem, bloco, resultadoDado, atributo) {
  console.log(
    `${nomePersonagem} 🎲 rolou um dado de ${bloco} ${resultadoDado} + ${atributo} = ${
      resultadoDado + atributo
    }`
  );
}

// Função para testar a habilidade do personagem com base no bloco
function testarHabilidade(personagem, resultadoDado, bloco) {
  switch (bloco) {
    case "RETA":
      return resultadoDado + personagem.VELOCIDADE;
    case "CURVA":
      return resultadoDado + personagem.MANOBRABILIDADE;
    default:
      return 0;
  }
}

// Função assíncrona para executar a corrida entre dois personagens
async function executarCorrida(personagem1, personagem2) {
  for (let rodada = 1; rodada <= 5; rodada++) {
    console.log(`🏁 Rodada ${rodada}`);

    const bloco = obterBlocoAleatorio();
    console.log(`Bloco: ${bloco}`);

    const resultadoDado1 = rolarDado();
    const resultadoDado2 = rolarDado();

    let resultadoTotal1 = 0;
    let resultadoTotal2 = 0;

    if (bloco === "CONFRONTO") {
      const resultadoPoder1 = resultadoDado1 + personagem1.PODER;
      const resultadoPoder2 = resultadoDado2 + personagem2.PODER;

      console.log(`${personagem1.NOME} confrontou com ${personagem2.NOME}! 🥊`);

      registrarResultadoDado(personagem1.NOME, "poder", resultadoDado1, personagem1.PODER);
      registrarResultadoDado(personagem2.NOME, "poder", resultadoDado2, personagem2.PODER);

      if (resultadoPoder1 > resultadoPoder2 && personagem2.PONTOS > 0) {
        console.log(`${personagem1.NOME} venceu o confronto! ${personagem2.NOME} perdeu 1 ponto 🐢`);
        personagem2.PONTOS--;
      } else if (resultadoPoder2 > resultadoPoder1 && personagem1.PONTOS > 0) {
        console.log(`${personagem2.NOME} venceu o confronto! ${personagem1.NOME} perdeu 1 ponto 🐢`);
        personagem1.PONTOS--;
      } else {
        console.log("Confronto empatado! Nenhum ponto foi perdido");
      }
    } else {
      resultadoTotal1 = testarHabilidade(personagem1, resultadoDado1, bloco);
      resultadoTotal2 = testarHabilidade(personagem2, resultadoDado2, bloco);

      registrarResultadoDado(personagem1.NOME, bloco.toLowerCase(), resultadoDado1, personagem1[bloco]);
      registrarResultadoDado(personagem2.NOME, bloco.toLowerCase(), resultadoDado2, personagem2[bloco]);
    }

    if (resultadoTotal1 > resultadoTotal2) {
      console.log(`${personagem1.NOME} marcou um ponto!`);
      personagem1.PONTOS++;
    } else if (resultadoTotal2 > resultadoTotal1) {
      console.log(`${personagem2.NOME} marcou um ponto!`);
      personagem2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}

// Função para declarar o vencedor da corrida
function declararVencedor(personagem1, personagem2) {
  console.log("Resultado final:");
  console.log(`${personagem1.NOME}: ${personagem1.PONTOS} ponto(s)`);
  console.log(`${personagem2.NOME}: ${personagem2.PONTOS} ponto(s)`);

  if (personagem1.PONTOS > personagem2.PONTOS) {
    console.log(`\n${personagem1.NOME} venceu a corrida! Parabéns! 🏆`);
  } else if (personagem2.PONTOS > personagem1.PONTOS) {
    console.log(`\n${personagem2.NOME} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("A corrida terminou em empate");
  }
}

// Função principal assíncrona que inicia a corrida entre dois jogadores
(async function principal() {
  console.log(`🏁🚨 Corrida entre ${jogador1.NOME} e ${jogador2.NOME} começando...\n`);

  await executarCorrida(jogador1, jogador2);
  await declararVencedor(jogador1, jogador2);
})();