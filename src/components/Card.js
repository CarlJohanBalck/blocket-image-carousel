import React from 'react'

const Card = ({photoItem, index}) => {
  const {regular} = photoItem.urls;

  return (
    <div id={`card-${index}`} className="card">
      <img src={regular} alt="travel image" className="image"/>
    </div>
  )
}

export default Card;