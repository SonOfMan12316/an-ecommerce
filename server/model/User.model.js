import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide unique username'],
        unique: [true, 'Username already exists'],
    },
    firstName: {
        type: String,
        required: [true, 'Please provide firstname']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide firstname']
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        unique: false,
    },
})

export default mongoose.model.Users || mongoose.model('User', UserSchema);