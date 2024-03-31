import mongoose from "mongoose";

const auditSchema = mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		logName: { type: String, required: true },
		date: { type: Date, required: true },
		status: { type: String, enum: ["successful", "failed"], required: true },
		activity: { type: mongoose.Schema.Types.Mixed, required: true },
	},
	{
		timestamps: true, 
	}
);

const Audit = mongoose.model("Audit", auditSchema);

export default Audit;
