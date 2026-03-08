import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir="uploads";
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadDir);
    },
    filename:function(req,file,cb){
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    }
});

function checkfileType(file,cb){
    const filetypes=/jpeg|jpg|png|gif/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);
    if(extname && mimetype){
        cb(null,true);
    }else{
        cb(new Error("Invalid file type"));
    }
}

export const upload=multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},
    filefilter:function(req,file,cb){
        checkfileType(file,cb);
    }
}).single("coverImage");

