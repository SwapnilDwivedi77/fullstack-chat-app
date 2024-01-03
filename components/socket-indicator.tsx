"use client"


import { Badge } from "@/components/ui/badge"
import { useSocket } from "@/components/providers/socket-provider"


export const SocketIndicator = () => {
    const {isConnected} = useSocket()
    console.log("🚀 ~ file: socket-indicator.tsx:10 ~ SocketIndicator ~ isConnected:", isConnected)

    if(!isConnected) {
        return (
            <Badge
                variant={"outline"}
                className="bg-yellow-600 text-white border-none">
                    Fallback: Polling every 1s
                </Badge>
        )
    }

    return (
        <Badge variant={"outline"}
        className="bg-emerald-600 text-white border-none">
            Live: real time updates
        </Badge>
    )
}