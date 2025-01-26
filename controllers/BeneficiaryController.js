import Beneficiary from '../models/Beneficiary.js';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

export const registerBeneficiary = async (req, res) => {
    try {
        const { CNIC, Phone, Name, Address, PurposeOfVisit } = req.body;

        // Generate a unique ID
        const uniqueId = uuidv4();

        // Create a new user
        const newBeneficiary = new Beneficiary({
            CNIC,
            Phone,
            Name,
            Address,
            PurposeOfVisit,
            uniqueId
        });

        // Save the user to the database
        await newBeneficiary.save();

        // Generate a QR code
        const qrCodeData = await QRCode.toDataURL(uniqueId);

        // Send the user data and QR code in the response
        res.status(201).json({ message: 'Beneficiary registered successfully', Beneficiary: newBeneficiary, qrCode: qrCodeData });
    } catch (error) {
        res.status(500).json({ message: 'Error registering beneficiary', error: error.message });
    }
};

export const getAllBeneficiaries = async (req, res) => {
    try {
        // Retrieve all beneficiaries from the database
        const beneficiaries = await Beneficiary.find();

        // Check if there are any beneficiaries
        if (!beneficiaries || beneficiaries.length === 0) {
            return res.status(404).json({ message: 'No beneficiaries found' });
        }

        // Send the list of beneficiaries in the response
        res.status(200).json({ message: 'Beneficiaries retrieved successfully', beneficiaries });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving beneficiaries', error: error.message });
    }
};

export const updateBeneficiary = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Find the beneficiary by ID and update
        const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Validate the data before updating
        });

        // Check if the beneficiary exists
        if (!updatedBeneficiary) {
            return res.status(404).json({ message: 'Beneficiary not found' });
        }

        // Send the updated beneficiary in the response
        res.status(200).json({ message: 'Beneficiary updated successfully', beneficiary: updatedBeneficiary });
    } catch (error) {
        res.status(500).json({ message: 'Error updating beneficiary', error: error.message });
    }
};

export const deleteBeneficiary = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the beneficiary by ID and delete
        const deletedBeneficiary = await Beneficiary.findByIdAndDelete(id);

        // Check if the beneficiary exists
        if (!deletedBeneficiary) {
            return res.status(404).json({ message: 'Beneficiary not found' });
        }

        // Send a success message in the response
        res.status(200).json({ message: 'Beneficiary deleted successfully', beneficiary: deletedBeneficiary });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting beneficiary', error: error.message });
    }
};

export const scanQRCode = async (req, res) => {
    try {
        const { uniqueId } = req.params;

        // Find the user by unique ID
        const beneficiary = await Beneficiary.findOne({ uniqueId });
        if (!beneficiary) return res.status(404).json({ message: 'Beneficiary not found' });

        // Send the user data in the response
        res.status(200).json({ message: 'Beneficiary found', beneficiary });
    } catch (error) {
        res.status(500).json({ message: 'Error scanning QR code', error: error.message });
    }
};
