'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation'; 
import { useState } from 'react'; 
import { Button, Input, Spacer } from "@nextui-org/react"; 
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; 
import { FaGoogle, FaLinkedin } from "react-icons/fa"; 
import { title } from "@/components/primitives";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

  export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string>(''); 
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Login failed');
          return;
        }
  
        const data = await response.json();
  
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('id', data.id);
        
        router.push('/home');
      } catch (error) {
        setError('An error occurred during login');
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-96 bg-black bg-opacity-30 p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "blue" })}>Login</h2>
        </CardHeader>
        <CardBody>
          <form className="grid gap-4" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm">{error}</p>} 
            <div className="grid gap-3">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
              />
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
              />
              <Link href="/forgot-password" legacyBehavior>
                <a className="text-blue-300 text-sm mt-1">Forgot Password?</a>
              </Link>
            </div>
            <Button 
              type="submit" 
              className="mt-3 border border-white-500" 
              color="gradient" 
              auto
              onClick={() => window.location.href = '/dashboard'}
            >
              Login
            </Button>
            
          </form>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/sign-up-doctor" legacyBehavior>
              <a className="text-blue-300">Sign up</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}