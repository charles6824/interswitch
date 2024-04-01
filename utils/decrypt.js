import CryptoJS from "crypto-js";

export const decryptData = (data) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(data, process.env.KEY);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    
    // Check if decryption was successful
    if (!decryptedData) {
      throw new Error("Decryption failed or produced empty data.");
    }
    
    console.log("decryptedData: ", JSON.parse(decryptedData));
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error while decrypting data:", error.message);
    return null; // or handle error as required
  }
};
