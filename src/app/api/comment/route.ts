import { NextRequest } from "next/server"
import {nanoid} from "nanoid"
import { redis } from "@/lib/redis";

export const POST = async (req : NextRequest) =>{
    try{
        const body = await req.json();
        const {text , tags } = body;

        const commentId = nanoid();
        
        // Reterieve and store comment details
        const comment = {
            text,
            tags,
            timestamp : new Date(),
            author : req.cookies.get('userId')?.value,
        }

        await Promise.all([
            await redis.rpush('comments',commentId),
            redis.json.set(`comment:${commentId}`,`$`,comment)
        ])

        return new Response("OK");
    }catch(err){
        console.log(err);
    }
}