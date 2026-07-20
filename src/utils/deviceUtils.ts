
export function getOrCreateDeviceId(): string {
  try {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId || deviceId.trim() === '' || deviceId === 'null' || deviceId === 'undefined') {
      deviceId = 'DEV_' + Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  } catch (err) {
    console.error("Local storage error:", err);
    // fallback if localStorage is blocked
    return 'DEV_' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
