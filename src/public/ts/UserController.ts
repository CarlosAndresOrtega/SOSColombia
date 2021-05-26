import { Request, Response } from "express";
import UserService from "../services/UserService";
// const view = require('../views/login.html');

const UserController = {

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
    login: async(data:any, id: any)=>{
        try { 
            const newUser = await UserService.login(data,id);
            const response = typeof newUser === "object" ? {error: false, msg: "Usuario encontrado", data: newUser} : {error: true, msg: newUser};
            return response;
        } catch (error) {
            console.log(error.stack && error.stack || error);
            
        } 
    },
    id_actualizado: async(data:any, id: any)=>{
        try { 
            const newid = await UserService.id(data,id);
            const response = typeof newid === "object" ? {error: false, msg: "Usuario actualizado", data: newid} : {error: true, msg: newid};
            return response;
        } catch (error) {
            console.log(error.stack && error.stack || error);
            
        } 
    },
    añadir_msg: async(data:any, users:any)=>{
        try { 
            const newid = await UserService.añadir_msg(data, users);
            const response = typeof newid === "object" ? {error: false, msg: "Usuario actualizado", data: newid} : {error: true, msg: newid};
            return response;
        } catch (error) {
            console.log(error.stack && error.stack || error);
            
        } 
    }
        

}

export default UserController;