import { playersList } from "./components/players.js";
import { rollDice } from "./components/rollDice.js";
import { playRaceEngine } from "./components/raceEngine.js";

let player1 = {}
let player2 = {}

do {
  player1 = playersList[await rollDice() - 1]
  player2 = playersList[await rollDice() - 1]
} while (player1.NOME == player2.NOME)

  
async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS}`);
  console.log(`${character2.NOME}: ${character2.PONTOS}`);
  
  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆\n`)
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆\n`)
  else
    console.log("\nA corrida terminou empatada!\n")
}
  
(async function main() {
  console.log(
    `\nRolam os dados para determinar os jogadores!! 🎲🎲\n
    Player 1: ${player1.NOME}
    Player 2: ${player2.NOME}\n`
  )

  console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando ... \n`);

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();