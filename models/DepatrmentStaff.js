import mongoose from 'mongoose';

const DepartmentStaffSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: [String], // For example: ['Admin', 'Teacher', 'Support Staff']
      default: [],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model('DepartmentStaff', DepartmentStaffSchema);
