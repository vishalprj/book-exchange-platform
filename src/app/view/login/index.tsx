"use client";
import styles from "./login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/store/queries";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      if (response.data) {
        router.push("/");
        toast.success("User login successful!");
        localStorage.setItem("userId", response.data?.data?.id);
      }
    } catch (error) {
      toast.error("User login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.shape} ${styles.shapeFirst}`}></div>
        <div className={`${styles.shape} ${styles.shapeLast}`}></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h3>Login</h3>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          id="username"
          required
          {...register("username")}
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          required
          {...register("password")}
          className={styles.input}
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
          {loading}
        </button>
        <p className={styles.text}>
          New here?{" "}
          <Link href="/signup" className={styles.link}>
            Sign up for an account.
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
