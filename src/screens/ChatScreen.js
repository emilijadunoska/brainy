import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  AppState,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
//import axios, { Axios } from "axios";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import AppTextInput from "../../components/AppTextInput";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { v4 as messageIdGenerator } from "uuid";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const { bottom } = useSafeAreaInsets();

  const apiKey = "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";
  const apiURL = "https://api.openai.com/v1/chat/completions";
  const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/640px-ChatGPT_logo.svg.png";

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    firstMessage();
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const firstMessage = () => {
    
    setMessages([
      {
        _id: 1,
        text: "Hello, how are you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot GPT",
          avatar: logo,
        },
      },
    ]);
  };

  const onSend = useCallback((message = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
    const value = message[0]?.text;
    callApi(value);
  }, []);

  const callApi = async (value) => {
    const prompt = `Act like a psychologist/therapist and try to help the user with their mental health problems.\n\nUser: ${value}`;

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: value },
      ],
      max_tokens: 1024,
      temperature: 0,
    };

    try {
      const res = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await res.json();
      console.log("API Response:", data); // Log the response to check the structure and content

      if (data.choices && data.choices.length > 0 && data.choices[0]?.message?.content) {
        const response = data.choices[0].message.content;
        addNewMessage(response);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const addNewMessage = (data) => {
    const newMessage = {
      _id: Math.random().toString(), // Generate a unique ID for the message
      text: data,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Chatbot GPT",
        avatar: logo,
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
  };

//Detect when the application went in background
  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      BackgroundTimer.stopBackgroundTimer();
      startTimer();
    }
    if (nextAppState.match(/inactive|background/)) {
      console.log('App went to background!');
    }
    setAppState(nextAppState);
  };

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => { 
      console.log("tick"); 
    }, 
    1000);
  };

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        alwaysShowSend
        scrollToBottom
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtView: {
    borderBottomColor: "#EAEBE8",
    borderBottomWidth: 0.5,
    backgroundColor: "fff",
  },
  txt: { alignSelf: "flex-end", padding: 10 },
  chatContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
  },
});