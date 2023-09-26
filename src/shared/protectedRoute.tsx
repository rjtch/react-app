import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'oidc-react';

interface Props {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { userData, signIn } = useAuth();

    React.useEffect(() => {
        if (userData?.expired) {
            signIn();
        }
    }, [signIn, userData]);

    return userData?.expired
        ? children
        : <span>PrivateRoute loading</span>;
};

