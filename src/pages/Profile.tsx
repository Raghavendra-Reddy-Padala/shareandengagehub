
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditIcon, Settings, MessageCircle, UserPlus, UserCheck } from "lucide-react";

// Sample user data - in a real app, this would come from your API
const SAMPLE_USER = {
  id: "1",
  username: "johndoe",
  displayName: "John Doe",
  avatarUrl: "https://i.pravatar.cc/150?u=john",
  bio: "Software developer passionate about building great user experiences. Love hiking and photography in my free time.",
  following: 245,
  followers: 342,
  joinDate: "January 2022",
  location: "San Francisco, CA",
  website: "https://johndoe.com"
};

const SAMPLE_POSTS = [
  {
    id: "1",
    content: "Working on a new project! Can't wait to share it with everyone. #coding #webdev",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    timestamp: "2023-06-15T14:30:00Z",
    likes: 42,
    comments: 5
  },
  {
    id: "2",
    content: "Beautiful day for a hike! 🏔️ #nature #outdoors",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop",
    timestamp: "2023-06-14T10:15:00Z",
    likes: 78,
    comments: 12
  }
];

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  
  useEffect(() => {
    const loadProfile = async () => {
      // In a real app, you would fetch user data and posts from your API
      // const userResponse = await api.users.getProfile(username);
      // const postsResponse = await api.posts.getUserPosts(userResponse.data.id);
      
      // For now, use sample data with a slight delay to simulate loading
      setTimeout(() => {
        setUser(SAMPLE_USER);
        setPosts(SAMPLE_POSTS);
        setLoading(false);
      }, 1000);
    };
    
    loadProfile();
  }, [username]);
  
  const handleToggleFollow = () => {
    setFollowing(!following);
  };
  
  if (loading) {
    return (
      <div className="container py-8 max-w-4xl animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-muted" />
                <div className="h-6 w-32 mx-auto mt-4 bg-muted rounded" />
                <div className="h-4 w-24 mx-auto mt-2 bg-muted rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-16 bg-muted rounded mb-4" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="h-10 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-muted rounded w-full" />
              </CardFooter>
            </Card>
          </div>
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <div className="h-8 bg-muted rounded w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 bg-muted rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-2">User not found</h1>
        <p className="text-muted-foreground">Could not find user with username: {username}</p>
      </div>
    );
  }
  
  return (
    <div className="container py-8 max-w-4xl animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card className="sticky top-4">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto border-4 border-background">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>
                  {user.displayName?.slice(0, 2) || "JD"}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user.displayName}</CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{user.bio}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-semibold">{user.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div>
                  <p className="font-semibold">{user.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="font-semibold">{posts.length}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                {user.location && (
                  <p className="text-muted-foreground flex items-center gap-1">
                    <span>📍</span>
                    <span>{user.location}</span>
                  </p>
                )}
                {user.website && (
                  <p className="text-primary flex items-center gap-1">
                    <span>🔗</span>
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {user.website.replace(/^https?:\/\//, '')}
                    </a>
                  </p>
                )}
                <p className="text-muted-foreground flex items-center gap-1">
                  <span>📅</span>
                  <span>Joined {user.joinDate}</span>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              {user.username === "johndoe" ? (
                <Button variant="outline" className="w-full" onClick={() => {}}>
                  <EditIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button onClick={handleToggleFollow}>
                    {following ? (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:w-2/3">
          <Card>
            <CardHeader className="pb-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="likes">Likes</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="posts" className="space-y-4 mt-0">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden card-hover">
                      <CardContent className="p-4">
                        <p className="text-sm mb-3">{post.content}</p>
                        {post.imageUrl && (
                          <div className="rounded-md overflow-hidden mb-3">
                            <img
                              src={post.imageUrl}
                              alt="Post attachment"
                              className="w-full h-auto object-cover max-h-80"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                          <div className="flex space-x-4">
                            <span>{post.likes} likes</span>
                            <span>{post.comments} comments</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No posts yet</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="media" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {posts
                    .filter((post) => post.imageUrl)
                    .map((post) => (
                      <div key={post.id} className="aspect-square rounded-md overflow-hidden card-hover">
                        <img
                          src={post.imageUrl}
                          alt="Media"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  {posts.filter((post) => post.imageUrl).length === 0 && (
                    <div className="col-span-3 text-center py-8">
                      <p className="text-muted-foreground">No media yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="likes" className="mt-0">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No liked posts yet</p>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
