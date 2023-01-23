import React from "react";
import BotsCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'
import BotSpecs from '../components/BotSpecs'
import BotSearch from '../components/BotSearch'
import Filter from "../components/filter";

class BotsPage extends React.Component {
  constructor(){
    super()
    this.state = {
      allBots: [],
      selectBot: undefined,
      query: '',
      filter: 'All'
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/bots')
    .then(res => res.json())
    .then(bots => this.setBots(bots))
      .then(bots => this.setState({
        allBots: bots
      }))
  }

  setBots = (bots) => {
    return bots.map(bot => {
      bot.owned = false
      return bot
    })
  }

  clickBot = (bot) => {
    this.setState({
      selectBot: bot
    })
  }

  addBot = (selectBot) => {
    let x = this.state.allBots.map(bot => {
      if(bot.id === selectBot.id){
        bot.owned = !bot.owned
        return bot
      }else {
        return bot
      }
    })
    this.setState({
      allBots: x
    })
  }

  filterFreeBots = () => {
    let freeBots = []
    this.state.allBots.map(bot => {
      if(bot.owned === false){
        freeBots.push(bot)
      }
    })
    if(this.state.filter !== 'All'){
      freeBots = freeBots.filter(bot => 
        bot.bot_class == this.state.filter
      )
    }
    if(this.state.query){
      freeBots = freeBots.filter(bot=> 
        bot.name.toLowerCase().includes(this.state.query.toLowerCase())
      )
    }
    return freeBots
  }

  filterOwnedBots = () => {
    let ownedBots = []
    this.state.allBots.map(bot => {
      if(bot.owned === true){
        ownedBots.push(bot)
      }
    })
    let filtered = ownedBots.filter(bot=> {
      return bot.name.toLowerCase().includes(this.state.query.toLowerCase())
    })
    return filtered
  }

  handleClear = () => {
    this.setState({
      query: ''
    })
  }

  handleChange = (query) => {
    this.setState({
      query: query
    })
  }

  clearSpec = () => {
    this.setState({
      selectBot: undefined
    })
  }

  filterChange = (value) => {
    this.setState({
      filter: value
    })
  }

  
  render() {
    console.log(this.state)
    return (
      <div>
        <BotSearch handleClear={this.handleClear} handleChange={this.handleChange}/>
        <br></br>
       {/*} <Filter filterChange={this.filterChange}/>*/}
        <YourBotArmy bots={this.filterOwnedBots()} addBot={this.clickBot}/>
        <br></br>
        {this.state.selectBot ? <BotSpecs bot={this.state.selectBot} clearSpec={this.clearSpec} addBot={this.addBot} />: 
          <BotsCollection bots={this.filterFreeBots()} addBot={this.clickBot}/>}
      </div>
    );
  }

}

export default BotsPage;