function calculateLeftTime(hours, minutes, seconds) {
  // convert into seconds
  return Number(seconds) + Number(minutes) * 60 + Number(hours) * 60 * 60;
}

function getHoursMinutesSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  return {
    hours,
    minutes,
    seconds,
  };
}
