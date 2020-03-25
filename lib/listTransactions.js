import getUrl from "./getUrl";

export async function listTransactions(address) {
    console.log('fettching tx for addr',address)
    const url = getUrl()+"/api/v1/listtransactions?address=" + address;
    let response
    if(typeof fetch === "function") response = await fetch(url);
    else{
        const fetch = require('node-fetch');
        response = await fetch(url);
    }
   // const json = await response.json();
    
    const text = await response.text()
    console.log('text',text)
    const json = JSON.parse(text)
    return json
}
