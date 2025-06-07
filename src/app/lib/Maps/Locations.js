import React from 'react';
import useUsers from '@/app/hooks/useUsers';

export default function Locations() {
    const { users, loading, error } = useUsers();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {users.map((user) => (
                user.lnglat?.lat && user.lnglat?.lng && (
                    <p key={user._id}>
                        {user.lnglat.lat}, {user.lnglat.lng}
                    </p>
                )
            ))}
        </>
    );
}
