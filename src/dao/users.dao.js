import userModel from "./models/user.model.js";
import UserDTO from "./DTOs/user.dto.js";
class UserDAO{
    constructor() {}

    async getAll(){
        try{
            return await userModel.find();
        }
        catch(error){
            throw error;
        }
    }

    async paginate(query){
        //console.log("wait wat",query[0],query[1])
        return await userModel.paginate(query[0],query[1])
    }

    async deleteUser(uid){try{

        return await userModel.deleteOne({"_id":uid})}
        catch(error){
            throw error;
        }
    }

    async editUser(uid,payload){
        try{
            return await userModel.updateOne({"_id":uid},payload)
        }
        catch(error){
            throw error
        }
    }

    async getUser(username){
        try{
            return await userModel.findOne({ email: username });
        }
        catch(error){
            throw error;
        }
    }
    async getbyID(user_id){
        try{
            return await userModel.findById(user_id)
        }catch(error){
            throw error
        }
    }

    async addUser(newUser){
        try{
            const newuserInfo=new UserDTO(newUser)
            return await userModel.create(newuserInfo);
        }catch(error){
            throw error
        }
    }
    async resetPass(email,pass){
      
    return await userModel.updateOne({ email }, { password: pass });
    }
    async premuser(uid,role){
        return await userModel.updateOne({"_id":uid},{"role":role})
    }

    async last_connect (id,connection){
        return await userModel.updateOne({"_id":id},{"last_connection":connection})
    }

    async upload_file(id,document){
        return await userModel.updateOne({"_id":id},{"documents":document})
    }
    async check_files(id){
        let user =await userModel.findById(id)

        return user.documents;
    }
}

export default UserDAO;