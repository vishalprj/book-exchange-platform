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
    onError: () => {
      toast.error("Failed to added book");
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
