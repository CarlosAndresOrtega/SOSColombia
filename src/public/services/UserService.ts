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
    },
    añadir_msg: async(data:any, users:any)=>{

        console.log("pushando el msg", {data});
        const objecto = {
            // autor: data.autor,
            channel: data.channel,
            msg: data.content
        };
        const objecto2 = {
            channel: data.autor,
            msg: data.content
        }
        if(data.channel=="all"){
            //agregarle al autor en los enviados
            await User.where({ Username: data.autor }).update({ $push: { MsgEnviados:objecto } });
            console.log("estos son los usuarios conectados",{users});
            
            //agregarle a los demas en os recibidos
            const usersIds = Object.keys(users);
            
            usersIds.forEach( async userId => {
                const query2 = await User.findOne({ idSocket: userId});
                // objecto.channel= query2.Username;
                if(query2.Username!=data.autor){
                    await User.where({ Username: query2.Username }).update({ $push: { MsgRecibidos:objecto2 } });
                }
            });
        }else{
            const query3 = await User.findOne({ idSocket: data.channel});
            objecto.channel= query3.Username;

            await User.where({ Username: data.autor }).update({ $push: { MsgEnviados:objecto } });

            // objecto.channel= query3.Username;

            await User.where({ Username: objecto.channel }).update({ $push: { MsgRecibidos: objecto2 } });
        }
    }
    
    
    

}
export default UserService;
