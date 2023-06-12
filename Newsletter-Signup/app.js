// Requiring Packages
const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
// Mailchimp Configuration
mailchimp.setConfig({
    apiKey:"43170573171ca22779ad3457686d656c-us21",
    server:"us21"
})
// Installing Plugins to Express.js
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
// Responding to Home Page with HTML file
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
// Fetching data from Client Request and adding it to mailchimp
app.post("/",function(req,res){
    const listId = "3b7f65c170";
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    async function run() {
        try{
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                }
            });
            
            console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
            res.sendFile(__dirname+"/success.html")
        }catch(e){
            console.log(e);
            res.sendFile(__dirname+"/failure.html")
        } 
    }
    run();
})

app.post("/failure", (req,res) => {
    res.redirect("/")
})
 
app.listen(3000, function(){
    console.log("Server is running on Port 3000.");
})
  //API 
  // 43170573171ca22779ad3457686d656c-us21
  // ID 3b7f65c170
  // server prefix us21