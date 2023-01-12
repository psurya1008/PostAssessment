var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const grades=[];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


fs.createReadStream('./data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
   // console.log(results);
   results.sort(function(a, b){return a.Age - b.Age});
   console.log(results);
   for (let i = 0; i < results.length; i++) {
    switch (results[i].Grade){
      case 'S':
        grades.push(10);
        break;
      case "A":
        grades.push(9);
        break;
        case "B":
        grades.push(8);
        break;
        case "C":
        grades.push(7);
        break;
        case "D":
        grades.push(6);
        break;
    }
    
   }
  // var average = results.reduce(function(a, b) {(a,b)=> a.Grade + b.Grade, 0}) / results.length;
  const sum = results.reduce((acc, curr) => acc + Number(curr.Score), 0);
  const suma = grades.reduce((acc, curr) => acc + curr, 0);
  const avg_grade=suma/grades.length;
  const avg = sum / results.length;
  console.log("Average mark: "+avg);
   switch(Math.round(avg_grade)){
    case 10:
      console.log("Average Grade:S");
      break;
      case 9:
        console.log("Average Grade:A");
        break;
        case 8:
        console.log("Average Grade:B");
        break;
        case 7:
        console.log("Average Grade:C");
        break;
        case 6:
        console.log("Average Grade:D");
        break;
   }
  
   //(results);
  });
       
module.exports = router;
