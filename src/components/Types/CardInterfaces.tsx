interface CardDeck {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface Card {
  code: string;
  image: string;
  images: object;
  value: string;
  suit: string;
}

interface DeckDraw {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
}

export type { CardDeck, Card, DeckDraw };
