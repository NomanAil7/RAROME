import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@school.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your DB logic
        if (
          credentials.email === "admin@school.com" &&
          credentials.password === "pass@123"
        ) {
          return { id: 1, name: "Admin", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Your login page
  },
  session: {
    strategy: "jwt",
  },
  secret: "YOUR_SECRET_KEY", // Use a strong secret
});

export { handler as GET, handler as POST };
