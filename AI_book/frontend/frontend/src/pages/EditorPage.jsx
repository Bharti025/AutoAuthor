import React from 'react'
import {useEffect,useState,useRef} from "react";
import {useParams,useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { Sparkles,FileDown,Save,Menu,X,Edit,NotebookText,ChevronDown,FileText } from 'lucide-react';
import axios from "axios";
import {arrayMove} from "@dnd-kit/sortable";
import ChapterSidebar from '@/components/editor/ChapterSidebar';
import { Backend_Url } from '@/utils/apiPath';
import DropDown, { DropDownItem } from "../components/ui/DropDown";
import { API_PATHS } from '@/utils/apiPath';
import { useAuth } from '@/components/context/authContext';
import { Input } from '@/components/ui/input';
 import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ChapterEditorTab from '@/components/editor/ChapterEditorTab';
import SimpleMdEditor from '@/components/editor/SimpleMDEditor';
import BookDetailsTab from '@/components/editor/BookDetailsTab';
const EditorPage = () => {
  const {bookId}=useParams();
  const navigate=useNavigate();
  const [book,setBook]=useState(null);
  const [isLoading,setIsLoading]=useState(true);
  const [isSaving,setIsSaving]=useState(false);
  const [isUploading,setIsUploading]=useState(false);
const [selectedChapterIndex,setSelectedChapterIndex]=useState(0);
const [activeTab,setActiveTab]=useState("editor");
const fileInputRef=useRef(null);
const [isSideBaropen,setIsSidebarOpen]=useState(true);
const [isOutlineModalOpen,setIsOutlineModalOpen]=useState(false);
const [aiTopic,setAiTopic]=useState("");
const [aiStyle,setAiStyle]=useState("Informative");
const [isGenerating,setIsGenerating]=useState(false);

useEffect(()=>{
  console.log("Fetch book id",bookId);
  const fetchBook=async()=>{
    try{
      const token = localStorage.getItem("token");
       const response=await axios.get(`${Backend_Url}${API_PATHS.BOOKS.GET_BOOK_BY_ID}${bookId}`,
     {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    setBook(response.data);
    }
    catch(err){
      console.log("Editor fetch",err);
       toast.error("Failed to load book");
    }
    finally {
    setIsLoading(false); // ✅ important
  }
  }
  fetchBook();

},[bookId,navigate]);

const handleBookChange=(e)=>{
const {name,value}=e.target;
setBook((prev)=>({...prev,[name]:value}));
}

 const handleChapterChange = (e) => {
        const { name, value } = e.target;
        const updatedChapters = [...book.chapters];
        updatedChapters[selectedChapterIndex][name] = value;
        setBook((prev) => ({ ...prev, chapters: updatedChapters }));
    };

    const handleAddChapter = () => {
        const newChapter = {
            title: `Chapter ${book.chapters.length + 1}`,
            content: "",
        };

        const updatedChapters = [...book.chapters, newChapter];
        setBook((prev) => ({ ...prev, chapters: updatedChapters }));
        setSelectedChapterIndex(updatedChapters.length - 1);
    };

    const handleDeleteChapter = (index) => {
        if (book.chapters.length <= 1) {
            toast.error("A book must have at least one chapter.");
            return;
        }
        const updatedChapters = book.chapters.filter((_, i) => i !== index);
        setBook((prev) => ({ ...prev, chapters: updatedChapters }));

        setSelectedChapterIndex((prevIndex) =>
            prevIndex >= index ? Math.max(0, prevIndex - 1) : prevIndex
        );
    };

    const handleReorderChapters = (oldIndex, newIndex) => {
        setBook((prev) => ({
            ...prev,
            chapters: arrayMove(prev.chapters, oldIndex, newIndex),
        }));

        // Keep selected chapter consistent after reorder
        setSelectedChapterIndex(newIndex);
    };

    const handleSaveChanges = async (bookToSave = book, showToast = true) => {
        setIsSaving(true);

        try {
          const token=localStorage.getItem("token");
            await axios.put(
                `${Backend_Url}${API_PATHS.BOOKS.UPDATE_BOOK}${bookId}`,
                bookToSave,{
                  
                   headers: {
          Authorization: `Bearer ${token}`,
        }
      }
                
            );

            if (showToast) {
                toast.success("Changes saved successfully!");
            }
        } catch (error) {
            console.log("ERRRr", error);
            toast.error("Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCoverImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("coverImage", file);
        setIsUploading(true);

        try {
          const token=localStorage.getItem("token");
            const response = await axios.put(
                `${Backend_Url}${API_PATHS.BOOKS.UPDATE_COVER}/${bookId}`,
                formData,
                {
                    headers: 
                    { Authorization: `Bearer ${token}`}
                  
                }
            );
            console.log("cover image",response.data);
            setBook(response.data);
            toast.success("Cover image updated!");
        } catch (error) {
            toast.error("Failed to upload cover image.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleGenerateChapterContent = async (index) => {
        const chapter = book.chapters[index];
        if (!chapter || !chapter.title) {
            toast.error("Chapter title is required to generate content.");
            return;
        }
        setIsGenerating(index);
        try {
          const token=localStorage.getItem("token");
            const response = await axios.post(
                `${Backend_Url}${API_PATHS.AI.GENERATE_CHAPTER_CONTENT}`,
                {
                    chapterTitle: chapter.title,
                    chapterDescription: chapter.description || "",
                    style: aiStyle,
                },{
                   headers: {
                   Authorization: `Bearer ${token}`,
               },
                }
            );

            const updatedChapters = [...book.chapters];
            updatedChapters[index].content = response.data.content;

            const updatedBook = {...book, chapters: updatedChapters};
            setBook(updatedBook);
            toast.success(`Content for "${chapter.title}" generated!`);

            await handleSaveChanges(updatedBook, false);
        } catch (error) {
          console.log("Generate chapter",error);
          toast.error("Failed to generate chapter content.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExportPDF = async () => {
        toast.loading("Generating PDF...");

        try {
          const token=localStorage.getItem("token");
            const response = await axios.get(
                `${Backend_Url}${API_PATHS.EXPORT.PDF}/${bookId}/pdf`,
                {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${book.title}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.dismiss();
            toast.success("PDF export started!");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to export PDF.");
        }
    };

    const handleExportDoc = async () => {
        toast.loading("Generating Document...");

        try {
            const token=localStorage.getItem("token");
            const response = await axios.get(
                `${Backend_Url}${API_PATHS.EXPORT.DOC}/${bookId}/doc`,
                {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
                
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${book.title}.docx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.dismiss();
            toast.success("Document export started!");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to export document.");
        }
    };

 

if(isLoading||!book){
  return(
    <div className='flex h-screen items-center justify-center'>
    <p>Loading Editor...</p>
    </div>
  )
}

  return (
    <div className='flex bg-slate-50 font-sans relative min-h-screen'>
      {isSideBaropen &&
        <div className='fixed  inset-0 z-40 flex' role="dialog" aria-modal="true">
         
          <div className='fixed inset-0 bg-black/20 bg-opacity-50' aria-hidden="true"
           onClick={()=>setIsSidebarOpen(false)}>
            </div>
            <div className="relative flex-1 flex-col max-w-xs w-full bg-white shaow-xl">
              <div className='absolute top-0 right-0 mr-12 pt-2'>
                <button type="button" className='ml-1 flex items-center justify-center h-10 w-10
                 rounded-full focus:outline-none
                ' onClick={()=>setIsSidebarOpen(false)}><span className="sr-only">Close SideBar</span>
                <X className='h-6 w-6 text-black'/></button>
                </div>
                <ChapterSidebar book={book} selectedChapterIndex={selectedChapterIndex} onSelectChapter={
                  (index)=>{setSelectedChapterIndex(index);
                    setIsSidebarOpen(false);
                  }} onAddChapter={handleAddChapter}
                  onDeleteChapter={handleDeleteChapter}
                  isGenerating={isGenerating}
                  onGenerateChapterContent={handleGenerateChapterContent}
                  onReorderChapters={handleReorderChapters}/>
              </div>
              <div className='flex-shrink-0 w-14' aria-hidden="true"></div>
          </div>
      }
       <main className="flex-1 h-full flex flex-col">
                    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 text-slate-500 hover:text-slate-800"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <div className="hidden sm:flex space-x-1 bg-slate-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab("editor")}
                                    className={`flex items-center justify-center flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                                        activeTab === "editor"
                                            ? "bg-white text-slate-800 shadow-sm"
                                            : "text-slate-500 hover:text-slate-700"
                                    }  `}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Editor
                                </button>
                                <button
                                    onClick={() => setActiveTab("details")}
                                    className={`flex items-center justify-center flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                                        activeTab === "details"
                                            ? "bg-white text-slate-800 shadow-sm"
                                            : "text-slate-500 hover:text-slate-700"
                                    }`}
                                >
                                    <NotebookText className="w-4 h-4 mr-2"/>
                                    Book Details
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <DropDown
                                trigger={
                                    <Button variant="secondary">
                                        Export
                                        <ChevronDown className="w-4 h-4 ml-1" />
                                    </Button>
                                }
                            >
                                <DropDownItem onClick={handleExportPDF}>
                                    <FileText className="w-4 h-4 mr-2 text-slate-500" />
                                    Export as PDF
                                </DropDownItem>

                                <DropDownItem onClick={handleExportDoc}>
                                    <FileText className="w-4 h-4 mr-2 text-slate-500" />
                                    Export as Document
                                </DropDownItem>
                            </DropDown>

                            <Button className="bg-violet-600"
                                onClick={() => handleSaveChanges()}
                                isLoading={isSaving}>Save Changes
                            </Button>
                        </div>
                    </header>

                    <div className="w-full">
                        {activeTab === "editor" ? (
                            <ChapterEditorTab
                                book={book}
                                selectedChapterIndex={selectedChapterIndex}
                                onChapterChange={handleChapterChange}
                                onGenerateChapterContent={handleGenerateChapterContent}
                                isGenerating={isGenerating}
                            />
                        ) : (
                            <BookDetailsTab
                                book={book}
                                onBookChange={handleBookChange}
                                onCoverUpload={handleCoverImageUpload}
                                isUploading={isUploading}
                                fileInputRef={fileInputRef}
                            />
                        )}
                    </div>
                </main>
    </div>)
}

export default EditorPage
