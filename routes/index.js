var express = require('express');
const fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/getAllUser', function (req, res, next) {
  var data = fs.readFileSync('myJsonDB.json');
  res.contentType('application/json');
  res.send(data);
});

router.post('/regUser', function (req, res, next) {
  var data = req.body;

  let rawData = fs.readFileSync('myJsonDB.json', 'utf8');
  var flag = 0;
  console.log(rawData == '')
  if (rawData !== '') {
    console.log('<<<<<<<<<<<<', data)
    parsedRawData = JSON.parse(rawData);
    console.log('*********', parsedRawData.length)
    for (var i = 0; i < parsedRawData.length; i++) {
      console.log(parsedRawData[i].id)

      console.log(data.id)
      if (parsedRawData[i].id === data.id) {
        flag = 1;
        if (flag == 1) {
          data = {
            "status": "0",
            "msg": "Already exist",

          };

        }
      }
      else {
        // add the user here
        rawData = []
        console.log('<<<<<<<<<<<<<<<<<kkkkkk')
        rawData.push(data);
        fs.appendFile('myJsonDB.json', JSON.stringify(rawData) + ',', (err) => {
          if(err) {
            console.log('Error saving data')
          } else {
            console.log('User saved successfully')
          }
        });
        data =
          {
            "status": "1",
            "msg": "Inserted Success"
          };
      }
    }
  } else {
    console.log('>>>>>>>>>>>>>>>>>>', data)
    rawData = [];
    rawData.push(data);
    fs.appendFile('myJsonDB.json', JSON.stringify(rawData) + ',', (err) => {
      if(err) {
        console.log('Error saving data')
      } else {
        console.log('User saved successfully')
      }
    });
    data =
      {
        "status": "1",
        "msg": "Inserted Success"
      };

  }


  // if (rawData == null || rawData == '') {
  //   console.log(rawData)
  //   rawData = {
  //     "data": []
  //   };
  // }
  // else {
  //   var parsedRawData = JSON.parse(rawData);
  //   // console.log('%%%%%%%%%%%%')
  //   // console.log(parsedRawData.length)

  // }
  // if (flag == 1) {
  //   data = {
  //     "status": "0",
  //     "msg": "Already exist",

  //   };
  // }

  // else {
  //    rawData.data.push(data);
  //   fs.writeFileSync('myJsonDB.json', JSON.stringify(rawData.data));
  //   data =
  //     {
  //       "status": "1",
  //       "msg": "Inserted Success"
  //     };
  // }
  res.send(data);
});



module.exports = router;
