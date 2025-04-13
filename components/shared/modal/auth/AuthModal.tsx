import {FC, useState} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import LoginForm from "@/components/shared/modal/auth/LoginForm";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AuthModal: FC<Props> = ({open, onClose}) => {
    const [type, setType] = useState<'login' | 'register'>('login');

    const onSwitchType = () => {
        setType((type === 'login') ? 'register' : 'login');
    }

    const handleClose = () => {
        onClose();
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className={'w-[450px] p-10 bg-white'}>

                {
                    type === 'login'
                        ?
                        <LoginForm onClose={handleClose}/>
                        :
                        <h1>Sign in</h1>
                }

                <hr/>
                <div className={'flex gap-2'}>
                    <Button variant={'secondary'}
                            onClick={async () => {
                                await signIn('github', {
                                    callbackUrl: '/',
                                    redirect: true
                                })
                            }}
                            type={'button'}
                            className={'gap-2 h-12 p-2 flex-1'}>
                        <img className={'w-6 h-6'}
                             alt={'github'}
                             src={'https://github.githubassets.com/favicons/favicon.svg'}/>
                        Github
                    </Button>
                    <Button variant={'secondary'}
                            onClick={async () => {
                                await signIn('google', {
                                    callbackUrl: '/',
                                    redirect: true
                                })
                            }}
                            type={'button'}
                            className={'gap-2 h-12 p-2 flex-1'}>
                        <img className={'w-6 h-6'}
                             alt={'google'}
                             src={'https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'}/>
                        Google
                    </Button>


                </div>
                <Button variant={'outline'}
                        onClick={onSwitchType}
                        type={'button'}
                        className={'h-12'}>
                    {type === 'login' ? 'Login' : 'Sign in'}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
