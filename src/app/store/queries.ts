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

export const fetchAllBook = async () => {
  const res = await axios.get("/api/book/book");
  if (!res.data) {
    throw new Error("Response was not ok");
  }
  return res.data.data;
};

//  get all books
export const useGetBook = () => {
  return useQuery(["books"], fetchAllBook);
};

// Add book
export const addBook = (data: any) => {
  return axios.post("/api/book/addbook", data);
};

export const useAddBook = () => {
  const queryClient = useQueryClient();
  return useMutation(addBook, {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
    onError: () => {
      console.log("error");
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
