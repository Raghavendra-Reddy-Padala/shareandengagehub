
import { toast } from "sonner";

// Base URL for our API
const API_BASE_URL = "http://localhost:8080"; // Update this with your actual backend URL

// API request options type
type RequestOptions = {
  method: string;
  headers: Record<string, string>;
  body?: string;
};

// Generic API response type
type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    const status = response.status;
    const isJson = response.headers.get("content-type")?.includes("application/json");
    
    if (!response.ok) {
      const errorText = isJson ? await response.json() : await response.text();
      const errorMessage = isJson && errorText.message ? errorText.message : "An error occurred";
      return { data: null, error: errorMessage, status };
    }
    
    if (status === 204) {
      return { data: null, error: null, status };
    }
    
    const data = isJson ? await response.json() : await response.text();
    return { data: data as T, error: null, status };
  } catch (error) {
    console.error("API response handling error:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      status: 0
    };
  }
}

// API request function with error handling
async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  data?: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  try {
    // Get auth token from localStorage if available
    const token = localStorage.getItem("authToken");
    
    // Prepare headers
    const headers: Record<string, string> = {
      ...(data && !(data instanceof FormData) && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders
    };
    
    // Prepare request options
    const options: RequestOptions = {
      method,
      headers
    };
    
    // Add body if data exists
    if (data) {
      if (data instanceof FormData) {
        // Remove Content-Type header for FormData to let browser set it
        delete headers["Content-Type"];
        options.body = data as any;
      } else {
        options.body = JSON.stringify(data);
      }
    }
    
    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return await handleResponse<T>(response);
  } catch (error) {
    console.error("API request error:", error);
    const errorMessage = error instanceof Error ? error.message : "Network error";
    return { data: null, error: errorMessage, status: 0 };
  }
}

// API service object with methods for different endpoints
const api = {
  // Auth endpoints
  auth: {
    login: (credentials: { username: string; password: string }) => 
      apiRequest("/auth/login", "POST", credentials),
    
    register: (userData: { username: string; email: string; password: string }) => 
      apiRequest("/auth/register", "POST", userData),
    
    logout: () => apiRequest("/auth/logout", "POST"),
    
    getCurrentUser: () => apiRequest("/auth/me", "GET")
  },
  
  // User endpoints
  users: {
    getProfile: (username: string) => 
      apiRequest(`/users/${username}`, "GET"),
    
    updateProfile: (userData: any) => 
      apiRequest("/users/profile", "PUT", userData),
    
    follow: (userId: string) => 
      apiRequest(`/users/${userId}/follow`, "POST"),
    
    unfollow: (userId: string) => 
      apiRequest(`/users/${userId}/unfollow`, "POST"),
    
    getFollowers: (userId: string) => 
      apiRequest(`/users/${userId}/followers`, "GET"),
    
    getFollowing: (userId: string) => 
      apiRequest(`/users/${userId}/following`, "GET"),
    
    searchUsers: (query: string) => 
      apiRequest(`/users/search?q=${encodeURIComponent(query)}`, "GET")
  },
  
  // Post endpoints
  posts: {
    getPosts: (page: number = 0, size: number = 10) => 
      apiRequest(`/posts?page=${page}&size=${size}`, "GET"),
    
    getUserPosts: (userId: string, page: number = 0, size: number = 10) => 
      apiRequest(`/posts/user/${userId}?page=${page}&size=${size}`, "GET"),
    
    getPost: (postId: string) => 
      apiRequest(`/posts/${postId}`, "GET"),
    
    createPost: (postData: any) => 
      apiRequest("/posts", "POST", postData),
    
    updatePost: (postId: string, postData: any) => 
      apiRequest(`/posts/${postId}`, "PUT", postData),
    
    deletePost: (postId: string) => 
      apiRequest(`/posts/${postId}`, "DELETE"),
    
    likePost: (postId: string) => 
      apiRequest(`/posts/${postId}/like`, "POST"),
    
    unlikePost: (postId: string) => 
      apiRequest(`/posts/${postId}/unlike`, "POST"),
    
    getComments: (postId: string) => 
      apiRequest(`/posts/${postId}/comments`, "GET"),
    
    addComment: (postId: string, content: string) => 
      apiRequest(`/posts/${postId}/comments`, "POST", { content })
  },
  
  // Chat endpoints
  chat: {
    getConversations: () => 
      apiRequest("/chat/conversations", "GET"),
    
    getMessages: (conversationId: string) => 
      apiRequest(`/chat/conversations/${conversationId}`, "GET"),
    
    sendMessage: (conversationId: string, content: string) => 
      apiRequest(`/chat/conversations/${conversationId}`, "POST", { content }),
    
    createConversation: (userIds: string[]) => 
      apiRequest("/chat/conversations", "POST", { participants: userIds })
  },
  
  // Notification endpoints
  notifications: {
    getNotifications: (page: number = 0, size: number = 20) => 
      apiRequest(`/notifications?page=${page}&size=${size}`, "GET"),
    
    markAsRead: (notificationId: string) => 
      apiRequest(`/notifications/${notificationId}/read`, "POST"),
    
    markAllAsRead: () => 
      apiRequest("/notifications/read-all", "POST")
  },
  
  // Upload endpoints
  upload: {
    uploadImage: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiRequest("/upload/image", "POST", formData);
    },
    
    uploadVideo: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiRequest("/upload/video", "POST", formData);
    }
  },

  // Test endpoint
  test: {
    hello: () => apiRequest("/", "GET")
  }
};

// Export the API service
export default api;

// Helper hooks for data fetching with loading and error states
export async function fetchData<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    successMessage?: string;
  } = {}
) {
  try {
    const { data, error, status } = await fetcher();
    
    if (error) {
      options.onError?.(error);
      toast.error(error);
      return { data: null, error, status, loading: false };
    }
    
    if (data) {
      options.onSuccess?.(data);
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
    }
    
    return { data, error: null, status, loading: false };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
    options.onError?.(errorMessage);
    toast.error(errorMessage);
    return { data: null, error: errorMessage, status: 0, loading: false };
  }
}
