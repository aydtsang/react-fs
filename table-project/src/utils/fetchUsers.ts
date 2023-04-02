type User = {
    id: string
    name: string
    website: string
}

export default async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json() as Promise<User[]>;
}