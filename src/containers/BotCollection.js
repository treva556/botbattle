import React from 'react'
import BotCard from "../components/BotCard"

export default function BotCollection({ botCollection, action}) {
  const displayBotCards = botCollection.map(bot => {
    return <BotCard bot={bot} action={action} />
  })

  return (
    <div className="ui segment inverted teal bot-army">
       <div className="ui four column grid">
      <div className="row">
        {displayBotCards}
       
      </div>
    </div>


    </div>
   
  )
}