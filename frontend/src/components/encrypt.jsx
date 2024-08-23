// import {arrayBufferToHexString} from "./UtilityFunctions.jsx";
import decrypt from "./decrypt.jsx";
import {script} from "./script.jsx";

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

async function generateAKey() {
    const aesKey = await window.crypto.subtle.generateKey(
        {name: "AES-CBC", length: 128}, // Algorithm using this key
        false,                           // Allow it to be exported
        ["encrypt", "decrypt"]          // Can use for these purposes
    )

    // const aesKeyBuffer = await window.crypto.subtle.exportKey('raw', aesKey);

    return aesKey;
}

async function encrypt(data){
    let aesKey = await generateAKey();
    // console.log(aesKeyBytes);
    data = str2ab(data);

    // const aesKey = await window.crypto.subtle.importKey(
    //     "raw",
    //     aesKeyBytes,
    //     {name: "AES-CBC", length: 128},
    //     false,
    //     ["encrypt", "decrypt"]
    // )
    aesKey = await script(aesKey, "aman");
    aesKey = aesKey.key;


    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const result = await window.crypto.subtle.encrypt(
        {name: "AES-CBC", iv: iv},
        aesKey,
        new Uint8Array(data)
    );

    console.log(result);
    // const blob = new Blob([iv, new Uint8Array(result)], {type: "application/octet-stream"});
    // console.log(blob);

    const decryptedData = await decrypt(aesKey, [iv, new Uint8Array(result)]);
    console.log(ab2str(decryptedData))
}

export default encrypt;
