const GetModel = require('../Models/dietplannermodel');

// CREATE Diet Plan
exports.create = async (req, res, next) => {
    try {
        const { Dietid, name, food, calories } = req.body;

        // Validation
        if (!Dietid || !name || !food || !calories) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if Dietid already exists (optional safety)
        const exist = await GetModel.findOne({ Dietid });
        if (exist) {
            return res.status(400).json({ message: "Dietid already exists" });
        }

        const Savedata = new GetModel({
            Dietid,
            name,
            food,
            calories
        });

        await Savedata.save();
        return res.status(201).json({ message: "Inserted Successfully", data: Savedata });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// GET All Diet Plans
exports.getall = async (req, res, next) => {
    try {
        const getall = await GetModel.find();

        if (!getall || getall.length === 0) {
            return res.status(404).json({ message: "No records found" });
        }

        return res.status(200).json({ message: "Data received successfully", data: getall });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// GET Single Diet Plan by Dietid
exports.getById = async (req, res, next) => {
    try {
        const { Dietid } = req.params;

        const getdata = await GetModel.findOne({ Dietid });

        if (!getdata) {
            return res.status(404).json({ message: "No record found" });
        }

        return res.status(200).json({ message: "Data received successfully", data: getdata });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// UPDATE Diet Plan by Dietid or id
exports.update = async (req, res, next) => {
    try {
        const { id, Dietid, name, food, calories } = req.body;

        if (!id && !Dietid) {
            return res.status(400).json({ message: "Either id or Dietid is required for update" });
        }

        const UpdateObj = {};
        if (Dietid) UpdateObj.Dietid = Dietid;
        if (name) UpdateObj.name = name;
        if (food) UpdateObj.food = food;
        if (calories) UpdateObj.calories = calories;

        // If id is provided, update by MongoDB's ObjectID (_id). If Dietid is provided, update by Dietid.
        const UpdateData = await GetModel.findOneAndUpdate(
            { $or: [{ _id: id }, { Dietid }] }, // Find by either id or Dietid
            UpdateObj,
            { new: true }
        );

        if (!UpdateData) {
            return res.status(404).json({ message: "Update failed, No record found with the provided id or Dietid" });
        }

        return res.status(200).json({ message: "Updated successfully", data: UpdateData });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// DELETE Diet Plan by Dietid or id
exports.remove = async (req, res, next) => {
    try {
        const { id, Dietid } = req.body;

        if (!id && !Dietid) {
            return res.status(400).json({ message: "Either id or Dietid is required for delete" });
        }

        // Delete by either id (MongoDB ObjectID) or Dietid
        const deletedata = await GetModel.findOneAndDelete(
            { $or: [{ _id: id }, { Dietid }] } // Find by either id or Dietid
        );

        if (!deletedata) {
            return res.status(404).json({ message: "Delete failed, No record found with the provided id or Dietid" });
        }

        return res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
