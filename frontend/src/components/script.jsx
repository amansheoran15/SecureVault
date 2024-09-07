import KeyStore from "./KeyStore.jsx";

export async function script(aesKeyBytes, username) {
    let keyStore = new KeyStore();
    try{
        await keyStore.open()

        console.log("Opened");
        const key = await keyStore.saveKey(aesKeyBytes, username);

        return key;
        // const getkey = await keyStore.getKey("name", username);
        // return getkey;
    }catch (e) {
        console.log("Error");
    }
}

