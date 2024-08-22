"use client";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/store/queries";
import Link from "next/link";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await loginUser(data);
      if (response.data) {
        router.push("/");
        localStorage.setItem("userId", response.data?.data?.id);
      }
    } catch (error) {
      console.log(error);
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
          placeholder="Username"
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
          placeholder="Password"
          id="password"
          required
          {...register("password")}
          className={styles.input}
        />

        <button className={styles.button}>LOGIN</button>
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
