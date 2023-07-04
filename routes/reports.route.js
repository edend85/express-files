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



ReportsRoutes.post('/ShowMyReports', async (req, res) => {
    try {
        let {email} = req.body;
        console.log('email :>> ', email);
        let data = await ReportModel.ShowUserReports(email);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
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
        let data = await ReportModel.InsertNewReport(report,email);
        res.status(200).json(data);
    } catch (error) {
        console.log('err :>> ',error);
        res.status(500).json({ error });
    }
});
module.exports = ReportsRoutes;