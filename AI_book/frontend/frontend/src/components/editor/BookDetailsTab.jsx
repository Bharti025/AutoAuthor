import {Input} from "../ui/Input";
import {Button} from "../ui/Button";
import { UploadCloud } from "lucide-react";
import { Backend_Url } from "@/utils/apiPath";
const BookDetailsTab = ({
                            book,
                            onBookChange,
                            onCoverUpload,
                            isUploading,
                            fileInputRef,
                        }) => {
const coverImageUrl = book.coverImage
    ? book.coverImage.startsWith("http")
        ? book.coverImage
        : `${Backend_Url}/${book.coverImage.replace(/\\/g, "/").replace(/^\/+/, "")}`
    : null;
    
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Book Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Title"
                        name="title"
                        value={book.title}
                        onChange={onBookChange}
                    />
                    <Input
                        label="Author"
                        name="author"
                        value={book.author}
                        onChange={onBookChange}
                    />
                    <div className="md:col-span-2">
                        <Input
                            label="Subtitle"
                            name="subtitle"
                            value={book.subtitle || ""}
                            onChange={onBookChange}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Cover Image
                </h3>

                <div className="flex items-start gap-6">
                    {coverImageUrl ? (
                        <img
                            src={coverImageUrl}
                            alt="Cover"
                            className="w-32 h-48 object-cover rounded-lg bg-slate-100 shadow"
                        />
                    ) : (
                        <div className="w-32 h-48 flex items-center justify-center rounded-lg bg-slate-100 text-slate-400 text-sm">
                            No Cover
                        </div>
                    )}

                    <div>
                        <p className="text-sm text-slate-600 mb-4">
                            Upload a new cover image. Recommended size: 600×800px.
                        </p>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onCoverUpload}
                            accept="image/*"
                            hidden
                        />

                        <Button
                            variant="secondary"
                            onClick={() => fileInputRef.current.click()}
                            isLoading={isUploading}
                            icon={UploadCloud}
                        >
                            Upload Image
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsTab;