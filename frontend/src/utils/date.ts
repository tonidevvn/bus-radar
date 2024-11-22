function getCurrentDayOfWeek() {
  // monday, tuesday, wednesday, thursday, friday, saturday, sunday
  return new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
}

export {
  getCurrentDayOfWeek
};
