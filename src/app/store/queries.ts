import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

// login user
export const loginUser = (data: any) => {
  return axios.post("/api/users/login", data);
};

// signup user
export const signUpUser = (data: any) => {
  return axios.post("/api/users/signup", data);
};

// logout user
export const logoutUser = () => {
  return axios.get("/api/users/logout");
};

export const fetchAllBook = async (userId: any) => {
  const res = await axios.post("/api/book/listbook", { userId });
  if (!res.data) {
    throw new Error("Response was not ok");
  }
  return res.data;
};

//  get all books
export const useGetBook = (userId: any) => {
  return useQuery(["books", userId], () => fetchAllBook(userId));
};

// list all books for user only
export const listBook = async (userId: any) => {
  const res = await axios.post("/api/book/listbook", { userId });
  return res.data;
};

// Add book
export const addBook = (data: any) => {
  return axios.post("/api/book/addbook", data);
};

export const useAddBook = () => {
  const queryClient = useQueryClient();
  return useMutation(addBook, {
    onSuccess: () => {
      toast.success("Book added successfully");
      queryClient.invalidateQueries("books");
    },
    onError: (error) => {
      const message = error?.response?.data?.error;
      toast.error(message);
    },
  });
};

// update book

const updateBook = (data: any) => {
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
      toast.error("Failed to updated book");
    },
  });
};

// delete book

export const deleteBook = (id) => {
  return axios.post("/api/book/deletebook", id);
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBook, {
    onSuccess: () => {
      toast.success("Book delete successfully");
      queryClient.invalidateQueries("books");
    },
    onError: () => {
      toast.error("Failed to delete book");
    },
  });
};

// list other user all books

export const fetchOtherUserAllBook = async (userId: any) => {
  const res = await axios.post("/api/book/otherlistbook", { userId });
  if (!res.data) {
    throw new Error("Something went wrong");
  }
  return res.data;
};

//  get all books
export const useUsersAllBooks = (userId: any) => {
  return useQuery(["books", userId], () => fetchOtherUserAllBook(userId));
};

// exchange list
export const fetchExchangeRequest = async (userId: any) => {
  const res = await axios.post("/api/book/exchangelist", { userId });
  return res.data;
};

export const exchangeRequest = async (data: any) => {
  const res = await axios.post("api/book/exchange", data);
  return res.data;
};

export const exchangeRequestApproved = (data: any) => {
  return axios.patch("/api/book/exchangebook", data);
};

export const useExchangeRequestApproved = () => {
  return useMutation(exchangeRequestApproved, {
    onSuccess: () => {
      toast.success("Exchange book successfully");
    },
    onError: () => {
      toast.error("Failed to exchange book");
    },
  });
};

// Match API
export const fetchMatchBook = async (userId: any) => {
  const res = await axios.post("/api/book/match", { userId });
  return res.data;
};

export const useFetchMatchBook = (userId: any) => {
  return useQuery(["match"], () => fetchMatchBook(userId));
};
