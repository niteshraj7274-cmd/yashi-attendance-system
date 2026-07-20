export const uploadWithRetry = async (
  uploadFn: () => Promise<string>,
  maxRetries = 3,
  delayMs = 2000
): Promise<string> => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await uploadFn();
    } catch (err) {
      attempt++;
      console.warn(`Upload failed, attempt ${attempt} of ${maxRetries}`, err);
      if (attempt >= maxRetries) {
        throw err;
      }
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
  throw new Error("Upload failed");
};
