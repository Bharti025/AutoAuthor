import Book from "../models/Book.js";
//post book
export const createBook=async(req,res)=>{
    try{
    const {title,author,subtitle,chapters}=req.body;
    if(!title || !author ){
        return res.status(400).json({message:"Please fill all details carefully"})
    }
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    const book=await Book.create({
        userId:req.user.id,
        title,
        author,
        subtitle,
        chapters
    });
    res.status(201).json(book);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export const getBooks=async(req,res)=>{
    try{
     const books=await Book.find({userId:req.user.id}).sort({createdAt:-1});
     res.status(201).json(books);
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
}

export const getBookById=async(req,res)=>{
try{
 console.log("BOOK ID",req.params.id);
const book=await Book.findById(req.params.id);
if(!book){
    return res.status(404).json({message:"Book not found"});
}
if(book.userId.toString()!==req.user.id.toString()){
    return res.status(401).json({message:"Not authorized to view this book"});
}
res.status(200).json(book);
}
catch(err){
    console.log("Error fetching book",err);
res.status(500).json({message:"Server Error"});
}
}

export const updateBook=async(req,res)=>{
    try{
   const updateBook=await Book.findById(req.params.id);
   if(!updateBook){
    return res.status(404).json({message:"Book not found"});
   }   
   if(updateBook.userId.toString()!=req.user.id.toString()){
    return res.status(401).json({message:"Not authorized to update this book"});
   }
   const updatedBook=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
   res.status(200).json(updatedBook);
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
}

export const deleteBook=async(req,res)=>{
console.log("params",req.params.id);
try{
const book=await Book.findById(req.params.id);
console.log("book",book);
 if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        console.log("book userId",book.userId.toString());
        console.log("user userId",req.user.id.toString());

if (book.userId.toString()!==req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this book" });
        }
        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully"});

}
catch(err){
     res.status(500).json(err);
}
}

export const updateBookCover=async(req,res)=>{
 try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }

        if (book.userId.toString() !== req.user.id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        book.coverImage = `/${req.file.path}`;
        const updateBook = await book.save();

        res.status(200).json(updateBook);

    } catch (error) {
        console.error('Update book cover error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
