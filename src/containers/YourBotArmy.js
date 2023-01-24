import React from 'react'
import BotCard from "../components/BotCard"

export default function YourBotArmy(props) {

  const displayBots = props.bots.map(bot => {
    return <BotCard bot={bot} action={props.action} removeCard={props.removeCard} />
  })


  return (
    <div className="ui segment inverted white bot-army">
      <div className="ui three column grid">
        <div className="row bot-army-row">
          {displayBots}
        </div>
      </div>
    </div>
  )

}