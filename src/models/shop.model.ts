import mongoose, { Document, Schema } from 'mongoose';

export interface IShop extends Document {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    verified: boolean;
    createdAt: Date;
    roles: string[];
    updatedAt: Date;
}

const ShopSchema: Schema<IShop> = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
        },
        roles: {
            type: [String],
            default: []
        },
        verified: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
        collection: 'shops'
    }
);

const Shop = mongoose.model<IShop>('shop', ShopSchema);
export default Shop;