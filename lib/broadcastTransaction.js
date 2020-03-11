import getUrl from "./getUrl";

const broadcastTransaction = async (nameId,tx, templateDataEncrypted,validatorPublicKey) => {
    return await broadcast(nameId,tx,templateDataEncrypted,validatorPublicKey)
}

const broadcast = async (nameId,tx,templateDataEncrypted,validatorPublicKey) => {

    const url = getUrl()+"api/v1/sendrawtransaction";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            nameId:nameId,
            tx:tx,
            templateDataEncrypted:templateDataEncrypted,
            validatorPublicKey: validatorPublicKey
        })
    });

    const json = await response.json();
    return json
}

export default broadcastTransaction
