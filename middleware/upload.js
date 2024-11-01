import multer from "multer";
import {multerSaveFilesOrg} from "multer-savefilesorg";


export const localUpload = multer({dest: 'uploads/'});

// export const todoIconUpload = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//         relativePath: '/final project/todos/*'

//     }),
//     preservePath: true
// });

export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/final project/users/*' 

    }),
    preservePath: true
});
