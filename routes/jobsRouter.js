const express = require("express");
const JobsModel = require("../models/jobs-model");
const router = express.Router();


router.post("/create-jobs", (req, res) => {
    const { image, ad, tecrube, tarix, maas } = req.body;
    const jobs = new JobsModel({
        image,
        ad,
        tecrube,
        tarix,
        maas
    });
    jobs.save().then(j => {
        res.status(200).json({
            jobs: j
        });
    })
});


router.get("/get-jobs", (req, res) => {
    JobsModel.find({}, (err, jobs) => {
        if(err) {
            console.log("error");
        } else {
            res.status(200).json({ jobs });
        }
    })
});

router.delete("/delete-jobs/:id", (req, res) => {
    const { id } = req.params;
    JobsModel.deleteMany({ _id: id }, function(err, data) {
        if(err) {
            res.status(422).json({ err: "poza bilmedim" });
        } else {
            res.status(200).json({ deleted: true });
        }
    });
})


module.exports = router;