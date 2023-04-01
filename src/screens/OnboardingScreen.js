import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../images/image1.png"),
    title: "A safe space \n to share and heal",
    subtitle: "Your mental health journey begins here.",
  },
  {
    id: "2",
    image: require("../images/image2.png"),
    title: "Take some time \n to travel within",
    subtitle: "Mental health is not a destination, but a journey!",
  },
  {
    id: "3",
    image: require("../images/image3.png"),
    title: "A healthy mind \n is an asset",
    subtitle: "Chat your way to a better you!",
  },
];

const Slide = ({ item }) => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center", marginTop: Spacing * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <Image
          source={item.image}
          style={{ height: "80%", width, resizeMode: "contain" }}
        />
      </View>
    </SafeAreaView>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: Colors.primary,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View>
              <TouchableOpacity
                style={[styles.getstartedBtn]}
                onPress={() => navigation.navigate("WelcomeScreen")}
              >
                <Text
                  style={{
                    color: Colors.onPrimary,
                    fontWeight: 'bold',
                    textAlign: "center",
                    fontSize: FontSize.medium,
                  }}
                >
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    backgroundColor: "transparent",
                    color: Colors.primary,
                  },
                ]}
                onPress={skip}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: FontSize.medium,
                    color: Colors.primary,
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: FontSize.medium,
                    color: Colors.white,
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} />

      <FlatList
        pagingEnabled
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.65 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: 10,
    maxWidth: "70%",
    textAlign: "center",
    lineHeight: 23,
  },
  title: {
    color: Colors.primary,
    fontSize: FontSize.xxLarge,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    flex: 1,
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
  getstartedBtn: {
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
});

export default OnboardingScreen;
