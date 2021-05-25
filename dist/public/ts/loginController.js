import { Request, Response } from "express";

const view = require('../views/login.html');

const loginController = {

    registrar:()=>{
        console.log("Estamo en el regitrar");

    }
    // registar: async (req: Request, res: Response) => {

    //     console.log("Estamo en el regitrar");
    //     // view.Username
    //     // console.log(req.body.Password);
    // }  

}

export default loginController;