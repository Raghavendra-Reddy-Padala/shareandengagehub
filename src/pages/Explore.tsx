import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, TrendingUp, Image as ImageIcon, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface TrendingTopic {
  id: string;
  tag: string;
  count: number;
  posts: { id: string; imageUrl: string }[];
}

interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string;
  followers?: number;
  isTag?: boolean;
}

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");
  const isMobile = useIsMobile();
  
  const trendingTopics: TrendingTopic[] = [
    {
      id: "1",
      tag: "technology",
      count: 8452,
      posts: [
        {
          id: "1",
          imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
        }
      ]
    },
    {
      id: "2",
      tag: "travel",
      count: 6287,
      posts: [
        {
          id: "2",
          imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsfGVufDB8fDB8fHww"
        }
      ]
    },
    {
      id: "3",
      tag: "food",
      count: 5104,
      posts: [
        {
          id: "3",
          imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D"
        }
      ]
    },
    {
      id: "4",
      tag: "fitness",
      count: 3928,
      posts: [
        {
          id: "4",
          imageUrl: "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D"
        }
      ]
    }
  ];
  
  const suggestedUsers: User[] = [
    {
      id: "1",
      username: "tech_enthusiast",
      displayName: "Tech Enthusiast",
      avatarUrl: "https://i.pravatar.cc/150?u=tech",
      bio: "Exploring the latest in technology and innovation",
      followers: 5280
    },
    {
      id: "2",
      username: "travel_addict",
      displayName: "Travel Addict",
      avatarUrl: "https://i.pravatar.cc/150?u=travel",
      bio: "Exploring the world one destination at a time ✈️",
      followers: 8640
    },
    {
      id: "3",
      username: "foodie_adventures",
      displayName: "Foodie Adventures",
      avatarUrl: "https://i.pravatar.cc/150?u=food",
      bio: "Sharing the best food experiences around the globe 🍜",
      followers: 6120
    },
    {
      id: "4",
      username: "fitness_junkie",
      displayName: "Fitness Junkie",
      avatarUrl: "https://i.pravatar.cc/150?u=fitness",
      bio: "Helping you achieve your fitness goals 💪",
      followers: 4380
    }
  ];
  
  const searchResults: User[] = searchQuery
    ? [
        ...suggestedUsers.filter(user => 
          user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        ...trendingTopics.filter(topic => 
          topic.tag.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(topic => ({
          id: `tag-${topic.id}`,
          username: topic.tag,
          displayName: `#${topic.tag}`,
          avatarUrl: null,
          bio: `${topic.count.toLocaleString()} posts`,
          isTag: true
        }))
      ]
    : [];
  
  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };
  
  return (
    <div className="container py-4 sm:py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder={isMobile ? "Search..." : "Search for people, topics, or keywords"}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {searchQuery ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg sm:text-xl">Search Results</CardTitle>
              <CardDescription>Results for "{searchQuery}"</CardDescription>
            </CardHeader>
            <CardContent>
              {searchResults.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Search className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-base sm:text-lg font-medium">No results found</h3>
                  <p className="text-sm text-muted-foreground">Try a different search term or browse popular content below.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {searchResults.map((result) => (
                    <div key={result.id} className="flex items-center gap-3 sm:gap-4">
                      {result.isTag ? (
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-muted flex items-center justify-center">
                          <Hash className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                        </div>
                      ) : (
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                          <AvatarImage src={result.avatarUrl || ""} alt={result.displayName} />
                          <AvatarFallback>{result.displayName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base font-medium">{result.displayName}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">{result.isTag ? result.bio : `@${result.username}`}</p>
                      </div>
                      {!result.isTag && (
                        <Button variant="outline" size={isMobile ? "sm" : "default"}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          {!isMobile && "Follow"}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4 sm:mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="people">People to Follow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trending" className="mt-4 sm:mt-6">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="h-32 sm:h-40 overflow-hidden">
                        <img 
                          src={topic.posts[0].imageUrl} 
                          alt={`#${topic.tag}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm sm:text-base font-medium">#{topic.tag}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{topic.count.toLocaleString()} posts</p>
                          </div>
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="people" className="mt-4 sm:mt-6">
              <div className="grid gap-3 sm:gap-4">
                {suggestedUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                            <AvatarImage src={user.avatarUrl || ""} alt={user.displayName} />
                            <AvatarFallback>{user.displayName.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-medium">{user.displayName}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">@{user.username}</p>
                            <p className="text-xs sm:text-sm mt-1">{user.bio}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatFollowerCount(user.followers || 0)} followers</p>
                          </div>
                          <Button className="w-full sm:w-auto mt-2 sm:mt-0">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Follow
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Explore;
