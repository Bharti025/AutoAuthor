import React,{useState,useEffect,useRef} from 'react'
import {Trash2,Plus,Sparkles,Hash,BookOpen,Palette, Check,ArrowLeft} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Modal from "../ui/Modal";
import { Input} from '../ui/input';
import {Select,SelectContent,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "../ui/select.jsx"
import { Button } from '../ui/Button';
import { Label } from '../ui/label';
import axios from 'axios';
import { Backend_Url } from '@/utils/apiPath';
import { API_PATHS } from '@/utils/apiPath';
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext';


const CreateBookModal = ({isOpen,onClose,onBookCreated}) => {
    const {user}=useAuth();
    const [step,setStep]=useState(1);
    const [title,setTitle]=useState("");
    const [numChapters,setnumChapters]=useState(5);
    const [aiTopic,setAiTopic]=useState("");
    const [aiStyle,setAiStyle]=useState("Informative");
    const [chapters,setChapters]=useState([]);
    const [isGenerationgOutline,setIsGeneratingOutline]=useState(false);
    const [isFinalizingBook,setIsFinalizingBook]=useState(false);
    const chapterContainRef=useRef(null);
   const navigate=useNavigate();
   
   const restModal=()=>{
    setStep(1);
    setTitle("");
    setChapters([]);
    setnumChapters(1);
    setAiTopic("");
    setAiStyle("Informative");
    setIsGeneratingOutline(false);
    setIsFinalizingBook(false);
   }

  
   const handleGenerateOutline=async()=>{
   if(!title||!numChapters){
    toast.error("Please provide book title and number of chapters");
   return;
   }
   setIsGeneratingOutline(true);
   try{
     const token = localStorage.getItem("token"); // get token
    const response=await axios.post(`${Backend_Url}${API_PATHS.AI.GENERATE_OUTLINE}`,{
     topic:title,
     numChapters:numChapters,
     description:aiTopic,
     style:aiStyle
    }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Outline response",response.data);
    setChapters(response.data.outline);
    setStep(2);
    toast.success("Outline generated successfully. You can review and edit the chapters now.");
   } catch (error) {
    toast.error("Failed to generate outline");
    console.log("Outline",error);
   } finally {
    setIsGeneratingOutline(false);
   }
  }

  const handleChapterChange=async(index,field,value)=>{
   const updateChapters=[...chapters];
   updateChapters[index][field]=value;
   setChapters(updateChapters)
  }

  const handleDeleteChapter=async(index)=>{
    if(chapters.length<=1){
        return;
    }
    const updateChapters=chapters.filter((_,i)=>i!==index);
    setChapters(updateChapters)
  }

  const handleAddChapter=()=>{
    setChapters([...chapters,{title:`Chapter ${chapters.length+1}`,description:""}])
  }

const handleFinalizeBook= async ()=>{
if(!title|| chapters.length==0){
  toast.error("Book title and atleast one chapter are required");
  return;
}

setIsFinalizingBook(true);
const token=localStorage.getItem("token");
try{
const response=await axios.post(`${Backend_Url}${API_PATHS.BOOKS.CREATE_BOOK}`,{
  title:title,
  author:user.name||"Unknown Author",
  chapters:chapters},
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
);
console.log("Chapter content response",response.data);
toast.success("Book created succesfully");
onBookCreated(response.data._id);
onClose();
restModal();
}
catch(err){
console.log("TEST",title,chapters);
toast.error("Failed to create the book");
}
}

useEffect(()=>{
    if(step==2 && chapterContainRef.current){
        const scrollabledev=chapterContainRef.current;
        scrollabledev.scrollTo({
            top:scrollabledev.scrollHeight,
            behaviour:"smooth"
        })
    }
},[chapters.length,step])



  return (
  <Modal isOpen={isOpen} onClose={() => {onClose();
    restModal();
  }} title="Create new EBook">
    
  {step==1 && 
  <div className='flex flex-col gap-4'>
    <div className='flex items-start gap-4'>
      <div className='rounded-full bg-violet-200 text-black w-8 h-8 flex items-center justify-center'>1</div>
      <div className='flex-1 h-0.5 bg-gray-200 mt-2'></div>
        <div className='rounded-full bg-gray-200 text-black w-8 h-8 flex items-center justify-center'>2</div>
      </div>
      <Label htmlFor="book-title">Book Title</Label>
     <Input  id="book-title" label="Book Title" placeholder="Enter book title here" value={title}
     onChange={(e)=>setTitle(e.target.value)}/>
      <Label htmlFor="num-chapters">Number of Chapters</Label>
      <Input icon={<Hash/>} id="num-chapters" label="Number of Chapters" placeholder="Enter number of chapters" value={numChapters}
     onChange={(e)=>setnumChapters(parseInt(e.target.value) || 1)} min="1" max="20"/>
      <Label htmlFor="ai-topic">Topic (optional)</Label>
      <Input icon={<Hash/>} id="ai-topic" label="Topic (optional)" placeholder="Enter book topic here" value={aiTopic}
     onChange={(e)=>setAiTopic(e.target.value)} />
     <Select value={aiStyle} onValueChange={setAiStyle}>
      <Label htmlFor="ai-style">Writing Style</Label>
  <SelectTrigger className="flex items-center gap-2">
    <Palette size={26} />
    <SelectValue placeholder="Writing Style" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="Informative">Informative</SelectItem>
    <SelectItem value="Creative">Creative</SelectItem>
    <SelectItem value="Technical">Technical</SelectItem>
    <SelectItem value="Humorous">Humorous</SelectItem>
    <SelectItem value="Philosophy">Philosophy</SelectItem>
  </SelectContent>
</Select>

     <div className=''>
      <Button onClick={handleGenerateOutline} icon={<Sparkles/>} isLoading={isGenerationgOutline} className="bg-violet-500">
        Generate Outline with AI
      </Button>
     </div>
    </div>
   }

  

{step === 2 && (
                <div className="space-y-4">
                    {/* Progress indicator */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 text-sm font-semibold">
                            ✓
                        </div>
                        <div className="flex-1 h-0.5 bg-violet-600"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 text-sm font-semibold">
                            2
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Review Chapters
                        </h3>
                        <span className="text-sm text-gray-500">
                            {chapters.length} chapters
                        </span>
                    </div>

                    <div
                        ref={chapterContainRef}
                        className="space-y-3 max-h-96 overflow-y-auto pr-1"
                    >
                        {chapters.length === 0 ? (
                            <div className="text-center py-12 px-4 bg-gray-50 rounded-xl">
                                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 text-sm">
                                    No chapters yet. Add one to get started.
                                </p>
                            </div>
                        ) : (
                            chapters.map((chapter, index) => (
                                <div
                                    key={index}
                                    className="group p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white"
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold flex-shrink-0 mt-2">
                                            {index + 1}
                                        </div>

                                        <input
                                            type="text"
                                            value={chapter.title}
                                            onChange={(e) =>
                                                handleChapterChange(index, "title", e.target.value)
                                            }
                                            placeholder="Chapter Title"
                                            className="flex-1 text-base font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                                        />

                                        <button
                                            onClick={() => handleDeleteChapter(index)}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                                            title="Delete Chapter"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>

                                    <textarea
                                        value={chapter.description}
                                        onChange={(e) =>
                                            handleChapterChange(index, "description", e.target.value)
                                        }
                                        placeholder="Brief description of what this chapter covers..."
                                        rows={2}
                                        className="w-full pl-9 text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder-gray-400"
                                    />
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Button
                            variant="ghost"
                            onClick={() => setStep(1)}
                            icon={ArrowLeft}
                        >
                            Back
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleAddChapter}
                                icon={Plus}
                            >
                                Add Chapter
                            </Button>

                            <Button
                                onClick={handleFinalizeBook}
                                isLoading={isFinalizingBook}
                            >
                                Create eBook
                            </Button>
                        </div>
                    </div>
                </div>
            )}
   </Modal>
 
  )
}

export default CreateBookModal
