const UserModel = require("../models/user.model")
require('dotenv').config();
const SignUp = async ({username,email, password}) =>  {
    
    try{
        const newUser = {username, email, password}
        const createdUser= await UserModel.create(newUser)
        // const authHereLater = await
        return{
            code: 201,
            success: true,
            data: {
                user:{
                    username: createdUser.username,
                    email: createdUser.email
                }
            },
            message: "User created successfully"
        }
    }
    catch (error){
        console.log(`Error in user creation: ${error.message}`)
        return{
            code: 500,
            success: false,
            message: "User creation failed, please try again"
        }
    }

}


const Login = async({email, password}) => {
    
    try{
        const user = await UserModel.findOne({email});

        if(!user){
            return{
                code: 401,
                success: false,
                message: "Invalid credentials"
            }
        }

        const isValid = await user.isValidPassword(password);

        if(!isValid){
            return{
                code: 401,
                success: false,
                message: "Invalid credentials"
            }
        }

        return{
            code: 200,
            success: true,
            data: {
                user:{
                    username: user.username,
                    email: user.email
                }
            },
            message: "Login successful"
        }
    //  const authHereLater = await 
    }
    catch (error){
        console.log(`Error during login: ${error.message}`)
        return{
            code: 500,
            success: false,
            message: "Login failed, please try again"
        }
    }

}



module.exports = {
    SignUp,
    Login
}