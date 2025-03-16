
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Lock, Bell, Eye, Shield, Key, User } from "lucide-react";

const Settings = () => {
  const [profileForm, setProfileForm] = useState({
    displayName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    bio: "Software developer passionate about creating user-friendly applications.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev"
  });
  
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    mentions: true,
    newsletter: false
  });
  
  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    showOnlineStatus: true,
    allowTagging: true,
    showActivity: true
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handlePrivacyToggle = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Password updated successfully");
    }, 1000);
  };
  
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Key className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <form onSubmit={handleProfileSubmit}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile information visible to other users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://i.pravatar.cc/150?u=john" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm" className="mb-2">
                        Change Avatar
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        value={profileForm.displayName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={profileForm.username}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={profileForm.website}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <form onSubmit={handlePasswordSubmit}>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Protect your account with an additional security layer
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage what notifications you receive from SocialSphere
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Likes</p>
                      <p className="text-sm text-muted-foreground">
                        When someone likes your posts or comments
                      </p>
                    </div>
                    <Switch
                      checked={notifications.likes}
                      onCheckedChange={() => handleNotificationToggle("likes")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Comments</p>
                      <p className="text-sm text-muted-foreground">
                        When someone comments on your posts
                      </p>
                    </div>
                    <Switch
                      checked={notifications.comments}
                      onCheckedChange={() => handleNotificationToggle("comments")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Follows</p>
                      <p className="text-sm text-muted-foreground">
                        When someone follows you
                      </p>
                    </div>
                    <Switch
                      checked={notifications.follows}
                      onCheckedChange={() => handleNotificationToggle("follows")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Messages</p>
                      <p className="text-sm text-muted-foreground">
                        When you receive direct messages
                      </p>
                    </div>
                    <Switch
                      checked={notifications.messages}
                      onCheckedChange={() => handleNotificationToggle("messages")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mentions</p>
                      <p className="text-sm text-muted-foreground">
                        When someone mentions you in a post or comment
                      </p>
                    </div>
                    <Switch
                      checked={notifications.mentions}
                      onCheckedChange={() => handleNotificationToggle("mentions")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-muted-foreground">
                        Receive our monthly newsletter and updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={() => handleNotificationToggle("newsletter")}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast.success("Notification settings saved")}>
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your content and how your data is used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Private Account</p>
                      <p className="text-sm text-muted-foreground">
                        Only approved followers can see your posts
                      </p>
                    </div>
                    <Switch
                      checked={privacy.privateAccount}
                      onCheckedChange={() => handlePrivacyToggle("privateAccount")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Online Status</p>
                      <p className="text-sm text-muted-foreground">
                        Let others know when you're active on SocialSphere
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showOnlineStatus}
                      onCheckedChange={() => handlePrivacyToggle("showOnlineStatus")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Tagging</p>
                      <p className="text-sm text-muted-foreground">
                        Allow others to tag you in their posts and comments
                      </p>
                    </div>
                    <Switch
                      checked={privacy.allowTagging}
                      onCheckedChange={() => handlePrivacyToggle("allowTagging")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity Status</p>
                      <p className="text-sm text-muted-foreground">
                        Show your activity status on posts and comments
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showActivity}
                      onCheckedChange={() => handlePrivacyToggle("showActivity")}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast.success("Privacy settings saved")}>
                  Save Privacy Settings
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Data and Privacy</CardTitle>
                <CardDescription>
                  Manage your personal data and account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Download Data</p>
                    <p className="text-sm text-muted-foreground">
                      Get a copy of your SocialSphere data
                    </p>
                  </div>
                  <Button variant="outline">Request</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
