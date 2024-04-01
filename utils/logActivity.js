import Audit from "../models/audit.js";

const logActivity = async (res, user, logName, date, status, activity) => {
  try {
    const newLog = new Audit({
      user,
      logName,
      date,
      status,
      activity
    });

    const saveLog = await newLog.save();
    if (saveLog) {
      res.json({ status: true, message: "Audit log added" });
    } else {
      res.status(401).json({ status: false, message: "Problem adding audit log" });
    }
  } catch (err) {
    console.error("Error in logActivity:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export default logActivity;
