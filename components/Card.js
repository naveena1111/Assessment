import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight ,Alert} from 'react-native';

function Game(props) {
	
		let icon_name = '?';
		
		if(props.is_open){
			icon_name = props.number;
		}
		
		return (
			<View style={styles.card}>
				<TouchableHighlight onPress={props.clickCard} activeOpacity={0.75} underlayColor={"#f1f1f1"}>
				{props.is_open?<View style={styles.cardFront}><Text style={{color:"black",fontSize:20}}>{icon_name}</Text></View>:
				<View style={styles.cardBack}><Text style={{color:"white",fontSize:20}}>{icon_name}</Text></View>}
				</TouchableHighlight>		
			</View>
		);
	

	

}


const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center'
	},
	card_text: {
		fontSize: 50,
		fontWeight: 'bold'
	},
	cardFront:{
		height:160,
		width:120,
		backgroundColor:"white",
		marginBottom:10,
		justifyContent:"center",
		alignItems:"center",
		borderRadius:10,
		borderWidth:2,
		borderColor:"white"
	},
	cardBack:{
		height:160,
		width:120,
		backgroundColor:"#4db8ff",
		marginBottom:10,
		justifyContent:"center",
		alignItems:"center",
		borderRadius:10,
		borderWidth:2,
		borderColor:"white"
	}
});

export default Game;