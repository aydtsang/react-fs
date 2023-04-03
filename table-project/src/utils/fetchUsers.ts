export type User = {
    id: number,
    name: string
    website: string
}

export default async function fetchUsers(options: {  pageIndex: number,  pageSize: number }) {
    let url = new URL('https://jsonplaceholder.typicode.com/users')
    url.searchParams.append("_page", (options.pageIndex + 1).toString())
    url.searchParams.append("_limit", options.pageSize.toString())
    console.log(url)
    const res = await fetch(url);
    return res.json() as Promise<User[]>;
}