const router = require('express').Router();
const FileController = require('../controllers/file.controller');
const uploader = require('../middelware/uploads')

router.post('/weather-categories-image',  uploader("image", 20, "weatherCategories").single("file"), FileController.uploadFile);

router.post('/risk-and-response-image',  uploader("image", 20, "riskAndResponse").single("file"), FileController.uploadFile);

router.post('/seasonal-forecast',  uploader("document", 20, "seasonalForecast").single("file"), FileController.uploadFile);


// router.post('/gallery-image', uploader("image", 20, "galleryImage").array("file",15), FileController.uploadMultipleFiles);

module.exports = router;




