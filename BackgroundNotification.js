import * as Notifications from 'expo-notifications';

// Set up the notification handler to customize the notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Function to schedule a push notification at a specific date and time
async function schedulePushNotification(date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Brainy time! 📬",
      body: 'How do you feel today',
      data: { data: 'random' },
    },
    trigger: {
      hour: date.getHours(),
      minute: date.getMinutes(),
      repeats: true, // Repeat the notification daily at the specified time
    },
  });
}

export { schedulePushNotification };
