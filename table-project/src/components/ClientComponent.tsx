// ClientComponent.jsx
"use client";

import fetchUsers from '~/utils/fetchUsers';
import { useQuery } from "@tanstack/react-query";
import { Suspense } from 'react';

export default function ClientComponent() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    // Set staleTime to see that we get the "Server" output,
    // can later switch tabs to trigger revalidation and see we
    // get the "Client" output
    staleTime: 10000,
  });

  return (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Website</th>
            </tr>
        </thead>
        {isLoading? (
            <tbody>
                <tr>
                    <td>...</td>
                    <td>...</td>
                </tr>
            </tbody>
            ) : isError? (
            <tbody>
                <tr>
                    <td>no users...</td>
                    <td>...</td>
                </tr>
            </tbody>
            ):(
            <tbody>
                {data.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.website}</td>
                </tr>
                ))}
            </tbody>
            )}
    </table>
  );
}