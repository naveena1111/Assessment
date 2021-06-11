
import React from 'react';
import { StyleSheet, View, Button ,Text,TouchableOpacity,Alert} from 'react-native';
import Card from './components/Card';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.resetCards = this.resetCards.bind(this);
  
    var arr = [];
    while(arr.length < 6){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }

    let cards = arr.map(function(item){
      let obj = {};
      obj.number = item;
      return obj
    });

    let clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.is_open = false;
    });
 console.log("this.cards",this.cards)
    this.cards = this.cards.shuffle(); 
    this.state = {
      current_selection: [],
      selected_pairs: [],
      cards: this.cards,
      step:0
    }
  
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent:"space-between",flexDirection:"row",padding:10}}>
            <TouchableOpacity onPress={this.resetCards}><Text style={{color:"#4db8ff",fontSize:17}}>Restart</Text></TouchableOpacity>
            <View><Text style={{color:"white",fontSize:20}}> STEPS : {this.state.step}</Text></View>
        </View>
        <View style={styles.body}>
          { 
            this.renderRows.call(this) 
          }
        </View>
      </View>
    );
  }
  

  resetCards() {
    var arr = [];
    while(arr.length < 6){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    let cards = arr.map(function(item){
      let obj = {};
      obj.number = item;
      return obj
    });

    let clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.is_open = false;
    });

    this.cards = this.cards.shuffle(); 
    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: this.cards,
      step:0
    });
  }


  renderRows() {
   
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          { this.renderCards(cards) }
        </View>
      );
    });
   
  }


  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card 
          key={index} 
          number={card.number} 
          is_open={card.is_open}
          clickCard={this.clickCard.bind(this, card.id)} 
        />
      );
    });
  }


  clickCard(id) {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    let step = this.state.step;

    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;
    
    if(cards[index].is_open == false && selected_pairs.indexOf(cards[index].number) === -1){

      cards[index].is_open = true;
      
      current_selection.push({ 
        index: index,
        number: cards[index].number
      });

      if(current_selection.length == 2){
        step += 1;
        this.setState({step:step});
        if(current_selection[0].number == current_selection[1].number){
          selected_pairs.push(cards[index].number);
        }else{
         
          cards[current_selection[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }

        current_selection = [];
      }

      this.setState({
        cards: cards,
        current_selection: current_selection
      });

    }
   let a = cards.every(choice => choice.is_open);
   if(a){
    alert('Congratulations \n You have win with steps'+this.state.step);
   }
 
  }


  getRowContents(cards) {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if(count == 3){
        contents_r.push(contents)
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#333333'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10
  }
});