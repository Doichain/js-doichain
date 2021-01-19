const bitcoin = require('bitcoinjs-lib')
const ElectrumClient = require('@codewarriorr/electrum-client-js')

export async function listTransactionsElectrum(address, DOICHAIN) {
    let script = bitcoin.address.toOutputScript(address, DOICHAIN)
    let hash = bitcoin.crypto.sha256(script)
    let reversedHash = new Buffer(hash.reverse())

    console.log(address, ' maps to ', reversedHash.toString('hex'))

    async function main() {
      const client = new ElectrumClient("demo30122020.doi.works", 50002, "tls");
      try {
        await client.connect(
          "electrum-client-js", // optional client name
          "1.4.2" // optional protocol version
        );
        const history = await client.blockchain_scripthash_getHistory(
          reversedHash.toString("hex")
        );
        history.forEach(async (tx) => {
          const transaction = await client.blockchain_transaction_get(
            tx.tx_hash
          );
          const decryptedTx = bitcoin.Transaction.fromHex(transaction);
          // console.log(decryptedTx)
          // const txid = decryptedTx.getId();
          // console.log("txid: ",txid)
          let result = [];
          const myAddress = ["NJHArPJUknmNBL42ns6k61XApnAYzrRkow"];
          decryptedTx.outs.forEach(function (out, n) {
            const address = bitcoin.address.fromOutputScript(
              out.script,
              DOICHAIN
            );
            var vout = {
              satoshi: myAddress.includes(address) ? out.value : out.value * -1,
              value: myAddress.includes(address)
                ? 1e-8 * out.value
                : 1e-8 * out.value * -1,
              n: n,
              scriptPubKey: {
                asm: bitcoin.script.toASM(out.script),
                hex: out.script.toString("hex"),
                address: address,
              },
              type: myAddress.includes(address) ? "received" : "sent",
            };
            result.push(vout);
          });
          console.log(result[0]);
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
    }

      main()
}