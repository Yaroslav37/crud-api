import {v4 as uuidv4} from 'uuid';

interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

const users: User[] = [];

export const createUser = (username: string, age: number, hobbies: string[]): User => {
    const user: User = {
        id: uuidv4(),
        username,
        age,
        hobbies
    };
    users.push(user);
    return user;
};

export const getAllUsers = (): User[] => {
    return users;
};

export const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
};

export const updateUser = (id: string, username: string, age: number, hobbies: string[]): User | undefined => {
    const user = users.find(user => user.id === id);
    if (user) {
        user.username = username;
        user.age = age;
        user.hobbies = hobbies;
    }
    return user;
};

export const deleteUser = (id: string): User | undefined => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return undefined;
};