const UserModel = require('../models/user.model');
const UsersRoutes = require('express').Router();


// Get All Users - Work!
UsersRoutes.get('/', async (req, res) => {
    try {
        let data = await UserModel.FindAllUsers();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});



// Get All Regulators - Work!
UsersRoutes.get('/regulators', async (req, res) => {
    try {
        let data = await UserModel.FindAllRegulators();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});


// Get All Reasercher - Work!
UsersRoutes.get('/reaserchers', async (req, res) => {
    try {
        let data = await UserModel.FindAllReasercher();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});



// Add New User From Register
//working
UsersRoutes.post('/Register', async (req, res) => {
    try {
        let { firstName,lastName,email,password,phone,address,role,smoke,img,IsActive } = req.body;
        let data = await UserModel.InsertUser(firstName,lastName,email,password,phone,address,role,smoke,img,IsActive);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});


// Add New User From role
UsersRoutes.post('/add/:role', async (req, res) => {
    try {
        let { role } = req.params;
        let { firstName,lastName,email,password,phone,img } = req.body;
        let data = await UserModel.InsertRole(firstName,lastName,email,password,phone,role,img,true);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});



UsersRoutes.post('/Login', async (req, res) => {
    try {
        await console.log('1 :>> ');
        let { email,password } =  await req.body;
        await console.log('e :>> '+ email + ' p :>> ' + password);
        let data = await UserModel.Login(email,password);
        res.status(200).json(data);
        await console.log('3 :>> ');
    } catch (error) {
        res.status(500).json({ error });
    }
});
UsersRoutes.put('/:id', async (req, res) => {
    try {
        let { email,password } = req.params;
        let data = await UserModel.UpdateUser(email,password);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
//Add ObjectId
UsersRoutes.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let data = await UserModel.DisableUser(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});



module.exports = UsersRoutes;