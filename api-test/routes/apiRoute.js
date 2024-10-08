const express = require('express');
const auth = require('../middleware/apiAuth')
const router = express.Router();
const User = require('../model/apiModel');


router.post('/users/create', async  (req,res) => {
    try {
        const user = new User(req.body);
        await user.validate()
        await user.save();
        res.status(200).json({ message: 'User Created Successfully' })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken()
        res.send({user,token});
    }   
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
});
router.get('/users', auth ,async (req,res)=>{
    try {
        const user = await User.find();
        res.send(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
});
router.get('/users/:id',auth, async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
});
router.delete('/users/:id',auth, async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: "User not Found" })
        } else {
            res.status(200).json({ message: 'User Deleted Successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
);
router.put('/users/:id',auth,async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id, req.body)
        if (!user) {
            res.status(404).json({ message: 'User not Found' })
        }
        const updateUser = await User.findById(user);
        res.status(200).json({ updateUser, message: 'User update' })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});


module.exports = router