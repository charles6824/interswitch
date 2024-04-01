import CryptoJS from "crypto-js";

const encryptData = async (data) => {
  try {
    console.log("data1: ", data)
    const jsonData = JSON.stringify(data);
    if (!jsonData) {
      throw new Error("Empty data provided for encryption.");
    }

    const encryptedData = CryptoJS.AES.encrypt(jsonData, process.env.KEY).toString();
    if (!encryptedData) {
      throw new Error("Encryption failed or produced empty data.");
    }

    return encryptedData;
  } catch (error) {
    console.error("Error while encrypting data:", error.message);
    return null; // or handle error as required
  }
};

export { encryptData };
