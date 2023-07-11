import { Card } from '../Types/CardInterfaces';

function drawNewCard(): Promise<Card> {
  const deckURL =
    'https://www.deckofcardsapi.com/api/deck/03iq7v3ci353/draw/?count=1';

  return fetch(deckURL)
    .then((response) => response.json())
    .then((newCard) => newCard.cards[0] as Card);
}

export default drawNewCard;
