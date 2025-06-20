const multer = require('multer');
const GetModel = require('../Models/addmembermodel');
const path = require('path');
const fs = require('fs');

exports.create = async (req, res, next) => {
    let UploadFileName = "";
    const filepath = path.join(__dirname, 'Data', 'Image');

    // Create directory if it doesn't exist
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
    }

    const UploadStorage = multer.diskStorage({
        destination: filepath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const Extension = path.extname(originalname);
            const UniqueSuffix = Date.now();
            const newfilename = path.basename(originalname, Extension) + '_' + UniqueSuffix + Extension;
            UploadFileName = '/member/Data/Image/' + newfilename;
            cb(null, newfilename);
        }
    });

    const Upload = multer({ storage: UploadStorage }).single('image');

    Upload(req, res, async function (err) {
        if (err) {
            return res.status(404).json({ command: "Error Uploading file.." });
        }

        try {
            const { name, age, weight, gender, address,image } = req.body;
            const Savedata = new GetModel({
                name,
                age,
                weight,
                gender,
                address,
                image: UploadFileName // use uploaded image path
            });

            await Savedata.save();
            return res.status(201).json({ message: "Inserted Successfully...", data: Savedata });
        } catch (err) {
            return res.status(404).json({ message: err.message });
        }
    });
};

exports.getall = async (req, res, next) => {
    try {
        const getall = await GetModel.find();
        if (!getall || getall.length === 0) {
            return res.status(201).json({ message: "No Records found.." });
        }
        return res.status(200).json({ message: "Data Received Successfully...", data: getall });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getdata = await GetModel.findById(id);

        if (!getdata) {
            return res.status(404).json({ message: "No Records found" });
        }

        return res.status(200).json({ message: "Data Received Successfully..", data: getdata });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};


exports.update =async(req,res,next)=>{
    
    let UploadFileName = "";
    const filepath = path.join(__dirname, 'Data', 'Image');

    // Create directory if it doesn't exist
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
    }

    const UploadStorage = multer.diskStorage({
        destination: filepath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const Extension = path.extname(originalname);
            const UniqueSuffix = Date.now();
            const newfilename = path.basename(originalname, Extension) + '_' + UniqueSuffix + Extension;
            UploadFileName = '/member/Data/Image/' + newfilename;
            cb(null, newfilename);
        }
    });

    const Upload = multer({ storage: UploadStorage }).single('image');

    Upload(req, res, async function (err) {
        if (err) {
            return res.status(404).json({ command: "Error Uploading file.." });
        }

        try {
            const{id,name,age,weight,gender,address,image} =req.body

            const UpdateObj ={};
            if(name)  UpdateObj.name =name
            if(age) UpdateObj.age=age
            if(weight) UpdateObj.weight=weight
            if(gender) UpdateObj.gender=gender
            if(address) UpdateObj.address=address
            
            if (req.file) {
                UpdateObj.image = UploadFileName;
            } else if (image) {
                // ✅ Otherwise, use the existing image from body
                UpdateObj.image = image;
            }
    
            const UpdateData = await GetModel.findByIdAndUpdate(id,UpdateObj,{new:true})
            if(!UpdateData){
                return res.status(404).json({message:"Not Updated..."})
            }
            return res.status(201).json({message:"Updated Successfully..",data:UpdateData})
        } catch (err) {
            return res.status(404).json({ message: err.message });
        }
    });

}

exports.remove =async(req,res,next)=>{
    try{
        const {id} =req.body
        const deletedata = await GetModel.findByIdAndDelete(id)
        if(!deletedata){
            return res.status(404).json({message:"Not Deleted..."})
        }
        return res.status(201).json({message:"Deleted Successfully.."})
    }
    catch(err){
        return res.status(404).json({message:err.message})
    }
 }

// exports.ImageUpload =async(req,res,next)=>{
//     try{
//         let UploadFileName="";
//         const filepath = path.join(__dirname +'/Data/Image')
//         const UploadStorage = multer.diskStorage({
//             destination:filepath,
//             filename:(req,file,cb)=>{
//                  const originalname = file.originalname;
//                  const Extension = path.extname(originalname);
//                  const UniqueSuffix = Date.now()
//                  const newfilename = path.basename(originalname,Extension) + '_' + UniqueSuffix + Extension
//                  UploadFileName ='/abi/Data/Image/' + newfilename
//                  cb(null,newfilename)

//             }
//         })

//         const Upload =multer({storage:UploadStorage},).single('image')

//         Upload(req,res,async function (err) {
//             if(err){
//                 return res.status(404).json({command:"Error Uploading file.."})
//             }
//             return res.status(200).json({message:"Image Uploaded Successfully..",ImageUploaded:UploadFileName})
//         })
//     }
//     catch(err){
//         return res.status(404).json({message:err.message})
//     }
// }