import { Model, Schema, Document, model } from "mongoose";

export interface IUser {
    //_id: string
    email: string;
    name: string;
    secondName: string
    surName: string;
    secondSurname: string
    dir: string;
}

interface IUserDocument extends IUser, Document{}

interface IUserModel extends Model<IUserDocument>{
    buildUser(args: IUser): IUserDocument
}

const UserSchema: Schema<IUserDocument> = new Schema({
    email:{type: String, required: true, unique: true},
    name: {type: String, required: true},
    secondName: {type: String},
    surName: {type: String, required: true},
    secondSurname: {type: String},
    dir: {type: String}
})

UserSchema.statics.buildUser = (args: IUser) =>{
    return new User(args)
}
const User = model<IUserDocument, IUserModel>("users", UserSchema)

export default User

