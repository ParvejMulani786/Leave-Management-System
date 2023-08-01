
 export default interface IUser {
    
      name : string,
      // gender : string,
      role : string,
      contact : string,
      email : string,
      password : string
  
}

export  interface IValidUser extends IUser  {
    
    userId:string,
    name : string,
    // gender : string,
    role : string,
    contact : string,
    email : string,
    password : string

}