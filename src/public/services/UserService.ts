import { ObjectId } from "mongoose";
import {User} from "../models/UserSchema";

const UserService = {

    
    create: async (data: any) => {
        console.log("Publicando datos")
        const user = data;
        // console.log("Esta es la informacion de la data:");
        // console.log({user});
        const query3 = await User.findOne({ Username: user.Username});
        // await User.where({ Username: user.Username }).update({ $set: { _id:id } });
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
    login: async(data:any, id:any)=>{
        const user= data;
        console.log("lo llamas 2 veces???",{data});

        const query3 = await User.findOne({ Username: user.Username, password: user.Password});

        
        console.log({query3});
        
        if(query3==null){
            return "Su usuario no esta registrado, por favor registrese";
        }else{
            
            // await User.where({ Username: user.Username }).update({ $set: { idSocket:id } });
            return {query3};
        }
        
    },
    id: async(data:any,id:any)=>{
        console.log("la data que llega al id",{data});
        console.log("este es el id en chat", {id});
        
        const user= await User.where({ Username: data }).update({ $set: { idSocket:id }});
        console.log("Actualizacion del id en chat ",{user})
        if(user){
            return user;

        }else{
            return "no existe";
        }
    }
    
    
    

}
export default UserService;
