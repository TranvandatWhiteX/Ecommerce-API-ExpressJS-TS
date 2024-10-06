import shopModel from "../models/shop.model.js";
import {Role} from "../enums/role.enum.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {TokenService} from "./token.service.js";
import {generateToken} from "../utils/jwt.token.js";
import {AppError} from "../exceptions/error.app.js";
import {BAD_REQUEST} from "../enums/code.eum.js";

export class AuthService {
    static signUp = async ({name, email, password}) => {
        const existedShop = await shopModel.findOne({email}).lean();
        if (existedShop) {
            throw new AppError(BAD_REQUEST, "Email already exists");
        }
        const encodedPassword = await bcrypt.hash(password, 10);
        const shop = await shopModel.create({
            name, email,
            password: encodedPassword,
            isActive: false,
            verified: false,
            roles: [Role.SHOP]
        })
        if (shop) {
            const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa",
                {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });
            const payload = {
                "shop_id": shop._id,
                "shop_name": shop.name
            }
            const tokens = generateToken(payload, privateKey);
            const refreshTokens = [tokens.refreshToken];
            const pubKey = TokenService.saveToken({shopId: shop._id, publicKey: publicKey, refreshTokens});
            return {
                code: 201,
                metadata: {
                    shop: shop,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken
                }
            }
        }
    }
}