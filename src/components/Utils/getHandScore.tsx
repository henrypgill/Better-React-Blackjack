import { Card } from '../Types/CardInterfaces';

function getHandScore(handOfCards: Card[]): number {
  let turnTotal = 0;
  handOfCards
    .sort((a, b) => getCardValue(b.value) - getCardValue(a.value))
    .forEach((cardInHand: Card) => (turnTotal += getCardValue(cardInHand.value)));
  return turnTotal;

  function getCardValue(cardValue: string): number {
    switch (cardValue) {
      case 'ACE':
        // if (turnTotal + 11 > 21) {
        //   return 1;
        // } else {
          return 11;
        // }
      case 'KING':
        return 10;
        break;
      case 'QUEEN':
        return 10;
      case 'JACK':
        return 10;
      case '10':
        return 10;
      case '9':
        return 9;
      case '8':
        return 8;
      case '7':
        return 7;
      case '6':
        return 6;
      case '5':
        return 5;
      case '4':
        return 4;
      case '3':
        return 3;
      case '2':
        return 2;
    }
    return 0;
  }
}

export default getHandScore;
