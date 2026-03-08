import React from 'react'
import {ArrowLeft} from "lucide-react";
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from './SortableItem';

  const ChapterSidebar = ({book,selectedChapterIndex,onSelectChapter,onAddChapter,
  onDeleteChapter,onReorderChapters,onGenerateChapterContent,isGenerating}) => {
  const navigate = useNavigate();
  const chapterIds=book.chapters.map((chapter,index)=>chapter._id || `new-${index}`);

  const handleDragEnd=(event)=>{
  const {active,over}=event;
  if(active.id!==over.id){
   const oldIndex=chapterIds.indexOf(active.id);
   const newIndex=chapterIds.indexOf(over.id);
   onReorderChapters(oldIndex,newIndex);
  }
  }

  return (
    <aside className='w-80 h-full bg-white border-r border-slate-200 flex flex-col'>
      <div className='p-4 border-b border-slate-200'>
        <Button variant='ghost' size="sm" onClick={()=>navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />Back to Dashboard
        </Button>
         <h2 className="text-base font-semibold" title={book.title}>{book.title}</h2>
      </div>
      <div className='flex-1 overflow-y-auto'>
     <DndContext collisionDetection={closestCenter}
     onDragEnd={handleDragEnd}>
     <SortableContext items={chapterIds} strategy={verticalListSortingStrategy}>
      <div className='p-4 space-y-2'>
     {book.chapters.map((chapter,index)=>
        <SortableItem key={chapter._id || `new-${index}`} id={chapter._id || `new-${index}`} chapter={chapter} index={index} 
        onSelectChapter={onSelectChapter} selectedChapterIndex={selectedChapterIndex} onDeleteChapter={onDeleteChapter}
        onGenerateChapterContent={onGenerateChapterContent} isGenerating={isGenerating}/>
     )}
      </div>
   </SortableContext>
   </DndContext>
      </div>
      <div className='p-4 border-t border-slate-200'>
        <Button variant="secondary" onClick={onAddChapter} className="w-full"><Plus/> New Chapter</Button>

      </div>
    </aside>
  )
}

export default ChapterSidebar
