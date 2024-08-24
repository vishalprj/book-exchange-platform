export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserBook = {
  id: string;
  userId: string;
  title: string;
  author: string;
  genre: string;
  status: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BookRespond = {
  id: string;
  userId: string;
  title: string;
  author: string;
  genre: string;
  status: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  userId: string;
  image: string;
};

export type ExchangeRequest = {
  id: string;
  requestedBook: Book;
  offeredBook: Book;
  ownerId: string;
  status: string;
};

export type HandleApprovedType = (
  requestedBookId: string,
  requestedBookUserId: string,
  offeredBookId: string,
  offeredBookUserId: string
) => void;
