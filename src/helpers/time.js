// Convert "3:58.223" to 238.223 seconds
export function toSeconds(time) {
  const [minutes, seconds] = time.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

// Convert 238.223 back to "3:58.223"
export function formatSeconds(total) {
  const minutes = Math.floor(total / 60);
  const seconds = (total - minutes * 60).toFixed(3).padStart(6, "0");
  return minutes + ":" + seconds;
}