const User = require('../models/User'); // Assuming you have a User model defined
const bcrypt = require('bcryptjs'); // For hashing passwords

// Register Controller

const registerUser = async (req, res) => {
  try {
    // Simulate user registration logic
    const { username, email , role , password } = req.body;

    const checkExistingUser = await User.findOne({$or: [{ username }, { email }]});
    if (checkExistingUser) {
      return res.status(400).json({ success:false , message: 'Username or email already exists' });
    }

// Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user and save in your database  
  const newlyCreatedUser = new User({

    username,
    email,
    password: hashedPassword, // Store the hashed password 
    role : role || 'user' // Default to 'user' if no role is provided
  });

  await newlyCreatedUser.save();  

  if (newlyCreatedUser) {
    res.status(201).json({
      success:true ,
      message: 'User registered successfully',
          })
  }
  else {
    res.status(500).json({ success: false , message: 'User registration failed' }); 
  }

  } catch (error) {
    console.log('Error in registerUser:', error);
    res.status(500).json({ success: false , message: 'Server error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Simulate user login logic
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Here we typically check the user credentials against a database
    // For this example, we will just return a success message
    res.status(200).json({ message: 'User logged in successfully', user: { username } });
    
  } catch (error) {
    console.log('Error in loginUser:', error);
    res.status(500).json({ success: false , message: 'Server error', error: error.message });
  }
}
