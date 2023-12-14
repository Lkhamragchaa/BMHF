// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const [results] = await db.query('SELECT * FROM users WHERE username = ?', [credentials.username]);

                if (results.length > 0) {
                    const user = results[0];
                    if (await bcrypt.compare(credentials.password, user.password)) {
                        return Promise.resolve({ id: user.id, name: user.username, email: user.email });
                    }
                }
                return Promise.resolve(null);
            }
        })
    ],
    callbacks: {
        async signIn(user, account, profile) {
            // Custom logic after user signs in
            return true;
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
        verifyRequest: '/login/verify-request',
    },
});
