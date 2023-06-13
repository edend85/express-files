const ReportModel = require('../models/report.model');
const ReportsRoutes = require('express').Router();


// Find All Reports - Work !
ReportsRoutes.get('/', async (req, res) => {
    try {
        let data = await ReportModel.ShowAllReports();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});


// Find Reports By City - Work !
ReportsRoutes.get('/:city', async (req, res) => {
    try {
        let { city } = req.params;
        let data = await ReportModel.ShowReportByCity(city);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});



ReportsRoutes.get('/userId', async (req, res) => {
    try {
        let { userId } = req.params;
        let data = await ReportModel.ShowUserReports(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
    console.log('3');
});
//working
ReportsRoutes.put('/AddReport', async (req, res) => {
    try {
        //let { userId } = req.params;
        let {date,type,location,address,place,details,image,reporter} = req.body;
        let data = await ReportModel.InsertNewReport(date,type,location,address,place,details,image,reporter);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
module.exports = ReportsRoutes;