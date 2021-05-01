import { Schema, model } from 'mongoose';

const user_schema = new Schema({
    email: String,
    password: String,
    tasks: [
        {
            description: String,
            done: {
                type: Boolean,
                default: false
            },
            visibility: {
                type: Boolean,
                default: true
            }
        }
    ],
});

export default model("User", user_schema);