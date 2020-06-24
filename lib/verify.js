
const verify = async (recipient_mail,sender_mail,name_id,recipient_public_key) => {
    return await verifyEntry(recipient_mail,sender_mail,name_id,recipient_public_key)
};

const verifyEntry = async (recipient_mail,sender_mail,name_id,recipient_public_key) => {

   // http://5.9.154.231:4010/api/v1/opt-in/verify?recipient_mail=nico24101930@doi.works&
   // sender_mail=nico@doi.works&name_id=e/93B25F52DECE5E3F98A7B805B1E1FE6BFF4210608FB8940C9A59917DD30984B4&recipient_public_key=02e7f6565fd619cd097bfa78e82c06a5bf544da2560e93c6caf7b7f3c97ec3e816
    const url = getUrl()+"api/v1/opt-in/verify?recipient_mail="+recipient_mail+"&sender_mail="+sender_mail+"&name_id="+name_id+"&recipient_public_key="+recipient_public_key

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const json = await response.json();
    return await json.data
}

export default verify;