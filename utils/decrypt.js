import CryptoJS from "crypto-js";

export const decryptData = (data) => {
	try {
		const decryptedBytes = CryptoJS.AES.decrypt(data, process.env.KEY);
 	 const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  	return JSON.parse(decryptedData);

	} catch (error) {
		console.log({ error });
	}
};
