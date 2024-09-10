import KeyStore from "./KeyStore.jsx";

export function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

export function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export async function generateAKey() {
    const aesKey = await window.crypto.subtle.generateKey(
        {name: "AES-CBC", length: 128}, // Algorithm using this key
        false,                           // Allow it to be exported
        ["encrypt", "decrypt"]          // Can use for these purposes
    )

    // const aesKeyBuffer = await window.crypto.subtle.exportKey('raw', aesKey);
    return aesKey;
}

export async function encrypt(aesKey, data){
    data = str2ab(data);

    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const result = await window.crypto.subtle.encrypt(
        {name: "AES-CBC", iv: iv},
        aesKey.key,
        new Uint8Array(data)
    );

    // const decryptedData = await decrypt(aesKey, ab2str(iv), ab2str(result));
    // console.log("Decrypted: ", decryptedData);

    return {
        "Data": ab2str(result),
        "iv": ab2str(iv)
    };
}

export async function decrypt(aesKey, iv, data) {
    const blobData = new Uint8Array(str2ab(data));

    const result= await window.crypto.subtle.decrypt(
        {name: "AES-CBC", iv: str2ab(iv)},
        aesKey.key,
        blobData
    )

    return JSON.parse(ab2str(result));
}

export async function getKey(username){
    let keyStore = new KeyStore();
    try{
        await keyStore.open()
        return await keyStore.getKey("name", username);
    }catch (e) {
        console.log("Error");
    }
}

export async function saveKey(aesKeyBytes, username) {
    let keyStore = new KeyStore();
    try{
        await keyStore.open()
        return await keyStore.saveKey(aesKeyBytes, username);
    }catch (e) {
        console.log("Error");
    }
}

export function arrayBufferToHexString(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var hexString = "";
    var nextHexByte;
    for (var i=0; i<byteArray.byteLength; i++) {
        nextHexByte = byteArray[i].toString(16);  // Integer to base 16
        if (nextHexByte.length < 2) {
            nextHexByte = "0" + nextHexByte;     // Otherwise 10 becomes just a instead of 0a
        }
        hexString += nextHexByte;
    }
    return hexString;
}

export function hexStringToByteArray(hexString) {
    if (hexString.length % 2 !== 0) {
        throw Error("Must have an even number of hex digits to convert to bytes");
    }
    var numBytes = hexString.length / 2;
    var byteArray = new Uint8Array(numBytes);
    for (var i=0; i<numBytes; i++) {
        byteArray[i] = parseInt(hexString.substr(i*2, 2), 16);
    }
    return byteArray;
}

