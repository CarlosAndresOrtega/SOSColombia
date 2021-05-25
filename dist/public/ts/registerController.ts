import { Request, Response } from "express";
// const view = require('../views/login.html');

const loginController = {

    getAll: async (req: Request, res: Response) => {

        console.log("Estamo en el getAll "+ req.body);
        // view.Username
        // console.log(req.body.Password);
    }  

}

export default loginController;