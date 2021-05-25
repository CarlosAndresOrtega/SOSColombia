import { Request, Response } from "express";
import UserService from "../services/UserService";
// const view = require('../views/login.html');

const loginController = {

    registar: async (data:any) => {

        try {     
            // console.log({data});
            // checkKeys(["TypeDocument", "NDocument"], data)
            const newUser = await UserService.create(data);
            const response = typeof newUser === "object" ? {error: false, msg: "Registro creado con exito", data: newUser} : {error: true, msg: newUser};
            return response;
        } catch (error) {
            console.log(error.stack && error.stack || error);
            
        }
    },
    getOne: async(data:any)=>{
        try { 
            const newUser = await UserService.getOne(data);
            const response = typeof newUser === "object" ? {error: false, msg: "Registro creado con exito", data: newUser} : {error: true, msg: newUser};
            return response;
        } catch (error) {
            console.log(error.stack && error.stack || error);
            
        } 
    }  

}

export default loginController;