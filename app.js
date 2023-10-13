

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email =   req.body.email;

  //const url = 'https://us21.api.mailchimp.com/3.0/lists/1502307a83';
  const data = {
     members: [
       {
         email_address: email,
         status:"subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }
       }
     ]
   };

   const jsonData = JSON.stringify(data);

   const url = 'https://us21.api.mailchimp.com/3.0/lists/1502307a83';

      const options ={
       method : "POST",
       auth: "farhana:eac25fa3f135112d0167ce3769fe2d1a-us21"
     }

      const request =  https.request(url, options, function(response){

      if(response.statusCode === 200){
        res.sendFile(__dirname +"/success.html");
      }else{
          res.sendFile(__dirname +"/failure.html");
      }

         response.on ("data", function(data){
         // console.log(JSON.parse(data));
         try {
              const jsData = JSON.parse(data);
              // Process the JSON data here
              console.log(jsData);
          } catch (error) {
              console.error('Error parsing JSON:', error);
          }


      })
   })

   request.write(jsonData);
   request.end();
});

app.post("/failure", function(req, res){
 res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});



//API KEY
//eac25fa3f135112d0167ce3769fe2d1a-us21
//list id
// 1502307a83
