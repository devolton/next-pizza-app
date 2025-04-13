'use client'
import React, {FC} from "react";
import {useSession} from "next-auth/react";
import {CircleUser, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface Props {
    onClickSignIn: () => void;
    className?: string;
}

const ProfileButton: FC<Props> = ({onClickSignIn,className}) => {
    const {data: session} = useSession();



    return (
        <div className={className}>
            {
                !session ?
                    <Button onClick={onClickSignIn} variant={'outline'} className={'flex items-center gap-3'}>
                        <User size={16}/>
                        Login
                    </Button>
                    :
                    <Link href={'/profile'}>
                        <Button variant={'outline'} className={'flex items-center gap-3'}>
                            <CircleUser size={18}/>
                            Profile
                        </Button>
                    </Link>

            }
        </div>
    );
};

export default ProfileButton;
