import Audit from "../models/audit.js";


const logActivity = async(user, logName, date, status, activity) => {
  try {
    const newLog = new Audit({
      user,
      logName,
      date,
      status,
      activity
    })

    const saveLog = await newLog.save();
    if(saveLog){
      res.json({status: true, message: "Audit log added",})
    }else{
      res.status(401).json({status: false, message: "problem adding audit log"});
    }
    
  } catch (err) {
    throw new Error(err)
  }
}

export default logActivity