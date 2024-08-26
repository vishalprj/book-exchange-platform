"use client";
import styles from "./signup.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/app/store/queries";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const response = await signUpUser(data);
      if (response.data) {
        router.push("/login");
        toast.success("User registered successfully");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to register user";
      toast.error(errorMessage);
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
        <h3>Create an account</h3>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          required
          {...register("username")}
          className={styles.input}
        />
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          required
          {...register("email")}
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          required
          {...register("password")}
          className={styles.input}
        />
        <button className={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
          {loading}
        </button>
        <p className={styles.text}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Login instead.
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
