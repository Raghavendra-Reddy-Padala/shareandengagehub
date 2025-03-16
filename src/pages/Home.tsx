
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Image as ImageIcon, Smile, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import api from "@/services/api";

// Sample data - in a real app, this would come from your API
const SAMPLE_POSTS = [
  {
    id: "1",
    user: {
      id: "1",
      username: "janedoe",
      displayName: "Jane Doe",
      avatarUrl: "https://i.pravatar.cc/150?u=jane"
    },
    content: "Just released a new feature on our app! Check it out and let me know what you think. #tech #innovation",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop",
    timestamp: "2023-06-15T14:30:00Z",
    likes: 42,
    comments: 5,
    liked: false
  },
  {
    id: "2",
    user: {
      id: "2",
      username: "mikebrown",
      displayName: "Mike Brown",
      avatarUrl: "https://i.pravatar.cc/150?u=mike"
    },
    content: "Beautiful day for a hike! 🏔️ #nature #outdoors",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop",
    timestamp: "2023-06-14T10:15:00Z",
    likes: 78,
    comments: 12,
    liked: true
  },
  {
    id: "3",
    user: {
      id: "3",
      username: "sarahsmith",
      displayName: "Sarah Smith",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah"
    },
    content: "Just finished reading this amazing book. Highly recommend it to everyone interested in AI and its future impacts on society.",
    imageUrl: null,
    timestamp: "2023-06-13T18:45:00Z",
    likes: 31,
    comments: 8,
    liked: false
  }
];

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [activeTab, setActiveTab] = useState("following");
  
  // Load posts (using sample data for now)
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // In a real app, you would fetch posts from your API
        // const response = await api.posts.getPosts();
        // if (response.data) {
        //   setPosts(response.data);
        // }
        
        // For now, use sample data with a slight delay to simulate loading
        setTimeout(() => {
          setPosts(SAMPLE_POSTS);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading posts:", error);
        toast.error("Failed to load posts. Please try again.");
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);
  
  const handleLikePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };
  
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      toast.error("Post cannot be empty");
      return;
    }
    
    // In a real app, you would send this to your API
    // await api.posts.createPost({ content: newPostContent });
    
    // For now, simulate creating a post
    const newPost = {
      id: `temp-${Date.now()}`,
      user: {
        id: "1",
        username: "johndoe",
        displayName: "John Doe",
        avatarUrl: "https://i.pravatar.cc/150?u=john"
      },
      content: newPostContent,
      imageUrl: null,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      liked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    toast.success("Post created successfully!");
  };
  
  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <div className="container py-8 max-w-2xl">
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Share what's on your mind with your followers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-3">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=john" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="resize-none mb-2"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-3 w-24 bg-muted rounded" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                  <div className="h-4 w-4/6 bg-muted rounded" />
                </div>
                <div className="my-3 h-48 bg-muted rounded" />
              </CardContent>
              <CardFooter>
                <div className="flex space-x-6">
                  <div className="h-6 w-16 bg-muted rounded" />
                  <div className="h-6 w-16 bg-muted rounded" />
                  <div className="h-6 w-16 bg-muted rounded" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial="hidden"
              animate="visible"
              custom={index}
              variants={postVariants}
            >
              <Card className="overflow-hidden card-hover">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.user.avatarUrl} />
                      <AvatarFallback>
                        {post.user.displayName?.slice(0, 2) || "UN"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{post.user.displayName}</CardTitle>
                      <CardDescription className="text-xs">
                        @{post.user.username} · {new Date(post.timestamp).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm mb-3">{post.content}</p>
                  {post.imageUrl && (
                    <div className="rounded-md overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt="Post attachment"
                        className="w-full h-auto object-cover max-h-96"
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-6">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`text-xs gap-1 ${post.liked ? 'text-red-500' : ''}`}
                      onClick={() => handleLikePost(post.id)}
                    >
                      <Heart className={`h-4 w-4 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
