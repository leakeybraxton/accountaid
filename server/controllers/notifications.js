const Company = require("../models/company");
const Logs = require("../models/logs");

//function to fetch notifications
async function fetchNotifications(req, res) {
  const userData = req.query.userData;
  const { company_no, department } = userData;

  if (!company_no) {
    return res.status(404).json({ error: "Company no required" });
  }

  try {
    const existingCompany = await Company.findOne({ company_no });

    if (!existingCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    const notificationsForDepartment = existingCompany.notifications.filter(
      (notification) => notification.department == department
    );

    const notificationNumber = notificationsForDepartment;

    res.json(notificationNumber);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function approveLpo(req, res) {
  const { userData, lpo_no, deleteId } = req.query;
  const { company_no, username, user_id } = userData;
  const unique_id = lpo_no;
  const doc_type = "LPO";
  const heading = "LPO Approval";
  const today = new Date();
  const department = "Retail";
  let action;
  let status;

  if (!company_no) {
    return res.status(404).json({ error: "Company no required" });
  }

  try {
    const company = await Company.findOne({ company_no });

    if (!company) {
      return res
        .status(400)
        .json({ error: "Problem with finding the company" });
    }

    const existingLpo = company.lpos.find((lpo) => lpo.lpo_no === lpo_no);

    const supplier = existingLpo.supplier;

    if (userData.department == "Admin") {
      action = `${username} Approved LPO number ${lpo_no} for ${supplier}`;
      status = 3;
    } else if (userData.department == "Retail") {
      action = `${username} Viewed approval for LPO number ${lpo_no} for ${supplier}`;
      status = 3;
    }

    const logData = new Logs({
      company_no,
      user_id,
      action,
      unique_id,
      doc_type,
    });

    const newNotification = {
      user_id,
      username,
      heading,
      body: action,
      date: today,
      status: 1,
      type: doc_type,
      unique_id: lpo_no,
      department,
    };

    const updatedCompany = await Company.findOneAndUpdate(
      { company_no },
      { $pull: { notifications: { _id: deleteId } } },
      { new: true } // Return the updated document
    );

    const updatedLpo = await Company.findOneAndUpdate(
      { company_no, "lpos.lpo_no": lpo_no },
      { $set: { "lpos.$.status": status } },
      { new: true } // Return the updated document
    );

    if (!updatedCompany) {
      console.log(updatedCompany);
      return res.status(404).json({ error: "Notification not deleted" });
    }

    if (userData.department == "Admin") {
      company.notifications.push(newNotification);
      await logData.save();
      await company.save();
    } else if (userData.department == "Retail") {
      await logData.save();
      await company.save();
    }

    // Emit an LPO approved event to all connected clients
    req.io.emit("lpoApproved", { lpo_no, status });

    res.json("Lpo Approved");
  } catch (error) {
    console.error("Error approving LPO:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  fetchNotifications,
  approveLpo,
};
