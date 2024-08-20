"use client";
import styles from "./signup.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/app/store/queries";
import Link from "next/link";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await signUpUser(data);
      if (response.data) {
        router.push("/");
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
          type="text"
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
        <button className={styles.button}>CREATE ACCOUNT</button>
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
