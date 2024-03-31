import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		accountType: { type: String, default: "Savings", required: true },
		accountNumber: { type: String, required: true },
		currency: { type: String, required: true },
		balance: { type: Number, default: 0, required: true },
		accountLevel: { type: String, default: "Tier 1", required: true },
		accountStatus: { type: String, enum: ["Active", "Inactive", "Suspended", "Frozen", "Blocked"], required: true, default: "Active" },
		bvn: { type: String },
	},
	{
		timestamps: true,
	}
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
