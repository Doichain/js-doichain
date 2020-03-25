const CryptoJS = require("crypto-js");

export const decryptAES = (encryptedSeedPhrase, password) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedSeedPhrase, password);
  return decrypted.toString(CryptoJS.enc.Utf8);
};