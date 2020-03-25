import getUrl from "./getUrl";
import { isBrowser, isNode } from 'browser-or-node';

export const fundWallet = async (address,amount) => {

    //1. connect to dApp (if this is not dApp)
    if(isBrowser){
        console.log('this is a browser calling Doichain dApp API and request loaded privateKey',url)
    }else{ //we are on dApp
        console.log('this is on nodejs - we just call Doichain Node via RPC')
        const url = getUrl()+"api/v1/funding?address="+address+"&amount="+amount;
        console.log(url)
        const fetch = require('node-fetch');
         const response = await fetch(url, {method: 'GET',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
         }})

         const json = await response.json();
         return json
    }

    //2. request DOI to address
}
