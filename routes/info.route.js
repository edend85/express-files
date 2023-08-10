const InfoModel = require('../models/info.model');
const InfoRoutes = require('express').Router();


//working
InfoRoutes.get('/', async (req, res) => {
    try {
        let data = await InfoModel.ShowAllQuerys();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
//working
InfoRoutes.put('/addInfo', async (req, res) => {
    try {
        let {title,content,infoFor} = req.body;
        let data = await InfoModel.AddQuery(title,content,infoFor);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
InfoRoutes.put('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { title, content, infoFor } = req.body;
        
        console.log("ID:", id);
        console.log("Title:", title);
        console.log("Content:", content);
        console.log("InfoFor:", infoFor);

        let data = await InfoModel.UpdateQuery(id, title, content, infoFor);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


InfoRoutes.delete('/DeleteInfo/:id',async(req,res)=>{
    try{
        let { id } = req.params;
        await InfoModel.deleteInfo(id);
        res.status(200).json();
    }catch(error){
        res.status(500).json({ error });
    }
})
module.exports = InfoRoutes;