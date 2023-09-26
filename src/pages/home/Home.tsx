import { useAuth } from 'oidc-react';

export function Home() {
    const auth = useAuth();
    if (auth && auth.userData) {
        return (
            <div>
                <h1>Welcome!</h1>
                <strong>Logged in! 🎉</strong><br/>
                <button onClick={() => auth.signOut()}>Sign out!</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome!</h1>
            <strong>Not logged in! Try to refresh to be redirected to KeyCloak</strong><br/>
            <button onClick={() => auth.signIn()}>Sign in</button>
        </div>
    );
}
