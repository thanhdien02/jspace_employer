
export interface IUser {
    id: number
    username: string,
    email: string,
    activated: boolean,
    role: string
}


export interface UserDTO {
    id: number,
    user: IUser
}

// export interface 