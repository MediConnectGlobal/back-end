import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// export const localUpload = multer({ dest: 'uploads/' });

export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/final project/users/*'
    }),
    preservePath: true
});

export const adminAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/final project/admins/*'
    }),
    preservePath: true
});

export const staffAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/final project/staff/*'
    }),
    preservePath: true
});

export const testfileUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/final project/tests/*'
    }),
    preservePath: true
});

export const testImageUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/final project/tests/*'
    }),
    preservePath: true
});