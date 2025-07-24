import { getRandomBlock } from "./getRandomBlock.js";
import { rollDice } from "./rollDice.js";
import { logRollResult } from "./logRollResult.js";


export async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // Block sort
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`)

    // Roll dices
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();
  
    // Skill test
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;
  
    if (block == "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE
  
      await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

      console.log(totalTestSkill1 === totalTestSkill2
        ? "Empate! Ninguém marcou." 
        : ""
      );
  
    } else if (block == "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE
  
      await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);

      console.log(totalTestSkill1 === totalTestSkill2
        ? "Empate! Ninguém marcou." 
        : ""
      );
  
    } else if (block == "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;
      
      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
      await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

      if (powerResult1 > powerResult2 && character2.PONTOS > 0){
        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`)
        character2.PONTOS--; 
      } else if (powerResult2 > powerResult1 && character1.PONTOS > 0){
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`)
        character1.PONTOS--; 
      } else if (powerResult1 != powerResult2) {
        console.log("Não há pontos para retirar.")
      }

      console.log(powerResult1 === powerResult2
        ? "Confronto empatado! Nenhum ponto foi perdido." 
        : ""
      );
    }

    // Winner verifier
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }
    
    console.log("-----------------------------------------------------")
  }
}