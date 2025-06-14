"use client";

import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, loginWithGoogle, googleLoading } = useLogin();

  const handleClick = async () => {
    await login(email, password);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center justify-center px-24 py-20 h-full">
      <div className="border rounded-xl p-4 flex flex-col gap-2 w-[400]">
        <h2 className="text-green-600 text-4xl flex-1 font-bold">Log in</h2>
        <div className="text-black flex items-center">
          <h4>Don&apos;t have account?</h4>
          <Link
            className="px-1 text-blue-500 hover:text-blue-700"
            href={"/register"}
          >
            Create now!
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleClick();
            }}
          />
          <Button onClick={handleClick} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        {/* <div className="border-t border-gray-300 my-4 relative">
          <div className="flex justify-center absolute top-0 w-full -translate-y-1/2">
            <span className="bg-white px-4 text-black text-sm">
              Or log in with
            </span>
          </div>
        </div>
        <Button
          onClick={loginWithGoogle}
          className="bg-white border border-gray-300 flex items-center justify-center gap-3 text-black hover:text-white hover:border-transparent"
          disabled={loading}
        >
          <Image src="/google.png" width={20} height={20} alt="Google" />
          <span>{googleLoading ? "Logging in..." : "Google"}</span>
        </Button> */}
      </div>
    </div>
  );
};

export default Login;
