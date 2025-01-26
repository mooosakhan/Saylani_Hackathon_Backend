import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Admin
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Save the admin to the database
        await newAdmin.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with token
        res.status(201).json({
            message: 'Admin registered successfully',
            admin: newAdmin,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin', error: error.message });
    }
};

// Admin Login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with token
        res.status(200).json({
            message: 'Login successful',
            admin,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
