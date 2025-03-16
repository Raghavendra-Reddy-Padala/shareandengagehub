
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Sample notifications - in a real app, these would come from your API
  const notifications = [
    {
      id: "1",
      type: "like",
      user: {
        id: "1",
        username: "janedoe",
        displayName: "Jane Doe",
        avatarUrl: "https://i.pravatar.cc/150?u=jane"
      },
      content: "liked your post",
      postPreview: "Just released a new feature on our app! Check it out...",
      timestamp: "2023-06-15T14:30:00Z",
      read: false
    },
    {
      id: "2",
      type: "comment",
      user: {
        id: "2",
        username: "mikebrown",
        displayName: "Mike Brown",
        avatarUrl: "https://i.pravatar.cc/150?u=mike"
      },
      content: "commented on your post",
      postPreview: "This is amazing! I've been waiting for this feature.",
      timestamp: "2023-06-14T10:15:00Z",
      read: true
    },
    {
      id: "3",
      type: "follow",
      user: {
        id: "3",
        username: "sarahsmith",
        displayName: "Sarah Smith",
        avatarUrl: "https://i.pravatar.cc/150?u=sarah"
      },
      content: "started following you",
      postPreview: null,
      timestamp: "2023-06-13T18:45:00Z",
      read: false
    },
    {
      id: "4",
      type: "like",
      user: {
        id: "4",
        username: "alexjohnson",
        displayName: "Alex Johnson",
        avatarUrl: "https://i.pravatar.cc/150?u=alex"
      },
      content: "liked your comment",
      postPreview: "That's a great perspective! I hadn't thought about it that way.",
      timestamp: "2023-06-12T09:20:00Z",
      read: true
    }
  ];
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    return notification.type === activeTab;
  });
  
  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return days === 1 ? "1d ago" : `${days}d ago`;
    }
  };
  
  return (
    <div className="container py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated with activities on your posts and profile</CardDescription>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="like">Likes</TabsTrigger>
              <TabsTrigger value="comment">Comments</TabsTrigger>
              <TabsTrigger value="follow">Follows</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground">You don't have any notifications in this category yet.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${
                    !notification.read ? "bg-muted/30" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={notification.user.avatarUrl} alt={notification.user.displayName} />
                    <AvatarFallback>{notification.user.displayName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{notification.user.displayName}</span>
                        <span className="text-muted-foreground">{notification.content}</span>
                        {!notification.read && <span className="h-2 w-2 rounded-full bg-primary ml-1"></span>}
                      </div>
                      <span className="text-xs text-muted-foreground">{formatRelativeTime(notification.timestamp)}</span>
                    </div>
                    {notification.postPreview && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        "{notification.postPreview.length > 60 
                          ? notification.postPreview.substring(0, 60) + "..." 
                          : notification.postPreview}"
                      </div>
                    )}
                    {notification.type === "follow" && (
                      <Button variant="outline" size="sm" className="mt-2">
                        Follow back
                      </Button>
                    )}
                  </div>
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
