"use client";

import { useState } from "react";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Input } from "../../components/Input";
import Link from "next/link";
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const { register, loading } = useRegister();

  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked);
  };

  const handleRegisterClick = async () => {
    if (password !== confirmPassword) {
      alert("Hasła się nie zgadzają.");
      return;
    }

    await register(email, password, checked);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center justify-center px-24 py-20 h-full">
      <div className="border rounded-xl p-4 w-1/2 flex flex-col gap-2">
        <h2 className="text-green-600 text-4xl font-bold">Create an account</h2>
        <div className="text-black flex items-center">
          <h4>Already have an account?</h4>
          <Link
            className="px-1 text-blue-500 hover:text-blue-700"
            href={"/login"}
          >
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
          <Checkbox checked={checked} onCheckedChange={handleCheckboxChange}>
            Accept terms and conditions
          </Checkbox>
          <Button onClick={handleRegisterClick} disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </div>
        {/* <div className="border-t border-gray-300 my-4 relative">
          <div className="flex justify-center absolute top-0 w-full -translate-y-1/2">
            <span className="bg-white px-4 text-black text-sm">
              Or register with
            </span>
          </div>
        </div>
        <Button className="bg-white border border-gray-300 flex items-center justify-center gap-3 text-black hover:text-white hover:border-transparent">
          <Image src="/google.png" width={20} height={20} alt="Google" />
          <span>Google</span>
        </Button> */}
      </div>
    </div>
  );
};

export default Register;
