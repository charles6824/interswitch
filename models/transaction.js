import mongoose from 'mongoose'

const transactionSchema = mongoose.Schema(
  {
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction