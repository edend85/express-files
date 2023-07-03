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
    let {email} = req.body;
    try {
        let report = {
            date:req.body.date,
            type:req.body.type,
            location:req.body.location,
            address:req.body.address,
            place:req.body.place,
            details:req.body.details,
            image:req.body.image,
            reporter:req.body.reporter
        }
        console.log('doc :>> ',report );
        let query = {"email":{$eq:email}}
        let data = await ReportModel.InsertNewReport(report,query);
        res.status(200).json(data);
    } catch (error) {
        console.log('err :>> ',error);
        res.status(500).json({ error });
    }
});
module.exports = ReportsRoutes;