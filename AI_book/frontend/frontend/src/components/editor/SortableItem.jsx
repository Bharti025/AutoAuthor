import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical,Sparkles,Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
export default function SortableItem({chapter,index,selectedChapterIndex,onSelectChapter,onDeleteChapter,onGenerateChapterContent,isGenerating }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id:chapter._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
     className=""
    >
      <button className={`flex-1 flex items-center p-3 text-sm rounded-l-lg text-left transition-colors ${selectedChapterIndex===index
        ?"bg-violet-50/50 text-violet-800 font-semibold":"text-slate-600 hover:bg-slate-600"
      }`} onClick={()=>onSelectChapter(index)}>
      <GripVertical className="h-4 w-4 text-slate-400 mr-2 cursor" {...listeners} {...attributes}/>
      <span className="truncate">{chapter.title}</span>
      </button>
         <div className="flex items-center ml-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity px-2 py-3 absolute right-0">
                <Button variant="ghost" size="small" className="py-3 px-2" 
                onClick={() => onGenerateChapterContent(index)} 
                isLoading={isGenerating === index} title="Generate content with AI">
                    {isGenerating !== index && <Sparkles className="w-3.5 h-3.5 text-violet-800"/>}
                </Button>
                <Button variant="ghost" size="small" className="py-2 px-2" onClick={() => onDeleteChapter(index)} title="Delete chapter">
                    <Trash2 className="w-3.5 h-3.5 text-red-500"/>
                </Button>
            </div>
    </div>
  );
}