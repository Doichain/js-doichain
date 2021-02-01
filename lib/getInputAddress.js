const bitcoin = require("bitcoinjs-lib")
const ElectrumClient = require("@codewarriorr/electrum-client-js")

const getInputAddressFromWitness = (input) => {
  if (input.witness !== undefined) {
    let witness = input.witness;
    let obj = bitcoin.payments.p2wpkh({ witness })    
    return obj.address;
  }
  return false
}

export const getInputAddress = async (address, network) => {
  if (!network) network = global.DEFAULT_NETWORK;

  let script = bitcoin.address.toOutputScript(address);
  let hash = bitcoin.crypto.sha256(script);
  let reversedHash = new Buffer.from(hash.reverse());
  console.log(address, " maps to ", reversedHash.toString("hex"));

  const client = new ElectrumClient("btcpay.doi.works", 50002, "ssl");
  const inputAddress = [];

  try {
    await client.connect(
      "electrum-client-js", // optional client name
      "1.4.2" // optional protocol version
    );

    const history = await client.blockchain_scripthash_getHistory(
      reversedHash.toString("hex")
    );

    for (const tx of history) {
      const transaction = await client.blockchain_transaction_get(tx.tx_hash);
      const decryptedTx = bitcoin.Transaction.fromHex(transaction);

      for (const input of decryptedTx.ins) {
        inputAddress.push(await getInputAddressFromWitness(input));
      }
    }
    //console.log("inputAddress", inputAddress);
    client.close();
  } catch (err) {
    console.error(err);
  }

  return inputAddress;
};
export default getInputAddress
