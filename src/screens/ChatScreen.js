import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView
} from "react-native";
import React, { useState } from "react";
import axios, { Axios } from "axios";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import AppTextInput from "../../components/AppTextInput";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const apiKey = "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";
  const apiURL =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const [textInput, setTextInput] = useState('');

const handleSend = async () => {
  const promptPrefix =
  " Hello! I'm here to listen and help you work through any issues or concerns you may have. What's on your mind today? Are you struggling with any particular emotions or thoughts? Don't be afraid to open up - I'm here to provide a safe and supportive space for you to explore your feelings and find solutions. Remember, you're not alone. \n\nUser:"; 

  /*const promptPrefix = `As a psychologist/therapist, I am here to provide a supportive and non-judgmental environment for discussing your thoughts, emotions, and concerns. I will help you explore your feelings, identify patterns, and work towards solutions. Remember, our conversation is confidential, and you can feel safe sharing your experiences with me. I'm here to listen and help you work through any issues or concerns you may have. What's on your mind today? Are you struggling with any particular emotions or thoughts? Don't be afraid to open up- Remember, you're not alone. I will provide you my thoughts. I want you to give me scientific suggestions that will make me feel better.
Please describe any issues or emotions you'd like to discuss today:

User: `; */

  const prompt = promptPrefix + textInput;

  let response;
  let retries = 0;


  while (retries < 10) { // maximum number of retries
    try {
      /*response = await axios.post(
        apiURL,
        { prompt, max_tokens: 1024, temperature: 0.5 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );*/
      const systemMessage = {
        role: "system",
        content: "Act like a psychologist/therapist and try to help the user with his mental health problems."
      }
      const userMessage = {
        role: "user",
        content: textInput
      }
      const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [userMessage,systemMessage]
      }
      await fetch("https://api.openai.com/v1/chat/completions",{
          method : "POST",
          headers : {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody)
      }).then((dataResponse) => {
        return dataResponse.json();
      }).then((dataResponse) => {
        console.log(dataResponse.choices[0].message.content)
        setData([...data, { type: "user", text: textInput }, { type: "bot", text: dataResponse.choices[0].message.content }]);
        setTextInput("");
        
      })

      break; // exit the loop if the request succeeds
    } catch (error) {
      if (error.response.status === 429) { // check if the error is a 429 error
        console.log(`Rate limit exceeded. Retrying in ${error.response.headers['retry-after']} seconds.`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, error.response.headers['retry-after'] * 1000)); // wait for the retry-after time
      } else {
        console.error(error);
        break;
      }
    }
  }
 /* if (response) {
    const text = response.data.choices[0].text;
    setData([...data, { type: "user", text: textInput }, { type: "bot", text: text }]);
    setTextInput("");
  };*/
};

/*
    const text = response.data.choices[0].text;
    setData([
      ...data,
      { type: "user", text: textInput },
      { type: "bot", text: text },
    ]);
    setTextInput('');
  }; */

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Brainy</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: item.type === 'user' ? "green" : "red",
                padding: Spacing
              }}
            >
              {item.type === "user" ? 'User' : "Brainy"}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flexDirection: 'row'}}
        >
          <AppTextInput  
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
            placeholder="Ask me anything"
            style={{fontSize: FontSize.medium, padding: Spacing * 5}}
            
          />
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Text
              style={{
                color: Colors.onPrimary,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: FontSize.medium,
                
              }}
            >
              Send Message
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 20,
    marginTop: 70,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  body: {
    backgroundColor: Colors.white,
    
    margin: 10,
  },
  bot: {
    fontSize: 16,
    padding: Spacing
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "90%",
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
   
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.1,
    shadowRadius: Spacing,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
});