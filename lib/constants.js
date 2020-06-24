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
