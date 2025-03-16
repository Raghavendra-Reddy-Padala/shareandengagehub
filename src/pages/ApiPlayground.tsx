
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import api from "@/services/api";

const ApiPlayground = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("/");
  const [method, setMethod] = useState<string>("GET");
  const [requestBody, setRequestBody] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [status, setStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // Test the connection to backend on load
  useEffect(() => {
    const testConnection = async () => {
      try {
        setLoading(true);
        const startTime = performance.now();
        const result = await api.test.hello();
        const endTime = performance.now();
        
        setResponseTime(Math.round(endTime - startTime));
        setStatus(result.status);
        
        if (result.error) {
          setResponse(JSON.stringify({ error: result.error }, null, 2));
          toast.error("Failed to connect to backend");
        } else {
          setResponse(JSON.stringify(result.data, null, 2));
          toast.success("Successfully connected to backend");
        }
      } catch (error) {
        console.error("Error testing connection:", error);
        setResponse(JSON.stringify({ error: "Connection failed" }, null, 2));
        toast.error("Failed to connect to backend");
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  const sendRequest = async () => {
    try {
      setLoading(true);
      setResponse("");
      setStatus(null);
      setResponseTime(null);
      
      let parsedBody;
      try {
        parsedBody = requestBody ? JSON.parse(requestBody) : null;
      } catch (error) {
        toast.error("Invalid JSON in request body");
        return;
      }
      
      const startTime = performance.now();
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method,
        headers: {
          ...(parsedBody && { "Content-Type": "application/json" }),
        },
        ...(parsedBody && { body: requestBody }),
      });
      const endTime = performance.now();
      
      setResponseTime(Math.round(endTime - startTime));
      setStatus(response.status);
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await response.text();
        setResponse(text);
      }
    } catch (error) {
      console.error("Request error:", error);
      setResponse(JSON.stringify({ error: "Request failed" }, null, 2));
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  // Predefined endpoints for quick testing
  const predefinedEndpoints = [
    { name: "Hello Endpoint", endpoint: "/", method: "GET", body: "" },
    { name: "Register User", endpoint: "/auth/register", method: "POST", 
      body: JSON.stringify({ 
        username: "testuser", 
        email: "test@example.com", 
        password: "password123" 
      }, null, 2) 
    },
    { name: "Login User", endpoint: "/auth/login", method: "POST", 
      body: JSON.stringify({ 
        username: "testuser", 
        password: "password123" 
      }, null, 2) 
    },
    { name: "Get Current User", endpoint: "/auth/me", method: "GET", body: "" },
    { name: "Create Post", endpoint: "/posts", method: "POST", 
      body: JSON.stringify({ 
        content: "This is a test post", 
        visibility: "PUBLIC" 
      }, null, 2) 
    },
    { name: "Get All Posts", endpoint: "/posts", method: "GET", body: "" },
  ];

  const selectPredefinedEndpoint = (item: any) => {
    setEndpoint(item.endpoint);
    setMethod(item.method);
    setRequestBody(item.body);
  };

  return (
    <div className="container py-8 max-w-5xl animate-fade-in">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-display">API Playground</CardTitle>
          <CardDescription>
            Test your SocialSphere backend API endpoints in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="custom" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="custom">Custom Request</TabsTrigger>
              <TabsTrigger value="predefined">Predefined Endpoints</TabsTrigger>
            </TabsList>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="md:col-span-3">
                  <Input
                    placeholder="Enter endpoint (e.g., /users)"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Full URL: <code className="bg-muted px-1 py-0.5 rounded">http://localhost:8080{endpoint}</code>
                  </p>
                </div>
              </div>
              
              {(method === "POST" || method === "PUT" || method === "PATCH") && (
                <div>
                  <Textarea
                    placeholder="Request body (JSON)"
                    className="font-mono text-sm h-40"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                  />
                </div>
              )}
              
              <Button onClick={sendRequest} disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </TabsContent>
            
            <TabsContent value="predefined">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predefinedEndpoints.map((item, index) => (
                  <Card key={index} className="card-hover cursor-pointer" onClick={() => selectPredefinedEndpoint(item)}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <span className={`
                          px-2 py-0.5 rounded text-xs font-medium
                          ${item.method === 'GET' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}
                          ${item.method === 'POST' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'}
                          ${item.method === 'PUT' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}
                          ${item.method === 'DELETE' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}
                        `}>
                          {item.method}
                        </span>
                        <span className="ml-2 text-xs opacity-70 truncate">{item.endpoint}</span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              <Button onClick={sendRequest} disabled={loading} className="w-full mt-4">
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 border rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm">Response</h3>
              <div className="flex items-center gap-2">
                {status !== null && (
                  <span className={`
                    px-2 py-0.5 rounded text-xs font-medium
                    ${status >= 200 && status < 300 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                    ${status >= 400 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : ''}
                    ${status >= 300 && status < 400 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                  `}>
                    Status: {status}
                  </span>
                )}
                
                {responseTime !== null && (
                  <span className="text-xs text-muted-foreground">
                    Time: {responseTime}ms
                  </span>
                )}
              </div>
            </div>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs">
              {response || "No response yet"}
            </pre>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-xs text-muted-foreground">
            Make sure your Spring Boot backend is running at http://localhost:8080
          </p>
          {status === null && (
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry Connection
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApiPlayground;
