import { getElectrumClient } from "./network"
const bitcoin = require("bitcoinjs-lib")

export const isExistingAddress = async (address) => {
  let script = bitcoin.address.toOutputScript(address)
  let hash = bitcoin.crypto.sha256(script);
  let reversedHash = new Buffer.from(hash.reverse());
  console.log(address, " maps to ", reversedHash.toString("hex"))

  const client = getElectrumClient();
  const inputAddress = [];

  try {
    await client.connect(
      "electrum-client-js", // optional client name
      "1.4.2" // optional protocol version
    );

    const history = await client.blockchain_scripthash_getHistory(
      reversedHash.toString("hex")
    )

    console.log("__history", history)

    
    //console.log("inputAddress", inputAddress);
    client.close()
  } catch (err) {
    console.error("davtest",err)
  }

  return false
};
export default isExistingAddress
