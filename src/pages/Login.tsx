import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: (user: { name: string; role: string; email: string }) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      const user = { name, role, email };
      onLogin(user);
      
      toast({
        title: "Welcome to UMEED! 🎉",
        description: `Logged in successfully as ${role}. Let's help students succeed together.`,
      });
      
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen aurora-bg-animated flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blur orbs */}
      <div className="blur-orb w-72 h-72 md:w-96 md:h-96 bg-white/20 top-10 right-10"></div>
      <div className="blur-orb w-64 h-64 md:w-80 md:h-80 bg-accent/30 bottom-20 left-10"></div>
      <div className="blur-orb w-48 h-48 bg-secondary/40 top-1/2 left-1/4"></div>
      
      <div className="w-full max-w-md animate-scale-in relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/25">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium text-white mb-2">Welcome to UMEED</h1>
          <p className="text-sm sm:text-base text-white/70 px-4">
            Sign in to start supporting student success with AI-powered insights
          </p>
        </div>

        <Card className="shadow-glass">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white">Sign In</CardTitle>
              <CardDescription className="text-center text-white/60">
                Enter your details to access the platform
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white/90">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-white/40 focus:ring-white/20 [&>span]:text-white/70">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/20 backdrop-blur-xl border-white/20">
                    <SelectItem value="teacher" className="text-white hover:bg-white/10 focus:bg-white/20">Teacher</SelectItem>
                    <SelectItem value="admin" className="text-white hover:bg-white/10 focus:bg-white/20">Administrator</SelectItem>
                    <SelectItem value="counselor" className="text-white hover:bg-white/10 focus:bg-white/20">Counselor</SelectItem>
                    <SelectItem value="principal" className="text-white hover:bg-white/10 focus:bg-white/20">Principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-white text-primary hover:bg-white/90" 
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              
              <div className="text-center text-sm text-white/60">
                <p>Demo Platform - Use any credentials to continue</p>
                <Link to="/" className="text-white hover:text-white/80 hover:underline">
                  Back to Home
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};
