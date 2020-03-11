export var network
export var DEFAULT_NETWORK
export var DEFAULT_SETTINGS

export const DOICHAIN = {
    messagePrefix: '\x19Doichain Signed Message:\n',
    bech32: 'dc',
    bip32: {
        public: 0x0488b21e,
        private: 0x0499ade4
    },
    pubKeyHash: 52, //D=30 d=90 (52=N) https://en.bitcoin.it/wiki/List_of_address_prefixes
    scriptHash: 13,
    wif: 180, //???
};

export const DOICHAIN_TESTNET = {
    messagePrefix: '\x19Doichain-Testnet Signed Message:\n',
    bech32: 'dt',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394
    },
    pubKeyHash: 111, //D=30 d=90 (52=N) https://en.bitcoin.it/wiki/List_of_address_prefixes
    scriptHash: 196,
    wif: 239, //???
};

export const DOICHAIN_REGTEST = {
    messagePrefix: '\x19Doichain-Regtest Signed Message:\n',
    bech32: 'dcrt',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394
    },
    pubKeyHash: 111, //D=30 d=90 (52=N) https://en.bitcoin.it/wiki/List_of_address_prefixes
    scriptHash: 196,
    wif: 239, //???
};

const settingsMainnet = {
    testnet: false,
    from: "doichain@le-space.de",
    ssl: true,
    port: 443,
    host: "doichain.le-space.de"
}

const settingsTestnet = {
    testnet: true,
    from: "newsletter@doichain.org",
    port: 443,
    ssl: true,
    host: "doichain-testnet.le-space.de"
}

const settingsRegTest = {
    testnet: true,
    from: "alice@ci-doichain.org",
    port: 3000,
    host: "localhost"
}

export const changeNetwork = newNetwork => {
    network = newNetwork

    if (network === "mainnet") {
        DEFAULT_NETWORK = DOICHAIN
        DEFAULT_SETTINGS = settingsMainnet
    }
    if (network === "testnet") {
        DEFAULT_NETWORK = DOICHAIN_TESTNET
        DEFAULT_SETTINGS = settingsTestnet
    }
    if (network === "regtest") {
        DEFAULT_NETWORK = DOICHAIN_REGTEST
        DEFAULT_SETTINGS = settingsRegTest
    }
    console.log('changed network to',network)
    //console.log('DEFAULT_NETWORK',DEFAULT_NETWORK)
    //console.log('DEFAULT_SETTINGS',DEFAULT_SETTINGS)
}
