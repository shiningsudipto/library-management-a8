import express from "express";
import { bookController } from "./book.controller";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/:bookId", bookController.getBookById);
router.put("/:bookId", bookController.updateBook);
router.delete("/:bookId", bookController.deleteBook);
router.post("/", bookController.createBook);
router.post("/many", bookController.createManyBooks);

export const BookRoutes = router;
