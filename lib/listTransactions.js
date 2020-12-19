import getUrl from "./getUrl";

export async function listTransactions(address, options) {
    let url = getUrl() + "/api/v1/listtransactions?address=" + address;
    if (options && options.rescan) url += "&rescan=true" //in case we are restoring a value we want to rescan the blockchhain - since it could be new server!
    let json
    try {
        let response
        let text
        if (typeof fetch === "function") response = await fetch(url);
        else {
            const fetch = require('node-fetch');
            response = await fetch(url);
        }
    
        text = await response.text()
        json = JSON.parse(text)
        if (json.status !== 'success') throw "Cannot get transactions from dApp-Url " + url
    } catch (e) {
        console.log(e)
      // throw "Cannot get transactions from dApp-Url " + url
    }
    return json
}