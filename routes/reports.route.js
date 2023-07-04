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
    let {date,type,location,address,place,details,image,reporter,email} = req.body;
    try {
        let report = {
            date:date,
            type:type,
            location:location,
            address:address,
            place:place,
            details:details,
            image:image,
            reporter:reporter
        }
        let data = await ReportModel.InsertNewReport(date,type,location,address,place,details,image,reporter,email);
        res.status(200).json(data);
    } catch (error) {
        console.log('err :>> ',error);
        res.status(500).json({ error });
    }
});
module.exports = ReportsRoutes;