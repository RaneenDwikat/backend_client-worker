
var User = require('../models/user')
var Worker = require('../models/workers')
var Manager = require('../models/manager')
var Category = require('../models/category')
var Serice = require('../models/service')
var order = require('../models/order')

var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const res = require('express/lib/response') 
const category = require('../models/category')

var functions = {
    addNew: function (req, res) {
        console.log(req.body.password);
        console.log(req.body.phonenumber);
        console.log(req.body.name);
       // User.find({name:req.body.name},)
        if ((!req.body.name) || (!req.body.password)|| (!req.body.phonenumber)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {

            var newUser = User({
                role : "user",
                name: req.body.name,
                password: req.body.password,
                phonenumber: req.body.phonenumber
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },
    addNewWorker: function (req, res) {
        console.log(req.body.password);
        console.log(req.body.phonenumber);
        console.log(req.body.name);
        console.log(req.body.category);
        console.log(req.body.region);


        if ((!req.body.name) || (!req.body.password)|| (!req.body.phonenumber)|| (!req.body.category)|| (!req.body.region)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newWorker = Worker({
                role : "worker",
                name: req.body.name,
                password: req.body.password,
                phonenumber: req.body.phonenumber,
                category: req.body.category,
                region: req.body.region,
            });
            newWorker.save(function (err, newWorker) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },
    addNewManager: function (req, res) {
        console.log(req.body.password);
        console.log(req.body.phonenumber);
        console.log(req.body.name);
        if ((!req.body.name) || (!req.body.password)|| (!req.body.phonenumber)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newManager = Manager({
                role : "manager",
                name: req.body.name,
                password: req.body.password,
                phonenumber: req.body.phonenumber,
            });
            newManager.save(function (err, newManager) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },
    addNewService: function (req, res) {
        if ((!req.body.catname) || (!req.body.service)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newServ = Serice({
                role : "service",
                catname: req.body.catname,
                service: req.body.service,
                price: req.body.price,
                description: req.body.description,
                estimatedTime: req.body.estimatedTime,
                Img: req.body.Img,
            });
            newServ.save(function (err, newServ) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },
    addNewOrder: function (req, res) {
        console.log(req.body.name);
        console.log(req.body.time);
        console.log(req.body.service);
        console.log(req.body.address);
        console.log(req.body.category);
        if ((!req.body.name) || (!req.body.category)|| (!req.body.service)||
         (!req.body.address) || (!req.body.time) || (!req.body.worker)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var neworder = order({
                clientname: req.body.name,
                service: req.body.service,
                category: req.body.category,
                time: req.body.time,
                worker:req.body.worker,
                address: req.body.address,
                status:"pending"
            });
            neworder.save(function (err, neworder) {
                if (err) {
                    res.send({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.send({ success: true, msg: 'Successfully saved' })
                }
            })        }
    },
    authenticatem: function (req, res) {
        Manager.findOne({
            name: req.body.name
        }, function (err, manager) {
            if (err) throw err
            if (!manager) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }

            else {
                manager.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(manager, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },
    authenticatew: function (req, res) {
        Worker.findOne({
            name: req.body.name
        }, function (err, worker) {
            if (err) throw err
            if (!worker) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }

            else {
                worker.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(worker, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },
    
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }

            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },
    getlocation: function (req , res) {
        console.log(req.params.name )

        User.findOne({name: req.params.name},(error,data)=>{
            if (error) throw error;
            console.log(data)
            return res.json({msg: data.region + " , " + data.address})
        })
    },
    savelocation: function (req , res) {
        
        User.findOneAndUpdate(
            { name: req.body.name }, { latitude: req.body.latitude, longitude: req.body.longitude, region: req.body.region,address:req.body.address },
             (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                }
            }
        )
        console.log("you are in updated function");
        return res.send({ status: "updated" });
    },  
    d_user: function (req) {
        User.findOneAndDelete(
            { name: req.body.name }, (err) => {
                console.log(err);
            }
        )
        console.log("deleted successfully");
        return res.send({ status: "deleted" });
    },
 
    d_worker: function (req) {
        Worker.findOneAndDelete(
            { name: req.body.name }, (err) => {
                console.log(err);
            }
        )
        console.log("deleted successfully");
        return res.send({ status: "deleted" });
    },
    getcategory: function (req , res) {
        Category.find({},{name:1,image:1},(error,data)=>{
            if (error) throw error;
            console.log(data)
            return res.json(data)
        })
    },
    getservice: function (req , res) {
        Serice.find({},(error,data)=>{
            if (error) throw error;
            console.log(data)
            return res.json(data)
        })
    },
    getorder: function (req , res) {
        console.log(req.body.clientname);

        order.find({clientname: req.params.clientname,$nor:[{status:"ratted"}, {status:"cancellled"}]},(error,data)=>{
            if (error) throw error;
            console.log(data)
            return res.json(data)
        })
    } ,
    cancelrequest: function (req , res) {
        
        order.findOneAndUpdate(
            { _id:req.params._id }, { status:"cancellled" },
             (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                }
            }
        )
        console.log("you are in updated function");
        return res.send({ status: "cancelled" });
    },
    getspacificorder: function (req , res) {
        console.log(req.params.name )
         order.findOne({_id: req.params._id},(error,data)=>{
            if (error) throw error ;
            console.log(data)
            return res.json({worker:data.worker,time: data.time ,address: data.address ,service: data.service ,category: data.category,})

        })
    },
     getworkernameandphonenumber:function (req , res) {
        console.log(req.params.name )
        Worker.findOne({_id: req.params._id},(error,data)=>{
            if (error) throw error ;
            console.log(data)
            return res.json({name: data.name ,phonenumber: data.phonenumber})

        })
    },
    rateorder: function (req , res) {
        
        order.findOneAndUpdate(
            { _id: req.params._id }, {rating:req.body.rating,status:"ratted"},
             (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                }
            }
        )
        console.log("you are in updated function");
        return res.send({ status: "ratted" });
    },
    getworkers:function (req , res) {
        console.log(req.params.category);

        Worker.find({category: req.params.category,region:req.params.region},(error,data)=>{
            if (error) throw error;
            console.log(data)
            return res.json(data)
        })
    },
    addtimeforworker: function (req , res) {
        console.log("req.params._id");
        console.log(req.body.time)
         Worker.findOneAndUpdate({_id:req.params._id},{$push:{time:req.body.time}},
             (error, data) => {
                if (error) {
                    console.log(error);
                } else { 
                    console.log(data); 
                }
            }
        )
        console.log("you are in updated function");
        return res.send({ status: "updated"   }); 
    },
    getworkerinfo: function (req , res) {
        Worker.findOne(
            { name: req.params.name },
             (error, data) => {
                if (error) throw error
                console.log(data);
                return res.json({region: data.region ,phonenumber: data.phonenumber ,category: data.category,});

            }
        )
        console.log("you are in updated function");
    },  
    updateworkerinfo:function (req , res) {
            Worker.findOne({
                phonenumber: req.params.phonenumber
            }, function (err, worker) {
                if (err) throw err
                    worker.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(worker, config.secret)
                         //   res.json({ success: true, token: token })
                            if(!req.body.category){
                                Worker.findOneAndUpdate(
                                    { phonenumber: req.params.phonenumber }, { 
                                        name: req.body.name,  region: req.body.region },
                                     (error, data) => {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log(data); 
                                        }
                                    }
                                )
                                console.log("you are in updated function");
                                return res.send({ msg: "updated",token:token });}
                                else{
                                    Worker.findOneAndUpdate(
                                        { phonenumber: req.params.phonenumber }, { 
                                            name: req.body.name,  region: req.body.region,category:req.body.category },
                                         (error, data) => {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log(data);
                                            }
                                        } 
                                    )
                                    console.log("you are in updated function");
                                    return res.send({ msg: "updated" ,token:token });
                                }
                        }
                        else {
                            return res.status(403).send({ success: false, msg: 'Authentication failed, enter password' })
                        }
                    })
                
            }
            )
           
    },   
    getworkerid:function (req , res) {
        console.log(req.params.name )
        Worker.findOne({name: req.params.name},(error,data)=>{
            if (error) throw error ;
            console.log(data)
            return res.json({_id: data._id})

        })
    },
    getworkerorders: function (req , res) {
        console.log(req.body.worker);

        order.find({worker: req.params.worker,$nor:[{status:"ratted"}, {status:"cancellled"}, {status:"قيد الانتظار"}]},(error,data)=>{
            if (error) throw error;
            console.log(data)
            return res.json(data)
        })
    } ,
    acceptrequest: function (req , res) {
        
        order.findOneAndUpdate(
            { _id:req.params._id }, { status:"قيد الانتظار" },
             (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                }
            }
        )
        console.log("you are in updated function");
        return res.send({ status: "قيد الانتظار" });
    }, 
    getclientnameandphonenumber:function (req , res) {
        console.log(req.params.name )
        User.findOne({name: req.params.name},(error,data)=>{
            if (error) throw error ;
            console.log(data)
            return res.json({phonenumber: data.phonenumber,longitude:data.longitude,latitude:data.latitude})

        })
    }, 
    getassignedorder: function (req , res) {
        console.log(req.body.worker);

        order.find({worker: req.params.worker,$nor:[{status:"ratted"}, {status:"cancellled"}, {status:"pending"}]},(error,data)=>{
            if (error) throw error;
            console.log(data)
            return res.json(data)
        })
    },
}


module.exports = functions