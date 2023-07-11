import getHandScore from './getHandScore';
import { Card } from '../Types/CardInterfaces';

type WinState = 'Win' | 'Lose' | 'Playing';
type Turn = 0 | 1 | 2;

export function checkWinOrLose(
  playersTurn: Turn,
  playerCards: Card[],
  dealerCards: Card[]
): WinState {
  const playerScore = getHandScore(playerCards);
  const dealerScore = getHandScore(dealerCards);

  if (playersTurn === 0 && playerScore > 21) {
      return 'Lose';
  } else if (playersTurn === 1 && dealerScore > 21) {
      return 'Win';
  } else if (playersTurn === 2) {
    if (dealerScore >= playerScore) {
      return 'Lose';
    } else if (dealerScore < playerScore) {
      return 'Win';
    }
  }

  return 'Playing';
}
