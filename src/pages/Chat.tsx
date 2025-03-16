
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const Chat = () => {
  // This would be fetched from your Spring Boot backend in a real implementation
  const conversations = [
    {
      id: "1",
      username: "janedoe",
      displayName: "Jane Doe",
      avatarUrl: "https://i.pravatar.cc/150?u=jane",
      lastMessage: "Hey, how's it going?",
      unread: 2,
      timestamp: "2023-06-15T14:30:00Z"
    },
    {
      id: "2",
      username: "mikebrown",
      displayName: "Mike Brown",
      avatarUrl: "https://i.pravatar.cc/150?u=mike",
      lastMessage: "Did you see the latest update?",
      unread: 0,
      timestamp: "2023-06-14T10:15:00Z"
    },
    {
      id: "3",
      username: "sarahsmith",
      displayName: "Sarah Smith",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah",
      lastMessage: "Thanks for your help yesterday!",
      unread: 0,
      timestamp: "2023-06-13T18:45:00Z"
    }
  ];

  // Sample messages for the current conversation
  const messages = [
    {
      id: "1",
      senderId: "2", // Mike
      text: "Hey, how's it going?",
      timestamp: "2023-06-15T14:20:00Z"
    },
    {
      id: "2",
      senderId: "1", // User (me)
      text: "Pretty good! Working on that new project I told you about.",
      timestamp: "2023-06-15T14:22:00Z"
    },
    {
      id: "3",
      senderId: "2", // Mike
      text: "That sounds interesting! Can you tell me more about it?",
      timestamp: "2023-06-15T14:25:00Z"
    },
    {
      id: "4",
      senderId: "1", // User (me)
      text: "Sure! It's a social media platform called SocialSphere. I'm using Spring Boot for the backend and React for the frontend.",
      timestamp: "2023-06-15T14:28:00Z"
    }
  ];

  return (
    <div className="container py-8">
      <Card className="rounded-lg border shadow-sm h-[calc(100vh-140px)]">
        <div className="grid grid-cols-12 h-full">
          {/* Conversations list */}
          <div className="col-span-4 border-r h-full overflow-hidden flex flex-col">
            <CardHeader className="px-4 py-3 border-b">
              <CardTitle className="text-lg">Messages</CardTitle>
              <CardDescription>Chat with your connections</CardDescription>
            </CardHeader>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((convo) => (
                <div 
                  key={convo.id}
                  className={`flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer border-b ${
                    convo.id === "2" ? "bg-muted" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={convo.avatarUrl} alt={convo.displayName} />
                      <AvatarFallback>{convo.displayName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {convo.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-medium truncate">{convo.displayName}</h4>
                      <span className="text-xs text-muted-foreground">{new Date(convo.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat content */}
          <div className="col-span-8 flex flex-col h-full">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=mike" alt="Mike Brown" />
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Mike Brown</CardTitle>
                  <CardDescription>Active now</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isMe = message.senderId === "1";
                return (
                  <div 
                    key={message.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        isMe 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-muted rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs text-right mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
