

async function shuffleCurrentDeck(): Promise<void> {
  const shuffleURL =
    'https://www.deckofcardsapi.com/api/deck/03iq7v3ci353/shuffle/';
  fetch(shuffleURL)
    .then((response) => response.json())
    .then((shuffle) => (shuffle ? null : console.log('Not Shuffled')));
}

export default shuffleCurrentDeck;
