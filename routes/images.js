const express = require('express');
const multer  = require('multer');
const aws  = require('../config/aws');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

const s3 = new aws.S3();
const rekognition = new aws.Rekognition();

router.use(express.json());

router.post('/upload', upload.single("image"), (req, res) => {
    console.log("upload photo to aws");
    var bitmap = req.file.buffer;

    var params = {
        Image: {
            Bytes: bitmap
        },
        MinConfidence: 50.0
    }

    rekognition.detectModerationLabels(params, function(err, data)
    {
        if (err) res.send(err.stack);
        else {
            var labels = data.ModerationLabels;
            if (labels[0])
            {
                res.status(400);
                res.send('Bad content');
            }
            else
            {
                var params = {
                    Image: {
                        Bytes: bitmap
                    },
                    MaxLabels: 1,
                    MinConfidence: 80.0
                }
            
                rekognition.detectLabels(params, function(err, data)
                {
                    if (err) res.send(err.stack);
                    else {
                        if (data.Labels[0].Name === "Text")
                        {
                            res.status(401);
                            res.send('The image contains text');
                        }
                        else {
                            var imageName = "img" + Date.now() + ".jpg"
    
                            var params = {
                                Body: bitmap, 
                                Bucket: "picchatbucket", 
                                Key: imageName,
                                ACL:'public-read'
                               };
                               s3.putObject(params, function(err, data) {
                                 if (err) res.send('problem'); // an error occurred
                                 else     res.send("https://picchatbucket.s3-ap-southeast-2.amazonaws.com/" + imageName);           // successful response
                               });
                        }
                    }
                })

            }
        };
    });
});

module.exports = router;