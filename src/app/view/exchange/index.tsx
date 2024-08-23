"use client";

import { useEffect, useState } from "react";
import styles from "./exchange.module.css";
import { fetchExchangeRequest } from "@/app/store/queries";

const ExchangePage = () => {
  const [data, setData] = useState([]);
  const UserId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchExchangeRequest(UserId);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.exchangePage}>
      <h1 className="text-4xl mb-8">Exchange Books</h1>

      {data.length > 0 ? (
        data.map((exchange) => (
          <section key={exchange.id} className={styles.exchangeContainer}>
            <div className={styles.bookDetails}>
              <h3>Requested Book</h3>
              <p>Title: {exchange?.requestedBook?.title}</p>
              <p>Author: {exchange?.requestedBook?.author}</p>
              <p>Genre: {exchange?.requestedBook?.genre}</p>
            </div>

            <div className={styles.bookDetails}>
              <h3>Offered Book</h3>
              <p>Title: {exchange.offeredBook.title}</p>
              <p>Author: {exchange.offeredBook.author}</p>
              <p>Genre: {exchange.offeredBook.genre}</p>
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.approveButton}>Approve</button>
              <button className={styles.declineButton}>Decline</button>
            </div>
          </section>
        ))
      ) : (
        <p className={styles.noExchanges}>No exchange requests found.</p>
      )}
    </div>
  );
};

export default ExchangePage;
