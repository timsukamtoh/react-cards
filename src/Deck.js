import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const SINGLE_DECK_API = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const DRAW_CARD_API = "https://deckofcardsapi.com/api/deck"

/**
 * Component for rendering Deck
 *
 * State:
 * - deck : object with deck info
 * - card : object with card info
 *
 * App -> Deck -> Card
 */
function Deck() {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);

  //Gets deck when mounted for first time
  useEffect(function () {
    async function getDeck() {
      const response = await axios.get(SINGLE_DECK_API);
      setDeck(response.data);
    }
    getDeck();
  }, []);

  /**
   * On click, draws a card with an axios GET request
   * Updates the card state
   * Updates the deck remaining
   *
   * Returns alert if no cards remaining
   */
  async function handleDraw() {
    if (deck.remaining < 1) return alert("No Cards Remaining");
    console.log("deck=", deck)

    const response = await axios.get(`${DRAW_CARD_API}/${deck.deck_id}/draw/?count=1`);

    setCard(response.data.cards[0]);
    setDeck(oldDeck => (
      { ...oldDeck, remaining: response.data.remaining }
    ))
  }

  if (!deck) return <h1>Loading Deck..</h1>;

  return (
    <div>
      {card && <Card imageSrc={card.image} />}
      <br/>
      <button onClick={handleDraw}>Draw Card</button>
    </div>
  );

}
export default Deck;