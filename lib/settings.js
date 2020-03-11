var settings = {
    testnet:true,
    ssl:true,
    from: 'newsletter@doichain.org',
    port:443,
    host:"doichain-testnet.le-space.de",
    getSettings: function() {
        return this
    },
    setSettings: function (_settings) {
        this.testnet = _settings.testnet
        this.from = _settings.from
        this.port = _settings.port
        this.host = _settings.host
        this.ssl = _settings.ssl
    }
}
export default settings
