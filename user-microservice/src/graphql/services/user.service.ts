import User, { IUser } from "../../model/user.model";

export const getUsers = async () => {
    return await User.find({})
}

export const getUserById = async (id: string) => {
    return await User.findById(id)
}

export const getUserByName = async (name:string, surname:string | undefined) => {
    if(surname === undefined){
        return await User.findOne({name: name})
    }else{
        return await User.findOne({name: name, surName: surname})
    }
    
}





export const createUser = async (user: IUser) => {
    const nuser = new User(user)
    return await nuser.save()
}

export const updateUser = async (id: string, user: IUser) => {
    return await User.findOneAndUpdate({_id: id}, user)
}

export const deleteUser = async (id:string) => {
    return await User.findByIdAndDelete(id)
}