const axios = require("axios")

const config ={
    baseUrl: "http://localhost:8080",
};

exports.createAccount = function(newAccount){
    axios.post(config.baseUrl + "/account/", {
        email: newAccount.email,
        username: newAccount.username,
        password: newAccount.password,
        address: newAccount.address,
        phoneNumber: newAccount.phoneNumber
    }).then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        }).catch((error) => {
        console.error(error)
    })
}
exports.authorize_access = async function(username, password){
    axios.post(config.baseUrl + "/authorize/", {
        username: username,
        password: password
    }).then((res)=>{
        console.log("accountAPI")
        console.log(res.data)
        return res
    }).catch((error)=>{
        console.log(error)
    })
}

