import { ConnectOptions } from "mongoose";

export const optionsMongo: ConnectOptions | any = {
    useUnifiedTopology: true,
    autoCreate: true,
};