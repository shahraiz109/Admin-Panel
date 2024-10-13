"use client";
import { useLoginUserMutation } from "@/api/apiSlice";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();

      if (response?.user?.role === "Admin") {
        toast.success('You have logged in successfully!');
        router.push("/dashboard");
      } else {
        toast.error("You do not have access to the admin dashboard.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Error while logging in!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col text-center items-center justify-center space-y-6">
        <h2 className="text-gray-600 font-bold text-[20px] dark:text-white">
          Login to your account to continue
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-[300px]"
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Password"
            required
            className="placeholder-text-gray-300"
          />
          <button type="submit" className="bg-main dark:bg-blue rounded-md h-9">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
