const { Router } = require('express');
const router = Router();
const { create, getById, update, getall, remove /*, ImageUpload*/ } = require('../Controllers/Allocatecontroller');

router.post('/create', create);
router.get('/getall', getall);
// router.get('/getById/:id', getById); // Uncomment if needed
router.post('/update', update);
router.post('/remove', remove);
// router.post('/ImageUpload', ImageUpload); // Uncomment if needed

module.exports = router;
