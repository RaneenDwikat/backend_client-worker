const express = require('express')
const actions = require('../methods/actions')
const user = require('../models/user')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

router.post('/addworker',actions.addNewWorker)
router.post('/addmanager',actions.addNewManager)
router.post('/adduser',actions.addNew)
router.post('/addservice',actions.addNewService)
router.post('/addorder',actions.addNewOrder)
//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)
router.post('/authenticatem', actions.authenticatem)
router.post('/authenticatew', actions.authenticatew)

//@desc Get info on a user
//@route GET /getinfo
router.get('/getlocation/:name', actions.getlocation)
//save reg, lat,long to database
router.put('/savelocation',actions.savelocation)
//delete user
router.delete('/d_user',actions.d_user)
//delete worker
router.delete('/d_worker',actions.d_worker)
//get dynamic category client home page
router.get('/getcategory', actions.getcategory)
//get dynamic services according to its category
router.get('/getservice', actions.getservice)
//get client's order in booking
router.get('/getorder/:clientname', actions.getorder)
//client cancel his order request
router.put('/cancelrequest/:_id',actions.cancelrequest)
//get spacific order according id
router.get('/getspacificorder/:_id', actions.getspacificorder)
router.get('/getworkernameandphonenumber/:_id', actions.getworkernameandphonenumber)
//client set rate for a completed service
router.put('/rateorder/:_id',actions.rateorder) 
//get workers according their category and region
router.get('/getworkers/:category/:region', actions.getworkers)
//push a new time for array of time in worker
router.put('/addtimeforworker/:_id',actions.addtimeforworker)
//get worker info from profile page
router.get('/getworkerinfo/:name',actions.getworkerinfo)
//update worker info in profile page
router.put('/updateworkerinfo/:phonenumber',actions.updateworkerinfo)
//get id of worker using name
router.get('/getworkerid/:name', actions.getworkerid)
//get workers pending orders
router.get('/getworkerorders/:worker', actions.getworkerorders)
//worker accept request
router.put('/acceptrequest/:_id',actions.acceptrequest)
//get client phonenumber
router.get('/getclientnameandphonenumber/:name', actions.getclientnameandphonenumber)
//get workers assigned and completed orders
router.get('/getassignedorder/:worker', actions.getassignedorder)

module.exports = router