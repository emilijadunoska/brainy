import { View, StyleSheet, Dimensions, AppState } from "react-native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth, database } from "../../firebase";
import {
  getDatabase,
  ref,
  set,
  push,
  update,
  onValue,
  off,
} from "firebase/database";

const { width, height } = Dimensions.get("window");

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const { bottom } = useSafeAreaInsets();

  const messagesRef = useRef([]);

  const apiKey = "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";
  const apiURL = "https://api.openai.com/v1/chat/completions";
  const logo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/640px-ChatGPT_logo.svg.png";

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.currentState);

  useEffect(() => {
    const unKeyboardDidShow = AppState.addEventListener("change", handleAppStateChange);
    fetchUserData();
    return () => {
      unKeyboardDidShow.remove();
    };
  }, []);

  const fetchUserData = () => {
    // Function to fetch user data
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
        firstMessage(data);  // Pass user data to the firstMessage function
      });
    }
  };

  /*
  const firstMessage = (data) => {
    const initialMessage = [];
    if (data) {
      const greetingMessage = {
        _id: 1,
        text: `Hello ${data.name}, how are you today?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot GPT",
          avatar: logo,
        },
      };
    initialMessage.push(greetingMessage);
    if (data.lastConversationSummary) {  // If the last conversation exists
      const lastConversationMessage = {
        _id: 2,
        text: data.lastConversationSummary,  // Show the last conversation
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot GPT",
          avatar: logo,
        },
      };
     // initialMessage.push(lastConversationMessage);
    }
  }
  setMessages(initialMessage);
  messagesRef.current = initialMessage;
};


  const onSend = useCallback((message = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
    const value = message[0]?.text;
    callApi(value);
  }, []);

  const callApi = async (value) => {
    const prompt = `I want you to act as a mental health adviser. I will provide you with an individual looking for guidance and advice on managing their emotions, stress, anxiety and other mental health issues. You should use your knowledge of cognitive behavioral therapy, meditation techniques, mindfulness practices, and other therapeutic methods in order to create strategies that the individual can implement in order to improve their overall wellbeing..\n\nUser: ${value}`;

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: value },
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

      if (
        data.choices &&
        data.choices.length > 0 &&
        data.choices[0]?.message?.content
      ) {
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
    setMessages((previousMessages) => {
      messagesRef.current = GiftedChat.append(previousMessages, [newMessage]);
      return messagesRef.current;
    });
  };

  //Detect when the application went in background
  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    if (nextAppState.match(/inactive|background/)) {
      const currentBackgroundTime = new Date(); // Store the current timestamp when the app goes into the background
      console.log(
        "App went to background at:",
        currentBackgroundTime.toLocaleTimeString()
      );
      summarizeConversation();
    }
    appState.current = nextAppState;
    setAppStateVisible(AppState.currentState);
    console.log("Appstate:", appState.current);
  };

  const summarizeConversation = async () => {
    const conversation = messagesRef.current
      .map((message) => `${message.user.name}: ${message.text}`)
      .join("\n");
    const prompt = `Summarize the following conversation: \n${conversation}`;

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
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

      if (
        data.choices &&
        data.choices.length > 0 &&
        data.choices[0]?.message?.content
      ) {
        const response = `In the last conversation, you talked about: ${data.choices[0].message.content}`;
        addNewMessage(response);

        saveSummaryToFirebase(response);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const saveSummaryToFirebase = (summary) => {
    const user = auth.currentUser;
    console.log(user.toString);

    if (user != null) {
      const userId = user.uid; // Get logged in user's ID
      console.log(userId);
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);

      update(userRef, {
        lastConversationSummary: summary,
      });
    } else {
      console.log("No user is signed in.");
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" },
      headerTintColor: "#282534",
    });
  }, [navigation]);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 10 }}>
          <Ionicons name="send" size={26} color="#282534" />
        </View>
      </Send>
    );
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
        renderSend={renderSend}
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
  sendButton: {
    marginLeft: 10,
  },
});
