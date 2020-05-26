import generateNameId from "./generateNameId";
import getSignature from "./getSignature";
import getDataHash from "./getDataHash";
import getPublicKey from "./getPublicKey"
import encryptMessage from "./encryptMessage"
import getUrl from "./getUrl";
/**
 * 1. Calculate NameId
 * 2. Create NameValue (SOI-signature)
 *
 * @param getPrivatKey
 * @param from
 * @param to
 * @param data
 */
const createDoichainEntry = async (privateKey,validatorPublicKey, from,to,data) =>{
    const nameId = await generateNameId();
    const message = to+from;  //TODO why to+from and not from+to?
    const signature = getSignature(message, privateKey);
    let dataHash = "";
    if(data) dataHash = getDataHash(data);

    const fromHostUrl = getUrl()

    return await encryptMessage(privateKey,validatorPublicKey,fromHostUrl).then((fromHostUrlEncrypted)=>{
        const nameValue = JSON.stringify({
            signature: signature,
            dataHash: dataHash,
            from: fromHostUrlEncrypted
        });
        return {nameId:nameId,nameValue:nameValue}
    })
}

export default createDoichainEntry
