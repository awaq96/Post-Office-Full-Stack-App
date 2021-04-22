const request = require("request")
const https = request('https')

const config ={
    baseUrl: "http://localhost:8080"
}

module.exports={

    apiCall = function(url){
        /*
         *  @param
            string: url, combine with base url will make a call to restAPI app 
         */
        return new Promise((resolve, reject)=>{
            request(config.baseUrl + url, {json: true}, (err, res, body)=>{
                if(err) reject (err)
                resolve(body)
            })
        })
    }
}
