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
// working
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


/*UsersRoutes.post('/FindbyEmail', async (req, res) => {
    try {
        let {email} = req.body;
        console.log('2 :>> ', email);
        let data = await UserModel.FindbyEmail(email);
        console.log('data :>> ', data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});*/
UsersRoutes.post('/Login', async (req, res) => {
    try {
        let {email,password} = req.body;
        let user = await UserModel.FindbyEmail(email);
        if(!user){return undefined}
        console.log('user :>> ', user);
        let data = await UserModel.Login(user.password,password);
        console.log('data :>> ', data);
        if(data){
           return res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            reports:user.reports
        });
        }
        else{ throw error}
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