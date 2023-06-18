const userModel = require("./userModel")

const users = [
    {
        email:"hla@gmail.com",
        password:"323!!FGLLWW!",
        user_name:"Hla",
        study_field:"Computer Engineering",
    },
    {
        email:"test@gmail.com",
        password:"323!!FGLLWW!",
        user_name:"Hla",
        study_field:"Computer Engineering ISE",
    },
    {
        email:"test2@gmail.com",
        password:"323!!FGLLWW!",
        user_name:"Hla",
        study_field:"Master of Computer Engineering",
    },

];

async function insertDB(){
    try{

        await userModel.insertMany(users)
        console.log('Successfully inserted to DB')

    }catch(err){
        console.log('Error inserting to DB' , err)

    }

} 

insertDB()
module.exports = insertDB