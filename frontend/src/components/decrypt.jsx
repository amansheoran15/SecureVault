async function decrypt(aesKey, blobData) {
    // blobData = new Uint8Array(blobData);
    console.log(blobData);
    // const aesKey = await window.crypto.subtle.importKey(
    //     "raw",
    //     aesKeyBytes,
    //     {name: "AES-CBC", length: 128},
    //     true,
    //     ["encrypt", "decrypt"]
    // )

    const iv = blobData[0];
    const result= await window.crypto.subtle.decrypt(
        {name: "AES-CBC", iv: iv},
        aesKey,
        blobData[1]
    )

    return result;
}

export default decrypt;