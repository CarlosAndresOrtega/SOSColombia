import { ObjectId } from "mongoose";
import {User} from "../models/UserSchema";

const UserService = {

    
    create: async (data: any) => {
        console.log("Publicando datos")
        const user = data;
        // console.log("Esta es la informacion de la data:");
        // console.log({user});
        const query3 = await User.findOne({ Username: user.Username});
        console.log({query3});

        if(query3!=null){
            return "El usuario ya esta registrado";
        }else{

            const newUser = new User(user);
            newUser.save();
            console.log("ya guardado el usuario");
            return newUser;
        }
        
        // const query3 = await User.findOne({ Username: user.Username});
        // console.log("Esta es la informacion para verificar: ");
        // console.log({query3});
        
        
        // if(user.Username==query3.Username){

            // return {error:true, msg: "Usuario ya registrado"};
            
        // }else{
        // }
        // const query = await User.findOne({ _id: user });
        // const Sid = creditcard._id.toString();
    },
    getOne: async(data:any)=>{

    }
    
    
    

}
export default UserService;
