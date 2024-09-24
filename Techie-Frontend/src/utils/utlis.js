import CryptoJS, { enc } from "crypto-js";

export const verifyToken = (email, userId, token, access) => {
    console.log(email,userId,token);
    try {
        const decodedString = CryptoJS.AES.decrypt(token, "fgwikfggwiggwfffha").toString(CryptoJS.enc.Utf8);
        const data = JSON.parse(decodedString);
        console.log(data);
        if (data.email == email && data.userId == userId) {
            return true
        }
    } catch (error) {
        return{Err : error.message}
    }
}