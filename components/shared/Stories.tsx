'use client'


import {FC, useEffect, useState} from "react";
import Container from "@/components/shared/Container";
import {IStory} from "@/shared/services/stories";
import {Api} from "@/shared/services/api-client";
import {cn} from "@/shared/lib/utils";
import {X} from "lucide-react";
import ReactInstaStories from "react-insta-stories";

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
        if (selectedStory.items.length > 0) {
            console.log(isOpen)
            setIsOpen(true);
        }
    }
    return (
        <Container
            className={cn('flex items-center justify-between gap-2 my-10', className)}>
            {
                stories.length === 0 && (
                    [...Array(6).map((_, index) => (
                        <div key={index}
                             className={'animate-pulse w-[200px] h-[250px] rounded-md bg-gray-600'}>

                        </div>
                    ))]
                )
            }
            {
                stories.map((story, index) => (
                    <img
                        key={index}
                        className={'rounded-md cursor-pointer'}
                        width={200}
                        height={250}
                        onClick={() => {
                            onClickStory(story)
                        }}
                        src={story.previewImageUrl}
                    />
                ))
            }
            {
                isOpen && <div
                    className={'absolute left-0 top-0 w-full h-full bg-black/80 z-30 flex items-center justify-center'}>
                    <div className={'relative'} style={{width: 420} }>
                        <button className={'absolute -right-10 top-0 z-30'}
                                onClick={() => {
                                    setIsOpen(false)
                                }}>
                            <X className={'absolute w-8 h-8 cursor-pointer top-0 right-0 text-white/50'}/>
                        </button>
                        <ReactInstaStories stories={selectedStory?.items.map((story) => ({url: story.sourceUrl})) || []}
                                           defaultInterval={3000}
                                           width={420}
                                           height={800}
                                           onAllStoriesEnd={() => {
                                               setIsOpen(false)
                                           }}/>
                    </div>
                </div>
            }

        </Container>
    );
};

export default Stories;
