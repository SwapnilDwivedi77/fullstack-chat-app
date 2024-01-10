"use client";

import {format} from "date-fns"

import { Member, Message, Profile } from "@prisma/client";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import ChatItem from "./chat-item";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}


const DATE_FORMAT = 'd MMM yyyy, HH:mm'
type MessageWithMemberWithProfile = Message & {
    member: Member & {
      profile: Profile
    }
  }

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketQuery,
  socketUrl,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });
    const messages = data?.pages[0]?.items
    console.log("🚀 ~ file: chat-messages.tsx:34 ~ data:", status,messages)
    
   
    if (status === "loading") {
      return (
        <div className="flex flex-col flex-1 justify-center items-center">
          <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Loading Messages...
          </p>
        </div>
      );
    }

    if (status === "error") {
        return (
          <div className="flex flex-col flex-1 justify-center items-center">
            <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Something went wrong!
            </p>
          </div>
        );
      }


  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      {data?.pages?.map((group,i) => (
        <Fragment key={i}>

            {group.items.map((message : MessageWithMemberWithProfile) => (
                <ChatItem
                key={message.id}
                member={message.member}
                id={message.id}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt),DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                currentMember={member}
                socketQuery={socketQuery}
                socketUrl={socketUrl}
                />
            ))}

        </Fragment>
      ))}
    </div>
  );
};

export default ChatMessages;
