import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  // Set the date and time for the notification
  const trigger = new Date(); // Use the current date and time
  trigger.setHours(14); // Set the hour (in 24-hour format)
  trigger.setMinutes(52); // Set the minute
  trigger.setSeconds(0); // Set the second

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Brainy time! 📬",
      body: 'How do you feel today',
      data: { data: 'random' },
    },
    trigger: {
      hour: trigger.getHours(),
      minute: trigger.getMinutes(),
      repeats: true, // Repeat the notification daily at the specified time
    },
  });
}

export { schedulePushNotification };
