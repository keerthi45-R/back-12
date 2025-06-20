const {Router} =require('express')

const router =Router()

 const {createtrainer,getById,update,getall,remove/*,ImageUpload*/} =require('../Controllers/addtrainercontroller')

router.post('/createtrainer',createtrainer)
router.get('/getall',getall)
router.get('/getById/:id',getById)
router.post('/update',update)
router.post('/remove',remove)
// router.post('/ImageUpload',ImageUpload)

module.exports =router