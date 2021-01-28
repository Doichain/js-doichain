import sb from 'satoshi-bitcoin'

export const VERSION = 0x7100

export const NETWORK_FEE = {
    btc: 0.01,
    satoshis: sb.toSatoshi(0.01)
}
//0.01 for DOI storage, 0.01 DOI for reward for validator, 0.01 revokation reserved
export const VALIDATOR_FEE = {
    btc: 0.03,
    satoshis: sb.toSatoshi(0.03)
}
//0.01 for Email Verification storage, 0.01 DOI for reward for validator
export const EMAIL_VERIFICATION_FEE = {
    btc: 0.02,
    satoshis:sb.toSatoshi(0.02)
}
// this is the tx fee itself
export const TRANSACTION_FEE = {
    btc: 0.005,
    satoshis: sb.toSatoshi(0.005)
}

export const toSchwartz = (doicoin) => sb.toSatoshi(doicoin)
export const toDOI = (schwartz) => sb.toBitcoin(schwartz)

export const myAddresses = [
    {
        address: "N1XBwuQkaXr45pbo8HLRZNLEkgQnade7Mk",
        changeAddress: false
    },
    {
        address: "6NZ88uvTn25fPTeZXZ7rH52p2BCtK1v6Pb",
        changeAddress: false
    },
    {
        address: "N4PcsgPFjzhgTZqBXYvtHkiDjZ3ft3us1i",
        changeAddress: false
    },
    {
        address: "18pFg2tGpcc7w2agFjcK5EZK1KecqF4guK",
        changeAddress: false
    },
    {
        address: "NJHArPJUknmNBL42ns6k61XApnAYzrRkow",
        changeAddress: false
    },
    {
        address: "Mxo7UBaf2f2kH1aLUvHWY2o7k6K3fkCj4b",
        changeAddress: true,
    }
]
