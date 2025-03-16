
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, Smile, Paperclip, Image, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState("2");
  
  // This would be fetched from your Spring Boot backend in a real implementation
  const conversations = [
    {
      id: "1",
      username: "janedoe",
      displayName: "Jane Doe",
      avatarUrl: "https://i.pravatar.cc/150?u=jane",
      lastMessage: "Hey, how's it going?",
      unread: 2,
      timestamp: "2023-06-15T14:30:00Z",
      isOnline: true
    },
    {
      id: "2",
      username: "mikebrown",
      displayName: "Mike Brown",
      avatarUrl: "https://i.pravatar.cc/150?u=mike",
      lastMessage: "Did you see the latest update?",
      unread: 0,
      timestamp: "2023-06-14T10:15:00Z",
      isOnline: true
    },
    {
      id: "3",
      username: "sarahsmith",
      displayName: "Sarah Smith",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah",
      lastMessage: "Thanks for your help yesterday!",
      unread: 0,
      timestamp: "2023-06-13T18:45:00Z",
      isOnline: false
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

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send this to your API
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <Card className="rounded-xl border shadow-lg overflow-hidden h-[calc(100vh-140px)] bg-gradient-to-b from-background to-background/80">
        <div className="grid grid-cols-12 h-full">
          {/* Conversations list */}
          <div className="col-span-4 border-r h-full overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm">
            <CardHeader className="px-4 py-3 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-display">Messages</CardTitle>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-9 bg-background/50 border-muted focus-visible:ring-primary/40"
                />
              </div>
            </CardHeader>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((convo) => (
                <div 
                  key={convo.id}
                  className={`flex items-center gap-3 p-3 hover:bg-primary/5 transition-all duration-200 cursor-pointer border-b ${
                    convo.id === activeConversation 
                      ? "bg-primary/10 border-l-4 border-l-primary" 
                      : "border-l-4 border-l-transparent"
                  }`}
                  onClick={() => setActiveConversation(convo.id)}
                >
                  <div className="relative">
                    <Avatar className="border-2 border-background">
                      <AvatarImage src={convo.avatarUrl} alt={convo.displayName} />
                      <AvatarFallback className="bg-primary/20 text-primary-foreground">
                        {convo.displayName.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {convo.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                    {convo.unread > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-pulse">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className={`text-sm font-medium truncate ${convo.unread > 0 ? "font-semibold" : ""}`}>
                        {convo.displayName}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(convo.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${convo.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {convo.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat content */}
          <div className="col-span-8 flex flex-col h-full bg-gradient-to-b from-card/40 to-card/20 backdrop-blur-sm">
            <CardHeader className="px-4 py-3 border-b bg-muted/30 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=mike" alt="Mike Brown" />
                    <AvatarFallback className="bg-primary/20">MB</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-display">Mike Brown</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                      Active now
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="message-container">
              <div className="sticky top-0 flex justify-center mb-4">
                <Badge variant="outline" className="bg-card/60 backdrop-blur-sm text-xs py-1 px-2 shadow-sm">
                  Today, {new Date().toLocaleDateString()}
                </Badge>
              </div>
              
              {messages.map((message) => {
                const isMe = message.senderId === "1";
                return (
                  <div 
                    key={message.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    {!isMe && (
                      <Avatar className="mr-2 flex-shrink-0 self-end mb-1">
                        <AvatarImage src="https://i.pravatar.cc/150?u=mike" alt="Mike Brown" />
                        <AvatarFallback className="bg-primary/20">MB</AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                        isMe 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-card rounded-tl-none"
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
            
            <div className="p-3 border-t bg-card/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 bg-card rounded-xl p-1 pl-3 shadow-sm border">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-primary/10">
                    <Smile className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-primary/10">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-primary/10">
                    <Image className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  size="icon" 
                  className={`rounded-full transition-all duration-200 ${message.trim() ? 'bg-primary hover:bg-primary/90' : 'bg-muted hover:bg-muted/90'}`}
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
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
