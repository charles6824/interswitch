// import forge from 'node-forge';
import CryptoJS from "crypto-js";



const encryptData = async(data) => {
  try {
    const jsonData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonData, process.env.KEY).toString();
    return encryptedData;
  
  } catch (error) {
    // Handle errors
    console.error(error);
    return null;
  }
}




export { encryptData }