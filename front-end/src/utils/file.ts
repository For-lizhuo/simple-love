export const handler = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
export const processFile = async (file: File) => {
  try {
    const base64Data = await handler(file);
    return base64Data;
  } catch (error) {
    console.error(error);
    return null;
  }
};