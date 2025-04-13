import {InfoBlock} from "@/components/InfoBlock";

export default function NotAuthPage() {

    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <InfoBlock title={'Access denied!'}
                       text={'This page can only be viewed by authorized users!'}
                       imageUrl={'/lock.png'}/>

        </div>
    )
}