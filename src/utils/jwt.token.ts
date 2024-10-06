import JWT from "jsonwebtoken";

const generateToken = (payload: object, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2h",
        });
        const refreshToken = JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        });
        return {accessToken, refreshToken};
    } catch (error) {
        return error;
    }
}

export {generateToken};