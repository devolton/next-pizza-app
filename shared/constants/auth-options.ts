import {AuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {UserRole} from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/prisma/prisma-client";
import {compare, hashSync} from "bcrypt";

export const authOptions:AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                return {
                    id: profile.id,
                    name:profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as UserRole
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {lable: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials)
                    return null;

                const findUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });
                if (!findUser || !findUser.verified)
                    return null;

                const isPasswordValid = await compare(credentials.password, findUser.password);
                if (!isPasswordValid)
                    return null;

                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role
                }


            }
        })
    ],
    secret: process.env.NESTAUTH_SECRET || '',
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({user, account}) {
            try {
                if (account?.provider === 'credentials')
                    return true;

                if (!user.email)
                    return false;
                const findUser = await prisma.user.findFirst({
                    where: {
                        OR:[
                            {provider: account?.provider,providerId: account?.providerId},
                            {email: user.email},
                        ]
                    }
                });
                if(findUser){
                    await prisma.user.update({
                        where:{
                            id:findUser.id
                        },
                        data:{
                            provider: account?.provider,
                            providerId: account?.providerId,
                        }
                    });
                    return true;
                }
                await prisma.user.create({
                    data:{
                        email:user?.email,
                        fullName:user?.name || `User #${user.id}`,
                        password:hashSync(user.id.toString(),10), //todo небезопасно, поменять
                        verified:new Date(),
                        provider: account?.provider,
                        providerId: account?.providerId,
                    }
                });
                return true;



            } catch (error) {
                console.log(error);
                return false;
            }

        },
        async jwt({token}) {
            if(!token.email)
                return token;
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            });
            if (findUser) {
                token.id = String(findUser.id),
                    token.email = findUser.email,
                    token.name = findUser.fullName,
                    token.role = findUser.role
            }
            return token;
        },
        session({session, token}) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    }
}