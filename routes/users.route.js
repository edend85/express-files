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
UsersRoutes.put('/Register', async (req, res) => {
    try {
        console.log('regi :>> ');
        let { firstName,lastName,email,password,phone,address,role,smoke,img,IsActive } = req.body;
        let data = await UserModel.InsertUser(firstName,lastName,email,password,phone,address,role,smoke,img,IsActive);
        console.log('data :>> ',data);
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

UsersRoutes.post('/Login', async (req, res) => {
    try {
        let {email,password} = req.body;
        let user = await UserModel.FindbyEmail(email);
        if(!user){return undefined}
        console.log('user :>> ', user);
        let result = await UserModel.Login(user.password,password);
        console.log('result :>> ', result);
        if(result){
            res.status(200).json({
                firstName:`${user.firstName}`,
                lastName:`${user.lastName}`,
                email:`${user.email}`,
                address:`${user.address[0]}`,
                role:`${user.role}`,
                image:`${user.img}`,
                reports:`${user.reports}`  
        });
        }
        else{
            res.status(401).json({ error: "משתמש לא קיים" })}
    } catch (error) {
        res.status(500).json({ error });
    }
});
UsersRoutes.post('/UpdateUser', async (req, res) => {
    try {
        /*firstName,lastName,email,password,phone,address,role,smoke,img,IsActive*/ 
        let {currentE,firstName,lastName,email,phone,address} = req.body;
        let user = await UserModel.FindbyEmail(currentE);
        if(!user){return undefined}
        console.log('user :>> ', user);
        let result = await UserModel.UpdateUser(user,firstName,lastName,email,phone,address);
        console.log('result :>> ', result);
        if(result){
            res.status(200).json({
                firstName:`${user.firstName}`,
                lastName:`${user.lastName}`,
                email:`${user.email}`,
                role:`${user.role}`,
                image:`${user.img}`,
        });
        }
        else{
            res.status(401).json({ error: "משתמש לא קיים" })}
    } catch (error) {
        res.status(500).json({ error });
    }
});








//check again
UsersRoutes.put('/:id', async (req, res) => {
    try {
        let { email,password } = req.params;
        let data = await UserModel.UpdateUser(email,password);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

//todo
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