// const multer = require('multer')
const GetModel =require('../Models/addtrainermodel')
const path =require('path')

exports.createtrainer = async(req,res,next)=>{
    // console.log("Request body:", req.body);
    try{

        
        const {name,mobileno,email,salary}=req.body
        const Savedata = new GetModel({name,mobileno,email,salary})
        await Savedata.save()
        return res.status(201).json({message:"Inserted Successfully...",data:Savedata})
    }
    catch(err){
        return res.status(404).json({message:err.message})
    }
}

exports.getall =async(req,res,next)=>{
    try{
        const getall = await GetModel.find()
        if(!getall){
            return res.status(201).json({message:"No Records found.."})
        }
        return res.status(200).json({message:"Data Received Successfully...",data:getall})
    }
    catch(err){
        return res.status(404).json({message:err.message})
    }
}

exports.getById =async(req,res,next)=>{
    try{
        const {id} =req.params
        const getdata = await GetModel.findById(id)

        if(!getdata){
            return res.status(404).json({message:"No Records found"})
        }

        return res.status(200).json({message:"Data Received Successfully..",data:getdata})
    }
    catch(err){
        return res.status(404).json({message:err.message})
    }
}

exports.update =async(req,res,next)=>{
    try{
        const{id,name,mobileno,email,salary} =req.body

        const UpdateObj ={};
        if(name)  UpdateObj.name =name
        if(mobileno) UpdateObj.mobileno=mobileno
        if(email) UpdateObj.email=email
        if(salary) UpdateObj.salary=salary

        const UpdateData = await GetModel.findByIdAndUpdate(id,UpdateObj,{new:true})
        if(!UpdateData){
            return res.status(404).json({message:"Not Updated..."})
        }
        return res.status(201).json({message:"Updated Successfully..",data:UpdateData})
    }
    catch(err){
        return res.status(404).json({message:err.message})
    }
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
//                  UploadFileName ='/api/Data/Image/' + newfilename
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