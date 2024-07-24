export const steps = [
  {
    selector: '[data-tour="welcome-step"]',
    content:
      "Welcome to AquaTracker! Let's take a quick tour to get you started on your hydration journey!",
  },
  {
    selector: '[data-tour="progress-bar-step"]',
    content:
      'This is your daily progress bar. It shows how much water you have consumed today. Stay on track with your hydration goals! ',
  },
  {
    selector: '[data-tour="user-bar-step"]',
    content:
      'Here you can update and customize your personal information to get the best results. Keep your profile up-to-date for accurate tracking.',
  },
  {
    selector: '[data-tour="add-water-btn-step"]',
    content:
      'Use this button to log the water you consume throughout the day. Consistently tracking your intake will help you stay hydrated.',
  },
  {
    selector: '[data-tour="calendar-step"]',
    content:
      'Check your progress for previous periods by selecting the needed date in the calendar. This helps you monitor your long-term hydration habits.',
    position: 'top',
  },
  {
    selector: '[data-tour="records-list-step"]',
    content:
      'Here you can see a list of all the water amounts you have logged. You can also edit or delete entries as needed. Stay hydrated and keep your records accurate!',
    position: 'bottom',
  },
];
