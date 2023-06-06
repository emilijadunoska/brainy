import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ConfirmationScreen from '../ConfirmationScreen';

describe('ConfirmationScreen', () => {
  it('displays the selected time', () => {
    const selectedTime = '10:00 AM';
    const { queryByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ConfirmationScreen route={{ params: { selectedTime } }} />
        </NavigationContainer>
      </SafeAreaProvider>
    );

    const selectedTimeText = queryByText(selectedTime);
    expect(selectedTimeText).not.toBeNull();
  });

  it('navigates to ChatScreen when "Start Chatting" button is pressed', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ConfirmationScreen route={{ params: { selectedTime: '10:00 AM' } }} navigation={{ navigate: navigateMock }} />
        </NavigationContainer>
      </SafeAreaProvider>
    );

    const startChattingButton = getByText('Start Chatting');
    expect(startChattingButton).not.toBeNull();
    fireEvent.press(startChattingButton);

    expect(navigateMock).toHaveBeenCalledWith('ChatScreen');
  });
});
