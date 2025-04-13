import {NextRequest} from "next/server";

export async function POST(req:NextRequest){
    try {
        console.log(req.body);

    }catch(err){
        console.log(err);
    }
}