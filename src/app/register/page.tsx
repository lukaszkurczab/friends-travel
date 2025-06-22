"use client";

import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Link from "next/link";
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loading } = useRegister();

  const handleRegisterClick = async () => {
    if (password !== confirmPassword) {
      alert("Hasła się nie zgadzają");
      return;
    }
    if (firstName === "") {
      alert("Dodaj przynajmniej imię");
      return;
    }

    await register(email, password, firstName, lastName);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 sm:px-8 md:px-12 lg:px-24 py-10 lg:py-20 w-full h-full">
      <div className="border rounded-xl p-6 sm:p-8 w-full max-w-md flex flex-col gap-4 bg-white shadow-md">
        <h2 className="text-green-600 text-3xl sm:text-4xl font-bold text-center">
          Create an account
        </h2>
        <div className="text-black flex items-center justify-center gap-1">
          <h4>Already have an account?</h4>
          <Link className="text-blue-500 hover:text-blue-700" href="/login">
            Log in
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Imię"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Nazwisko"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm password"
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleRegisterClick} disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
