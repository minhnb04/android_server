var express = require('express');
var router = express.Router();
const multer = require('multer');

const indexController = require('../config/controller/indexController')

const storage = multer.diskStorage({
    destination:(req, file, res)=>{
        res(null, 'uploads')
    },
    filename: (req, file, res)=>{
        res(null,Date.now()+'-'+file.originalname)
    }
})

var upload = multer({storage:storage});

/* GET home page. */
router.get('/', indexController.index);

router.post('/addCar', indexController.addCar);

router.post('/editCar/:id', indexController.editCar);

router.post('/deleteCar/:id', indexController.deleteCar);

router.get('/search', indexController.searchCar);

router.get('/getCar', indexController.getCar);


module.exports = router;
