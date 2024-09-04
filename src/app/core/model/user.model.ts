export interface User {
    id:number;
    username:string;
    firstName:string;
    lastName:string;
    email:string;
    gender:string;
    token:string;
    refreshToken:string;
    image:string;
}
export interface UserFormData {
    username:string;
    password:string;
    rememberMe:boolean;
}