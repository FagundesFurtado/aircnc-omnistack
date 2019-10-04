const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')

const sessionControler = require('./controller/SessionController')
const spotController = require('./controller/SpotController')
const dashboardController = require('./controller/DashboardController')
const bookingController = require('./controller/BookingController')

const approvalController = require("./controller/ApprovalController")
const rejectionController = require("./controller/RejectionController")

const routes = express.Router();

const upload = multer(uploadConfig)


routes.post("/sessions", sessionControler.store);
routes.post("/spots", upload.single('thumbnail'), spotController.store);
routes.get("/spots", spotController.index);
routes.get("/dashboard", dashboardController.show);


routes.post("/spots/:spot_id/bookings", bookingController.store);


routes.get('/bookings/:spot_id', bookingController.show);
routes.post('/bookings/:booking_id/approvals', approvalController.store);
routes.post('/bookings/:booking_id/rejections', rejectionController.store);

module.exports = routes