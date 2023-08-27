"use client";

import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

enum Variant {
  LOGIN = "Login",
  REGISTER = "Register",
}

export default function Auth() {
  const [variant, setVariant] = useState<Variant>(Variant.LOGIN);

  function isVariantRegister(): boolean {
    return variant === Variant.REGISTER;
  }

  function isVariantLogin(): boolean {
    return variant === Variant.LOGIN;
  }

  function resetForm(): void {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  }

  const toggleVariant = useCallback((): void => {
    resetForm();
    setVariant((current) =>
      current === Variant.LOGIN ? Variant.REGISTER : Variant.LOGIN
    );
  }, []);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  function onEmailChange(event: any): void {
    setEmail(event.target.value);
  }

  function onUsernameChange(event: any): void {
    setUsername(event.target.value);
  }

  function onPasswordChange(event: any): void {
    setPassword(event.target.value);
  }

  function onPasswordConfirmChange(event: any): void {
    setPasswordConfirm(event.target.value);
  }

  const authFormContainer = {
    [Variant.LOGIN]: [
      {
        id: "email",
        onChange: onEmailChange,
        type: "email",
        value: email,
        label: "Email",
      },
      {
        id: "password",
        onChange: onPasswordChange,
        type: "password",
        value: password,
        label: "Password",
      },
    ],
    [Variant.REGISTER]: [
      {
        id: "email",
        onChange: onEmailChange,
        type: "email",
        value: email,
        label: "Email",
      },
      {
        id: "username",
        onChange: onUsernameChange,
        type: "username",
        value: username,
        label: "Username",
      },
      {
        id: "password",
        onChange: onPasswordChange,
        type: "password",
        value: password,
        label: "Password",
      },
      {
        id: "passwordConfirm",
        onChange: onPasswordConfirmChange,
        type: "password",
        value: passwordConfirm,
        label: "Confirm Password",
      },
    ],
  };

  function signInWithGithub() {
    signIn("github", {
      callbackUrl: "/profile",
    });
  }

  function signInWithGoogle() {
    signIn("google", {
      callbackUrl: "/profile",
    });
  }

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
        password_confirm: passwordConfirm,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, passwordConfirm, login]);

  return (
    <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="Netflix Logo"
            priority
            width={96}
            height={48}
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant}
            </h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (isVariantRegister()) {
                  register();
                } else if (isVariantLogin()) {
                  login();
                }
              }}
            >
              <div className="flex flex-col gap-4">
                {authFormContainer[variant].map((input) => (
                  <Input
                    key={input.id}
                    id={input.id}
                    onChange={input.onChange}
                    value={input.value}
                    label={input.label}
                    type={input.type}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FcGoogle size={30} onClick={signInWithGoogle} />
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FaGithub size={30} onCLick={signInWithGithub} />
                </div>
              </div>
            </form>

            <p className="text-neutral-500 mt-12">
              {isVariantLogin()
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {isVariantLogin() ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
