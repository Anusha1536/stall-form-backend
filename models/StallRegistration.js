import mongoose from "mongoose"

const stallRegistrationSchema = new mongoose.Schema(
    {
        participantName: {
            type: String,
            required: true,
            trim: true,
        },

        teammates: [
            {
                type: String,
                trim: true,
            },
        ],

        classDivision: {
            type: String,
            required: true,
            trim: true,
        },

        contactNumber: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/,
        },

        numberOfBenches: {
            type: Number,
            required: true,
            min: 1,
        },

        category: [
    {
        type: String,
        enum: [
            "Food & Beverage",
            "Games",
            "Talent Service",
            "Product Sale",
            "Others",
        ],
    },
],

        stallDescription: {
            type: String,
            required: true,
            trim: true,
        },

        facultyApproval: {
            type: Boolean,
            default: false,
        },

        lastSubmissionDate: {
            type: Date,
            default: new Date("2026-03-02"),
        },

        submissionDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const stallRegistration = mongoose.model(
    "StallRegistration",
    stallRegistrationSchema
);

export default stallRegistration;