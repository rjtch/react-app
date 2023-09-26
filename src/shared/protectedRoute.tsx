import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'oidc-react';

interface Props { children: ReactNode}

export const ProtectedRoute = ({children}: Props) => {
    const user  = useAuth();
    let location = useLocation();
    console.log('Location ', location);

    if(user.userData && user.userData.expired) {
        return <Navigate to="*" state={{ from: location}} replace />
    }

    return <>{ children }</>;
};

