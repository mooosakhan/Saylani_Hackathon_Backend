import mongoose from 'mongoose';

const BeneficiarySchema = new mongoose.Schema(
    {
        CNIC: {
            type: String,
            required: [true, 'CNIC is required'],
            unique: true,
            trim: true,
        },
        Phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        Name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        Address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true,
        },
        Status: {
            type: String,
            enum: ['Pending', 'Completed'],
            trim: true,
            default : 'Pending', 
        },
        PurposeOfVisit: {
            type: String,
            required: [true, 'Purpose of visit is required'],
            enum: ['financial aid', 'medical assistance', 'education support', 'food support', 'other'],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Beneficiary', BeneficiarySchema);