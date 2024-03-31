import asyncHandler from "express-async-handler";
import { decryptData } from "../utils/decrypt.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import randomstring from "randomstring";
import Account from "../models/account.js";
import logActivity from "../utils/logActivity.js";

const registerUser = asyncHandler(async (req, res) => {
	try {
		const decryptedPayload = decryptData(req.body.payload);
		const { formData } = decryptedPayload;

		const userExist = await User.findOne({ email: formData.email });
		if (userExist) {
			res.json({ status: false, message: "User already exists", data: null });
		} else {
			const newUser = await new User({
				fullName: formData.fullName,
				userName: formData.userName,
				email: formData.email,
				password: await bcrypt.hash(formData.password, 10),
				mobile: formData.mobile,
			});

			const saveUser = await newUser.save();
			if (saveUser) {
				let accountNumber;
				let existingAccount;

				do {
					const randomNumber = randomstring.generate({
						length: 7,
						charset: "numeric",
					});

					accountNumber = "400" + randomNumber;

					existingAccount = await Account.findOne({ accountNumber });
				} while (existingAccount);

				const newAccount = new Account({
					user: saveUser._id,
					currency: formData.currency ? formData.currency : "NGN",
					accountNumber,
				});

				const saveAccount = await newAccount.save();

				await User.findByIdAndUpdate(
					saveUser._id,
					{ accountNumber: accountNumber },
					{ new: true, useFindAndModify: false }
				);

				const response = {
					accountDetails: saveAccount,
					userDetails: saveUser,
				};
				const currentDate = new Date();
				logActivity(
					saveUser._id,
					"Account Creation",
					currentDate,
					"successful",
					"Account Creation initiated Successfully"
				);

				res.json({
					status: true,
					message: "User created successfully",
					data: response,
				});
			} else {
				const currentDate = new Date();
				logActivity(
					saveUser._id,
					"Account Creation",
					currentDate,
					"failed",
					"Account Creation Failed"
				);
				res.json({
					status: false,
					message: "unable to create User, please contact Admin",
					data: null,
				});
			}
		}
	} catch (err) {
		res.status(500).json({ status: false, message: err.message });
	}
});

const authUser = asyncHandler(async (req, res) => {
	try {
		const decryptedPayload = decryptData(req.body.payload);
		const { formData } = decryptedPayload;

		const user = await User.findOne({
			$or: [
				{ email: formData.email },
				{ userName: formData.userName },
				{ accountNumber: formData.accountNumber },
			],
		});

		if (!user) {
			return res
				.status(404)
				.json({ status: false, message: "User not found", data: null });
		}

		const confirmPassword = bcrypt.compareSync(
			formData.password,
			user.password
		);

		if (confirmPassword) {
			user.lastLogin.push(new Date());
			await user.save();

			const userDetails = {
				fullName: user.fullName,
				email: user.email,
				userName: user.userName,
				mobile: user.mobile,
				isAdmin: user.isAdmin,
				lastLogin: user.lastLogin[user.lastLogin.length - 1],
			};

			const accountDetails = await Account.findById(user._id);

			const response = {
				token: generateToken(user._id),
				userDetails,
				accountDetails,
			};

			const currentDate = new Date();

			logActivity(
				user._id,
				"Login",
				currentDate,
				"successful",
				"Login initiated Successfully"
			);

			res.json({ status: true, message: "Login Successful", data: response });
		} else {
			const currentDate = new Date();
			logActivity(
				user._id,
				"Login",
				currentDate,
				"failed",
				"Login initiation failed"
			);
			res.json({ status: false, message: "Wrong Credentials", data: null });
		}
	} catch (err) {
		res.status(500).json({ status: false, message: err.message });
	}
});

export { registerUser, authUser };
