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
