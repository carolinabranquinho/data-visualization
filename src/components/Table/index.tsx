import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const books = require("../../data/books.json");

export type BookType = {
  Rank: number;
  title: string;
  price: number;
  rating: number;
  author: string;
  publication: number;
  genre: string;
  url: string;
};

export default function TableComponent() {
  return (
    <>
      <h1>Top 100 Bestselling Books here</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell align="left">Book Title</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Genre</TableCell>
              <TableCell align="left">Publication</TableCell>
              <TableCell align="left">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book: BookType) => (
              <TableRow
                key={book.Rank}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {book.Rank}
                </TableCell>
                <TableCell component="th" scope="row">
                  {book.title}
                </TableCell>
                <TableCell align="left">{book.author}</TableCell>
                <TableCell align="left">{book.genre}</TableCell>
                <TableCell align="left">{book.publication}</TableCell>
                <TableCell align="left">{book.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
