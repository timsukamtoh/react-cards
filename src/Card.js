import React from "react"

/**
 * Component for rendering card image
 *
 * Props:
 * - imageSrc : string of url
 *
 * Deck -> Card
 */
function Card({imageSrc}) {
  return (
    <img src={imageSrc}/>
  )
}
export default Card;