"use client";
import { useEffect, useState } from "react";
import styles from "./exchange.module.css";
import {
  fetchExchangeRequest,
  useExchangeRequestApproved,
} from "@/app/store/queries";
import { ExchangeRequest, HandleApprovedType } from "@/app/types";

const ExchangePage = () => {
  const [data, setData] = useState<ExchangeRequest[]>([]);
  const userId = localStorage.getItem("userId");
  const { mutate: exchangeData } = useExchangeRequestApproved();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const res = await fetchExchangeRequest(userId);
          setData(res?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [userId]);

  const handleApproved: HandleApprovedType = (
    requestedBookId,
    requestedBookUserId,
    offeredBookId,
    offeredBookUserId
  ) => {
    const payload = {
      requesterId: offeredBookUserId,
      requestedBookId,
      ownerId: requestedBookUserId,
      offeredBookId,
    };
    exchangeData(payload);
  };

  return (
    <div className={styles.exchangePage}>
      <h1 className="text-4xl mb-8">Exchange Books</h1>

      {data.length > 0 ? (
        data.map((exchange) => (
          <section key={exchange.id} className={styles.exchangeContainer}>
            <div className={styles.bookGroup}>
              <div className={styles.bookDetails}>
                <h3 className={styles.bookHeading}>Requested Book</h3>
                <p>Title: {exchange.requestedBook?.title}</p>
                <p>Author: {exchange.requestedBook?.author}</p>
                <p>Genre: {exchange.requestedBook?.genre}</p>
              </div>

              <div className={styles.bookDetails}>
                <h3 className={styles.bookHeading}>Offered Book</h3>
                <p>Title: {exchange.offeredBook.title}</p>
                <p>Author: {exchange.offeredBook.author}</p>
                <p>Genre: {exchange.offeredBook.genre}</p>
              </div>
            </div>
            {exchange.status === "pending" && exchange.ownerId === userId ? (
              <div className={styles.buttonGroup}>
                <button
                  className={styles.approveButton}
                  onClick={() =>
                    handleApproved(
                      exchange.requestedBook.id,
                      exchange.requestedBook.userId,
                      exchange.offeredBook.id,
                      exchange.offeredBook.userId
                    )
                  }
                >
                  Approve
                </button>
                <button className={styles.declineButton}>Decline</button>
              </div>
            ) : (
              <div className={styles.buttonGroup}>
                <button className={styles.approveButton} disabled>
                  Approved
                </button>
              </div>
            )}
          </section>
        ))
      ) : (
        <p className={styles.noExchanges}>No exchange requests found.</p>
      )}
    </div>
  );
};

export default ExchangePage;
