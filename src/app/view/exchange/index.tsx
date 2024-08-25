"use client";
import styles from "./exchange.module.css";
import {
  useExchangeRequestApproved,
  useFetchExchangeRequest,
} from "@/app/store/queries";
import { ExchangeRequest, HandleApprovedType } from "@/app/types";
import useGetUserId from "@/app/utils/useGetUserId";

const ExchangePage = () => {
  const userId = useGetUserId();
  const { data } = useFetchExchangeRequest(userId);
  const { mutate: exchangeData } = useExchangeRequestApproved();
  const exchangeList = data?.data || [];
  const handleApproved: HandleApprovedType = async (
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
    try {
      exchangeData(payload);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.exchangePage}>
      <h1 className="text-3xl mb-8">Exchange Books</h1>

      {exchangeList?.length > 0 ? (
        exchangeList?.map((exchange: ExchangeRequest) => (
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

            <div className={styles.buttonGroup}>
              {exchange.status === "approved" ? (
                <div className={styles.approvedStatus}>Approved</div>
              ) : (
                exchange.ownerId === userId && (
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.approveButton}
                      onClick={() =>
                        handleApproved(
                          exchange.requestedBook?.id,
                          exchange.requestedBook?.userId,
                          exchange.offeredBook?.id,
                          exchange.offeredBook?.userId
                        )
                      }
                    >
                      Approve
                    </button>
                    <button className={styles.declineButton}>Decline</button>
                  </div>
                )
              )}
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
