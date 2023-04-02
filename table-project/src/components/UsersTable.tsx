import fetchUsers from '~/utils/fetchUsers';

export default async function UsersTable() {
    const users = await fetchUsers();
    return (
        <table>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Website</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.website}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}