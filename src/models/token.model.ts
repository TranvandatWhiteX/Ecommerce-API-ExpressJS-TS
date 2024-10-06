import mongoose, { Document, Schema } from 'mongoose';

export interface IToken extends Document {
    shop: mongoose.Types.ObjectId;
    publicKey: string;
    refreshTokens: string[];
}

const TokenSchema: Schema<IToken> = new Schema({
    shop: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'shop',
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshTokens: {
        type: [String],
        default: [],
    }
}, {
    collection: 'tokens',
    timestamps: true,
})

const token = mongoose.model<IToken>('token', TokenSchema);
export default token;