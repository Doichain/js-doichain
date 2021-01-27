const bitcoin = require('bitcoinjs-lib')
const ElectrumClient = require('@codewarriorr/electrum-client-js')
import {isOurAddress} from "./isOurAddress";
import {isOurChangeAddress} from "./isOurChangeAddress";

export async function listTransactionsElectrum(address, DOICHAIN) {
    let script = bitcoin.address.toOutputScript(address, DOICHAIN)
    let hash = bitcoin.crypto.sha256(script)
    let reversedHash = new Buffer(hash.reverse())
    console.log(address, ' maps to ', reversedHash.toString('hex'))

    const client = new ElectrumClient("demo30122020.doi.works", 50002, "tls");
    let result = [];
      try {
        await client.connect(
          "electrum-client-js", // optional client name
          "1.4.2" // optional protocol version
        );

        const history = await client.blockchain_scripthash_getHistory(
          reversedHash.toString("hex")
        );

        const header = await client.blockchain_headers_subscribe()
        const decriptedHeader = bitcoin.Block.fromHex(header.hex);

        history.forEach(async (tx) => {
          const transaction = await client.blockchain_transaction_get(
            tx.tx_hash
          );
          const decryptedTx = bitcoin.Transaction.fromHex(transaction);
          // console.log(decryptedTx)
          
          //check all inputs and check if the address is ours or not
          let isOurInput
          decryptedTx.ins.forEach(async function (input, n) {
            //find the address of the input tx
            const chunks = bitcoin.script.decompile(
              new Buffer(input.script, "hex")
            );
            const dec = bitcoin.script.toASM(chunks).split(" ")[1];
            const address = bitcoin.payments.p2pkh({
              pubkey: new Buffer(dec, "hex"),
              network: DOICHAIN,
            }).address;
            if(isOurAddress(address)) isOurInput=true
          });

          decryptedTx.outs.forEach(function (out, n) {
            const address = bitcoin.address.fromOutputScript(
              out.script,
              DOICHAIN
            );

            const vout = {
              txid: decryptedTx.getId(),
              satoshi: isOurInput ? out.value * -1 : out.value,
              value: isOurInput
                ? 1e-8 * out.value * -1
                : 1e-8 * out.value,
              n: n,
              category: isOurInput ? "sent" : "received",
              address: address,
              scriptPubKey: {
                asm: bitcoin.script.toASM(out.script),
                hex: out.script.toString("hex"),
              },
              timestamp: decriptedHeader.timestamp
            };
            if(isOurAddress(address) && !isOurInput)result.push(vout); //this is not our input, it's received
            if(!isOurAddress(address)&& !isOurChangeAddress(address) && isOurInput)result.push(vout); // is our input, it's sent
          });
        });

        const balance = await client.blockchain_scripthash_getBalance(
          reversedHash.toString("hex")
        );
        console.log(balance);
        const unspent = await client.blockchain_scripthash_listunspent(
          reversedHash.toString("hex")
        );
        console.log(unspent);

        await client.close();
      } catch (err) {
        console.error(err);
      }
      return result;
}