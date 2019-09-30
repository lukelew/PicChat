const express = require('express');
const multer  = require('multer');
const aws  = require('../config/aws');
const fs = require('fs');
const compress_images = require('compress-images');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

const s3 = new aws.S3();
const rekognition = new aws.Rekognition();

const original_file_name = 'temp_picture_full.jpg';
const bucketAdress = 'https://picchatbucket.s3-ap-southeast-2.amazonaws.com/';

router.use(express.json());

//this method was written with help of documentation provided by Amazon
//source: https://docs.aws.amazon.com/rekognition/latest/dg/API_Reference.html

router.post('/upload', upload.single("image"), (req, res) => {
    var bitmap = req.file.buffer;
    resize_image(bitmap);

    var params = {
        Image: {
            Bytes: bitmap
        },
        MinConfidence: 50.0
    }

    rekognition.detectModerationLabels(params, function(err, data)
    {
        if (err) res.send(err.stack)
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
                            var dateTime = Date.now()
                            var imageNameFull = 'img' + dateTime + '.jpg';        
                            var imageNameSmall = 'img' + dateTime + '_small' + '.jpg';        
                            
                            var respond = new Array();
    
                            var params = {
                                Body: bitmap, 
                                Bucket: 'picchatbucket', 
                                Key: imageNameFull,
                                ACL:'public-read'
                               };

                               s3.putObject(params, function(err, data) {
                                 if (err) res.send('problem'); // an error occurred
                               });

                               fs.readFile('./tmp/' + original_file_name, function(error, data) {
                                   if (error) console.log(error);
                                   else {
                                   var params = {
                                        Body: data, 
                                        Bucket: 'picchatbucket', 
                                        Key: imageNameSmall,
                                        ACL:'public-read'
                                       };
                                       
                                       s3.putObject(params, function(err, data) {
                                         if (err) res.send('problem'); // an error occurred
                                         else {
                                                respond.push(bucketAdress + imageNameFull);
                                                respond.push(bucketAdress + imageNameSmall);
                                                res.send(respond); 
                                            } 
                                       });        
                                   }
                               });
                        }
                    }
                })
            }
        };
    });
});

function resize_image(data) {
    fs.writeFile(original_file_name, data, 'binary', function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log('File was saved!');

            compress_images(original_file_name, './tmp/', {compress_force: false, statistic: true, autoupdate: true}, false,
                {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
                {png: {engine: 'pngquant', command: ['--quality=20-50']}},
                {svg: {engine: 'svgo', command: '--multipass'}},
                {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}},
                function (error) {
                    if (error) {
                        console.log(error);
                    
                    } else {
                        console.log('File was compressed succesfully!');
                    }});
        }
    });
}

module.exports = router;