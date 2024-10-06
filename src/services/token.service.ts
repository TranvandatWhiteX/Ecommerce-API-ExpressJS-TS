import tokenModel from "../models/token.model.js";

export class TokenService {
    static saveToken = async ({shopId, publicKey, refreshTokens}) => {
        try {
            const publicKeyStr = publicKey.toString();
            const token = await tokenModel.create({shop: shopId, publicKey: publicKeyStr, refreshTokens});
            return token ? publicKey : null;
        } catch (error) {
            return error;
        }
    }
}