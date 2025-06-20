const GetModel = require('../Models/Allocatemodel');
const path = require('path');

exports.create = async (req, res, next) => {
    try {
        const { Trainername, Membername, Date } = req.body;
        const savedData = new GetModel({ Trainername, Membername, Date });
        await savedData.save();
        return res.status(201).json({ message: "Inserted Successfully...", data: savedData });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

exports.getall = async (req, res, next) => {
    try {
        const allData = await GetModel.find();
        if (!allData || allData.length === 0) {
            return res.status(404).json({ message: "No Records found.." });
        }
        return res.status(200).json({ message: "Data Received Successfully...", data: allData });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getData = await GetModel.findById(id);

        if (!getData) {
            return res.status(404).json({ message: "No Records found" });
        }

        return res.status(200).json({ message: "Data Received Successfully..", data: getData });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id, Trainername, Membername, Date } = req.body;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ message: "ID is required for updating" });
        }

        const updateObj = {};
        if (Trainername) updateObj.Trainername = Trainername;
        if (Membername) updateObj.Membername = Membername;
        if (Date) updateObj.Date = Date;

        const updatedData = await GetModel.findByIdAndUpdate(id, updateObj, { new: true });
        if (!updatedData) {
            return res.status(404).json({ message: "Not Updated..." });
        }
        return res.status(200).json({ message: "Updated Successfully..", data: updatedData });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID is required to delete" });
        }

        const deletedData = await GetModel.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({ message: "Not Deleted..." });
        }
        return res.status(200).json({ message: "Deleted Successfully.." });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

// Uncomment ImageUpload functionality if you need it
// exports.ImageUpload = async (req, res, next) => {
//     try {
//         let uploadFileName = "";
//         const filePath = path.join(__dirname + '/Data/Image');
//         const uploadStorage = multer.diskStorage({
//             destination: filePath,
//             filename: (req, file, cb) => {
//                 const originalName = file.originalname;
//                 const extension = path.extname(originalName);
//                 const uniqueSuffix = Date.now();
//                 const newFileName = path.basename(originalName, extension) + '_' + uniqueSuffix + extension;
//                 uploadFileName = '/api/Data/Image/' + newFileName;
//                 cb(null, newFileName);
//             }
//         });

//         const upload = multer({ storage: uploadStorage }).single('image');

//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(404).json({ message: "Error Uploading file.." });
//             }
//             return res.status(200).json({ message: "Image Uploaded Successfully..", imageUploaded: uploadFileName });
//         });
//     } catch (err) {
//         return res.status(404).json({ message: err.message });
//     }
// };
