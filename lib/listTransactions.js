const bitcoin = require('bitcoinjs-lib')
const ElectrumClient = require('@codewarriorr/electrum-client-js')
import {isOurAddress} from "./isOurAddress";
import {isOurChangeAddress} from "./isOurChangeAddress";

const getAddressOfInput = (input) => {
    //find the address of the input tx
    const chunks = bitcoin.script.decompile(
        Buffer.from(input.script, "hex")
    );
    //console.log("input", n)
    //this is a coin transaction
    const asmScript = bitcoin.script.toASM(chunks)
    const dec = asmScript.split(" ")[1];
    let address = "coinbase"
    if (dec !== undefined) {
        if (dec === undefined) {
            console.error(bitcoin.script.toASM(chunks), "undefined dec!!!")
        }
        address = bitcoin.payments.p2pkh({
            pubkey: Buffer.from(dec, "hex"),
            network: network,
        }).address;
    }
    console.warn('input address',address)
    return address
}

export async function listTransactions(address, network) {
        console.info('listing transactions for address address', address)
        let script = bitcoin.address.toOutputScript(address, network)
        let hash = bitcoin.crypto.sha256(script)
        let reversedHash = Buffer.from(hash.reverse())
        console.log(address, ' maps to ', reversedHash.toString('hex'))

        const client = new ElectrumClient("demo30122020.doi.works", 50002, "tls");
        let result = [];
        try {
            await client.connect(
                "electrum-client-js", // optional client name
                "1.4.2" // optional protocol version
            );
            const header = await client.blockchain_headers_subscribe()
            const history = await client.blockchain_scripthash_getHistory(
                reversedHash.toString("hex")
            );

            history.forEach(async (tx, i) => {
                const transaction = await client.blockchain_transaction_get(
                    tx.tx_hash
                );
                const decryptedTx = bitcoin.Transaction.fromHex(transaction);
                console.log("decrypted tx with index", i)

                //check all inputs and check if the address is ours or not
                let isOurInput
                decryptedTx.ins.forEach(async function(input, n) {
                    const inputAddress = getAddressOfInput(input)
                    if (isOurAddress(inputAddress)) isOurInput = true
                });
                const decriptedHeader = bitcoin.Block.fromHex(header.hex);
                decryptedTx.outs.forEach(function(out, n) {
                    let address = "address inside name tx"

                    try {
                        //in case this is a name_op (e.g. OP_10 transaction this script will not work - no chance getting the address 
                        //we don't see any results printed even tho we expect received and sent transactions - what is the reason here
                        address = bitcoin.address.fromOutputScript(
                            out.script,
                            network
                        );
                        const vout = {
                            txid: decryptedTx.getId(),
                            satoshi: isOurInput ? out.value * -1 : out.value,
                            value: isOurInput ?
                                1e-8 * out.value * -1 : 1e-8 * out.value,
                            n: n,
                            category: isOurInput ? "sent" : "received",
                            address: address,
                            scriptPubKey: {
                                asm: bitcoin.script.toASM(out.script),
                                hex: out.script.toString("hex"),
                            },
                            timestamp: decriptedHeader.timestamp
                        }
                        console.log('address',address)
                        if (isOurAddress(address) && !isOurInput) result.push(vout); //this is not our input, it's received
                        if (!isOurAddress(address) && !isOurChangeAddress(address) && isOurInput) result.push(vout); // is our input, it's sent
                    } catch (e) {
                        console.error("exception",e)
                    }
                });
            });

    /*    const balance = await client.blockchain_scripthash_getBalance(
          reversedHash.toString("hex")
        );
        console.log(balance);
        const unspent = await client.blockchain_scripthash_listunspent(
          reversedHash.toString("hex")
        );
        console.log(unspent);*/

        //await client.close();
      } catch (err) {
        console.error(err);
      }
      return result;
}