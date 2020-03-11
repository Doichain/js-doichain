import getUrl from "./getUrl";
import { isBrowser, isNode } from 'browser-or-node';

export const fundWallet = (address) => {

    //1. connect to dApp (if this is not dApp)
    if(isBrowser){
        const url = getUrl()
        console.log('this is a browser calling Doichain dApp API and request loaded privateKey',url)

    }else{ //we are on dApp
        console.log('this is on nodejs - we just call Doichain Node via RPC')
        //1. execute sendmoney
    }

    //2. request DOI to address
}
