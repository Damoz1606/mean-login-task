export interface IUser extends Document{
    _id: string
    email: string,
    password: string,
    tasks: [
        {
            _id: string,
            description: string,
            done: boolean,
            visibility: boolean
        }
    ]
}