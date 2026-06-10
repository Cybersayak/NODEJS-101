const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  
        trim : true, // Remove whitespace from both ends
    },
    email: {
        type: String,
        required: true,
        unique: true,  
        trim : true, // Remove whitespace from both ends
        lowercase: true, // Convert to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Minimum length for password
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Only allow 'user' or 'admin'
        default: 'user', // Default role is 'user'
    } 
 
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
// This will create a collection named 'users' in the database