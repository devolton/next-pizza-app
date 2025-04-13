import {getUserSession} from "@/shared/lib/get-user-session";
import {redirect} from "next/navigation";
import {prisma} from "@/prisma/prisma-client";
import {ProfileForm} from "@/components/shared/ProfileForm";
import {User} from "@prisma/client";


export default async function ProfilePage() {

    const session = await getUserSession();
    if (!session) {
        return redirect('/not-auth');
    }

    const user:User | null = await prisma.user.findFirst({
        where: {
            id: Number(session.id),
        }

    });

    if(!user) {
        return redirect('/not-auth');
    }
    return <ProfileForm data={user}/>

}