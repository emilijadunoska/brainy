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
  const [textInput, setTextInput] = useState("");

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiURL,
      { prompt, max_tokens: 1024, temperature: 0.5 },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const text = response.data.choices[0].text;
    setData([
      ...data,
      { type: "user", text: textInput },
      { type: "bot", text: text },
    ]);
    setTextInput("");
  };
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
                color: item.type === "user" ? "green" : "red",
                padding: Spacing
              }}
            >
              {item.type === "user" ? "User" : "Brainy"}
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
