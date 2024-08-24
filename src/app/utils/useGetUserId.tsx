import { useEffect, useState } from "react";

const useGetUserId = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = () => {
      const id = localStorage.getItem("userId") || "";
      setUserId(id);
    };

    fetchUserId();
  }, []);

  return userId;
};

export default useGetUserId;
