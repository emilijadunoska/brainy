import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NotificationsScreen from "../NotificationsScreen";

jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
  }),
}));

describe("NotificationsScreen", () => {
  it('navigates to ChatScreen when "Not now" button is pressed', () => {
    const navigateMock = jest.fn();
    const { getByTestId } = render(
      <SafeAreaProvider>
        <NotificationsScreen navigation={{ navigate: navigateMock }} />
      </SafeAreaProvider>
    );

    const notNowButton = getByTestId("notNowButton");

    fireEvent.press(notNowButton);

    expect(navigateMock).toHaveBeenCalledWith("ChatScreen");
  });
});
