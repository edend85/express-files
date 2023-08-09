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
        let {id} = req.params;
        let { content } = req.body;
        let data = await InfoModel.UpdateQuery(id,content);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
module.exports = InfoRoutes;