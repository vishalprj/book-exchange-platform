import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Book, BookRespond, ExchangeRequest } from "../types";

export const loginUser = (data: { username: string; password: string }) => {
  return axios.post("/api/users/login", data);
};

export const signUpUser = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return axios.post("/api/users/signup", data);
};

export const logoutUser = () => {
  return axios.get("/api/users/logout");
};

export const fetchAllBook = async (userId: string) => {
  const res: AxiosResponse<BookRespond[]> = await axios.post(
    "/api/book/listbook",
    {
      userId,
    }
  );
  if (!res.data) {
    throw new Error("Response was not ok");
  }
  return res.data;
};

export const useGetBook = (userId: string) => {
  return useQuery<BookRespond[], Error>(
    ["books", userId],
    () => fetchAllBook(userId),
    {
      enabled: !!userId,
    }
  );
};

export const listBook = async (userId: string) => {
  const res: AxiosResponse<BookRespond[]> = await axios.post(
    "/api/book/listbook",
    {
      userId,
    }
  );
  return res.data;
};

export const addBook = (
  data: Omit<BookRespond, "id" | "createdAt" | "updatedAt">
) => {
  return axios.post("/api/book/addbook", data);
};

export const useAddBook = () => {
  const queryClient = useQueryClient();
  return useMutation(addBook, {
    onSuccess: () => {
      toast.success("Book added successfully");
      queryClient.invalidateQueries("books");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Failed to add book";
      toast.error(message);
    },
  });
};

const updateBook = (data: Partial<BookRespond>) => {
  return axios.put("/api/book/updatebook", data);
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBook, {
    onSuccess: () => {
      toast.success("Book updated successfully");
      queryClient.invalidateQueries("books");
    },
    onError: () => {
      toast.error("Failed to update book");
    },
  });
};

export const deleteBook = (id: string) => {
  return axios.post("/api/book/deletebook", { id });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBook, {
    onSuccess: () => {
      toast.success("Book deleted successfully");
      queryClient.invalidateQueries("books");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || "Failed to delete book";
      toast.error(errorMessage);
    },
  });
};

export const fetchOtherUserAllBook = async (userId: string) => {
  const res: AxiosResponse<BookRespond[]> = await axios.post(
    "/api/book/otherlistbook",
    { userId }
  );
  if (!res.data) {
    throw new Error("Something went wrong");
  }
  return res.data;
};

export const useGetAllBooks = (userId: string) => {
  return useQuery<BookRespond[], Error>(
    ["books", userId],
    () => fetchOtherUserAllBook(userId),
    {
      enabled: !!userId,
    }
  );
};

export const fetchExchangeRequest = async (userId: string) => {
  const res = await axios.post("/api/book/exchangelist", { userId });
  return res?.data;
};

export const useFetchExchangeRequest = (userId: string) => {
  return useQuery(
    ["exchangeRequest", userId],
    () => fetchExchangeRequest(userId),
    {
      enabled: !!userId,
    }
  );
};

export const exchangeRequest = async (data: Partial<ExchangeRequest>) => {
  const res: AxiosResponse<ExchangeRequest> = await axios.post(
    "api/book/exchange",
    data
  );
  return res.data;
};

export const exchangeRequestApproved = (data: Partial<ExchangeRequest>) => {
  return axios.patch("/api/book/exchangebook", data);
};

export const useExchangeRequestApproved = () => {
  const queryClient = useQueryClient();
  return useMutation(exchangeRequestApproved, {
    onSuccess: () => {
      queryClient.invalidateQueries("exchangeRequest");
      toast.success("Exchange book successfully");
    },
    onError: () => {
      toast.error("Failed to exchange book");
    },
  });
};

export const fetchMatchBook = async (userId: string): Promise<Book[]> => {
  const res: AxiosResponse<Book[]> = await axios.post("/api/book/match", {
    userId,
  });
  return res.data;
};

export const useFetchMatchBook = (userId: string) => {
  return useQuery<Book[], Error>(
    ["match", userId],
    () => fetchMatchBook(userId),
    {
      enabled: !!userId,
    }
  );
};
