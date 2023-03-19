import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios, { Axios } from 'axios';

const ChatGPT = () => {
    const [data,setData]=useState([]);
    const apiKey = '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'
    const apiURL = 'https://api.openai.com/v1/engines/text-davinci-002/completions'
    const [textInput,setTextInput] = useState('');

    const handleSend = async () => {
        const prompt = textInput
        const response = await axios.post(apiURL,
            {prompt,max_tokens:1024,temperature:0.5},
            {headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${apiKey}`}})

        const text = response.data.choices[0].text
        setData([...data, {type: 'user', 'text': textInput},{type: 'bot', 'text' : text}])
        setTextInput('')
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brainy</Text>
      <FlatList data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem = {({item}) => (
            <View style = {{flexDirection : 'row', padding: 10}}>
                <Text style={{fontWeight:'bold', color: item.type === 'user' ? 'green' : 'red'}}>{item.type === 'user' ? 'Ninza' : 'Bot'}</Text>
                <Text style={styles.bot}>{item.text}</Text>
            </View>
        )}
      />
      <TextInput style={styles.input}
        value= {textInput}
        onChangeText = {text => setTextInput(text)}
        placeholder = "Ask me anything"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Let's go</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatGPT

const styles = StyleSheet.create({
    
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 20,
        marginTop: 70
},
    container: {
      flex: 1,
      backgroundColor: '#ffcc9',
      alignItems: 'center',
      
    },
    body:{
        backgroundColor: '#fffcc9',
        width : '102%',
        margin : 10
    },
    bot: {
        fontSize:16
    },
    input : {
        borderWidth: 1,
        borderColor: 'black',
        width : '90%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor:'yellow',
        width: '90%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems : 'center',
        marginBottom: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color : 'blue'
    }
  });