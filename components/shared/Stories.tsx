'use client'


import {FC, useEffect, useState} from "react";
import Container from "@/components/shared/Container";
import {IStory} from "@/shared/services/stories";
import {Api} from "@/shared/services/api-client";
import {cn} from "@/shared/lib/utils";

interface Props {
    className?: string;
}

const Stories: FC<Props> = ({className}) => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedStory, setSelectedStory] = useState<IStory>();


    useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll();
            setStories(data);
        }

        fetchStories()

    }, []);

    const onClickStory = (selectedStory: IStory) => {
        setSelectedStory(selectedStory);
        if (!selectedStory.items.length) {
            setIsOpen(true);
        }

    }
    return (
        <Container
            className={cn('flex items-center justify-between gap-2 my-10',className)}>
            {
                stories.length===0 && (
                    [...Array(6).map((_,index)=>(
                        <div key={index}
                        className={'animate-pulse w-[200px] h-[250px] rounded-md bg-gray-600'}>

                        </div>
                    ))]
                )
            }
            {
                stories.map((story,index)=>(
                    <img
                        key={index}
                        className={'rounded-md cursor-pointer'}
                        width={200}
                        height={250}
                        onClick={()=>{onClickStory(story)}}
                        src={story.previewImageUrl}
                    />
                ))
            }

        </Container>
    );
};

export default Stories;
