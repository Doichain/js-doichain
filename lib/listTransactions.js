import getUrl from "./getUrl";

export async function listTransactions(address) {
    const url = getUrl()+"/api/v1/listtransactions?address=" + address;
    let response
    if(typeof fetch === "function") response = await fetch(url);
    else{
        const fetch = require('node-fetch');
        response = await fetch(url);
    }
    const text = await response.text()
    const json = JSON.parse(text)
    return json
}
