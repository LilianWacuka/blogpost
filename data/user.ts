export interface User{
    id: string;
    userName: string;
    email: string;
    password: string;
}
let users: User[] = [];
export function registerUser(user: User){
    users.push(user);
}
export function loginUser(user: User){
    users.push(user);
}
export function findUser(email: string){
    return users.find(u => u.email === email);
}
