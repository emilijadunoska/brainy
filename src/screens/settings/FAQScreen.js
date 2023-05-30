import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const FAQScreen = ({ navigation }) => {
  const faqs = [
    {
      question: "What is Brainy?",
      answer:
        "Brainy is a mobile app designed to provide mental health support through an interactive chatbot. It offers a safe space for users to express their feelings, receive personalized insights and mindfulness exercises to improve their mental well-being.",
    },
    {
      question: "How can Brainy help me?",
      answer:
        "Brainy can help you by providing emotional support and offering coping strategies for stress and anxiety. It utilizes natural language processing and AI techniques to understand your emotions and provide personalized suggestions tailored to your needs.",
    },
    {
      question: "Can Brainy replace traditional therapy?",
      answer:
        "Brainy is not intended to replace professional therapy or medical advice. It serves as a supplementary tool to support your mental health journey. If you have severe or persistent mental health concerns, it is always recommended to seek help from a qualified mental health professional.",
    },
    {
      question: "Is Brainy available 24/7?",
      answer:
        "Yes, Brainy is available 24/7, allowing you to access support whenever you need it. Whether it's in the middle of the night or during a stressful moment, Brainy is there to provide assistance and guidance.",
    },
    {
      question: "Is Brainy confidential?",
      answer:
        "Yes, Brainy adheres to data protection policies and security measures. All your conversations and personal information are kept strictly confidential and are not shared with any third parties.",
    },
    {
      question:
        "What should I do if I encounter technical issues or experience app-related problems?",

      answer: (
        <Text>
          If you come across any technical issues or bugs while using Brainy,
          please report them to our support team as soon as possible. You can do
          this by sending an email to{" "}
          <Text style={{ fontWeight: "bold" }}>contact@brainyapp.com</Text>{" "}
          providing a detailed description of the problem you encountered, and
          any relevant screenshots or error messages. Our team will investigate
          and work to resolve the issue promptly.
        </Text>
      ),
    },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" },
      headerTintColor: "#282534",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ paddingTop: 5, paddingBottom: 16 }}>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqContainer}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    height: "90%",
    backgroundColor: 'white'
  },
  scrollContainer: {
    paddingRight: 16, // Add padding to the right side of the scroll content
    paddingTop: 16,
    paddingBottom: 16,
  },
  faqContainer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQScreen;
