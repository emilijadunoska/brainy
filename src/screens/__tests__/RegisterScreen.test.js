import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Register from "../RegisterScreen";

describe("Register", () => {
  it("registers when the button is clicked with all inputs filled", () => {
    const navigation = { navigate: jest.fn() };
    const { getByPlaceholderText, getByText } = render(
      <Register navigation={navigation} />
    );

    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const registerButton = getByText("Register");

    fireEvent.changeText(nameInput, "John Doe");
    fireEvent.changeText(emailInput, "johndoe@example.com");
    fireEvent.changeText(passwordInput, "password");
    fireEvent.changeText(confirmPasswordInput, "password");

    fireEvent.press(registerButton);

    expect(navigation.navigate).toHaveBeenCalled();
  });
});
