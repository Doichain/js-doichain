const CryptoJS = require("crypto-js");

export const decryptAES = (encryptedSeedPhrase, password) => {
  const our_password = password ? password : "mnemonic"
  const decrypted = CryptoJS.AES.decrypt(encryptedSeedPhrase, our_password);
  return decrypted.toString(CryptoJS.enc.Utf8)
};
