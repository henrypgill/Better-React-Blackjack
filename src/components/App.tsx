
import './style.css';
import PlayingCard from './PlayingCard';
import shuffleCurrentDeck from './Utils/shuffleDeck';
import drawNewCard from './Utils/drawNewCard';
import getHandScore from './Utils/getHandScore';
import { Card } from './Types/CardInterfaces';
import { useEffect, useState } from 'react';
import { checkWinOrLose } from './Utils/checkWinOrLose';

type WinState = 'Win' | 'Lose' | 'Playing';
type Turn = 0 | 1 | 2;

// interface GameState {
//   roundNumber: number;
//   roundHistory: Player[];
// }
// interface RoundState {
//   winState: WinState;
//   playerTurn: Player;
// }
// const deck: CardDeck = {
//     success: true,
//     deck_id: '03iq7v3ci353',
//     remaining: 52,
//     shuffled: false,
// };


export default function App() {


  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [roundState, setRoundState] = useState<WinState>('Playing');
  const [playersTurn, setPlayersTurn] = useState<Turn>(0); // 0 for players turn, 1 for dealers turn, 2 for dealer has finished their turn
  const [waitingForCards, setWaitingForCards] = useState<boolean>(true);
  shuffleCurrentDeck();

  // const [currentCard, setCurrentCard] = useState<Card | null>(null);
  // const initialGameState: GameState ={roundNumber: 0, roundHistory: []};
  // const [gameState, setGameState] = useState<GameState>(initialGameState);
  // const [dealerStick, setDealerStick] = useState(false);

  useEffect(() => {
    handleReset();
  }, []);

  const checkRoundState = () =>
    setRoundState(checkWinOrLose(playersTurn, playerCards, dealerCards));

  const addCardToPlayersHand = (card: Card) =>
    setPlayerCards((prev) => [...prev, card]);
  const addCardToDealersHand = (card: Card) =>
    setDealerCards((prev) => [...prev, card]);

  async function dealFirstFourCards() {
    await drawNewCard().then((result) => addCardToDealersHand(result));
    await drawNewCard().then((result) => addCardToPlayersHand(result));
    await drawNewCard().then((result) => addCardToDealersHand(result));
    await drawNewCard().then((result) => addCardToPlayersHand(result));
  }

  async function handlePlayerHit() {
    if (playersTurn === 0 && !waitingForCards) {
      setWaitingForCards(true);
      await drawNewCard()
        .then((result) => addCardToPlayersHand(result))
        .then(() => setWaitingForCards(false));
    }
    checkRoundState();
  }
  function handlePlayerStick() {
    setPlayersTurn(1);
  }

  async function handleDealerTurn() {
    if (
      playersTurn === 1 &&
      !waitingForCards &&
      getHandScore(dealerCards) < 19
    ) {
      setWaitingForCards(true);
      await drawNewCard()
        .then((result) => addCardToDealersHand(result))
        .then(() => setWaitingForCards(false));
    }
  }

  async function handleReset() {
    setPlayersTurn(0);
    setWaitingForCards(true);
    setRoundState('Playing');
    setPlayerCards([]);
    setDealerCards([]);
    await shuffleCurrentDeck().then(() => dealFirstFourCards());
    setWaitingForCards(false);
  }

  return (
    <>
      <div>
        <h1>Play Blackjack</h1>
        <p>Press Hit to get another card, Stick to keep the cards you've got</p>
      </div>
      <div className="game-container">
        <h2>{roundState}</h2>
        <div className="button-container">
          <button className="hit-button" onClick={handlePlayerHit}>
            Hit
          </button>
          <button className="stick-button" onClick={handlePlayerStick}>
            Stick
          </button>
          <button className="stick-button" onClick={handleDealerTurn}>
            Advance
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <section className="game-hands-container">
        <div className="card-container">
          <h3>Your Current Score: {getHandScore(playerCards)}</h3>
          <h2>Your Hand</h2>
          <div className="hand-of-cards-container">
            {playerCards.map(PlayingCard)}
          </div>
        </div>
        <div className="card-container">
          <h3>Dealer's Current Score: {getHandScore(dealerCards)}</h3>
          <h2>Dealer's Hand</h2>
          <div className="hand-of-cards-container">
            {dealerCards.map(PlayingCard)}
          </div>
        </div>
      </section>
    </>
  );
}
