const {Router} =require('express')

const router =Router()

 const {create,getById,update,getall,remove/*,ImageUpload*/} =require('../Controllers/addmembercontroller')

router.post('/create',create)
router.get('/getall',getall)
router.get('/getById/:id',getById)
router.post('/update',update)
router.post('/remove',remove)
// router.post('/ImageUpload',ImageUpload)

module.exports =router