'use client';

import Link from "next/link";
import { useState, FormEvent } from 'react'; 
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; 
import { title } from "@/components/primitives";

interface DoctorSignUpFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialization: string;
}

const DoctorSignUpPage: React.FC = () => {
  const [error, setError] = useState<string>(''); 
  const [formData, setFormData] = useState<DoctorSignUpFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
  }); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      specialization: e.target.value,
    });
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, phoneNumber, email, password, confirmPassword, specialization } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/doctor/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: phoneNumber,
          email,
          password,
          specialization,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return;
      }

      const data = await response.json();
      console.log('Doctor registered successfully:', data);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/doctor-bg.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-104 bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "blue" })}>Doctor Sign Up</h2>
        </CardHeader>
        <CardBody>
          <form className="grid gap-2" onSubmit={handleSignUp}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="firstName"
                type="text"
                label="First Name"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
                onChange={handleChange}
              />
              <Input
                id="lastName"
                type="text"
                label="Last Name"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
                onChange={handleChange}
              />
            </div>
            <Input
              id="email"
              type="email"
              label="Email"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Input
              id="phoneNumber"
              type="tel"
              label="Phone Number"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
              onChange={handleChange}
            />
            <Select
              id="specialization"
              label="Specialization"
              variant="bordered"
              fullWidth
              required
              className="bg-transparent"
              value={formData.specialization}
              onChange={(e) => handleSelectChange(e as React.ChangeEvent<HTMLSelectElement>)}
            >
              <SelectItem key="general" value="general">General</SelectItem>
              <SelectItem key="ent" value="ent">ENT</SelectItem>
              <SelectItem key="cardiology" value="cardiology">Cardiology</SelectItem>
              <SelectItem key="neurology" value="neurology">Neurology</SelectItem>
              <SelectItem key="orthopedics" value="orthopedics">Orthopedics</SelectItem>
              <SelectItem key="pediatrics" value="pediatrics">Pediatrics</SelectItem>
              <SelectItem key="other" value="other">Other</SelectItem>
            </Select>

            <Button 
              type="submit" 
              className="mt-2 border border-blue-500" 
              color="gradient" 
              auto
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login-doc" legacyBehavior>
              <a className="text-blue-300">Login</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DoctorSignUpPage;