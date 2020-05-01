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
    let json
    try {
        json = JSON.parse(text)
        if(json.status!=='success') throw "Cannot get transactions from dApp-Url "+url
    }catch(e){
        console.log(e)
        console.log('response from server was:', text)
      //  throw "Error while getting transactions from dApp url "+url
    }

    return json
}
