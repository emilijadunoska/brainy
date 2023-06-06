import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Register from '../RegisterScreen';


describe('Register', () => {
  it('registers when the button is clicked with all inputs filled', () => {
    const navigation = { navigate: jest.fn() };
    const { getByPlaceholderText, getByText } = render(<Register navigation={navigation} />);
    
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Register');

    // Fill in the input fields
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'password');

    // Click the register button
    fireEvent.press(registerButton);

    // Assert that the navigation was called
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
