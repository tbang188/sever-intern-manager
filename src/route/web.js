import express from "express";
import multer from "multer";
// import { fs } from "fs";

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    //Rest api - MVC
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    //--------------------------------------------------------------------------------

    router.post("/api/login", userController.handleLogin);

    //--------------------------------------------------------------------------------

    router.get("/api/get-all-users", userController.handleGetAllUsers); // tat ca user
    router.get(
        "/api/get-all-studentmanager",
        userController.handleGetAllStudentManager
    ); // lay tt giao vu
    router.get("/api/get-all-lecturer", userController.handleGetAllLecturer); // lay tt giang vien
    router.get(
        "/api/get-all-lecturer-by-id",
        userController.handleGetAllLecturerById
    ); // lay tt giang vien
    router.get("/api/get-all-student", userController.handleGetAllStudent); // lay tt sinh vien
    router.get(
        "/api/get-all-student-by-id",
        userController.handleGetAllStudentById
    ); // lay tt sinh vien
    router.get("/api/get-all-employee", userController.handleGetAllEmployee); // lay tt nhan vien cty
    router.get("/api/get-all-admin", userController.handleGetAllAdmin); // lay tt admin
    router.get("/api/get-all-allcode", userController.handleGetAllAllCode); // lay tt bang allcode
    router.get("/api/get-all-subject", userController.handleGetAllSubject); // lay tt bo mon
    router.get("/api/get-all-class", userController.handleGetAllClass); // lay tt lop hoc
    router.get(
        "/api/get-all-intership-location",
        userController.handleGetAllInternshipLocation
    ); // lay tt dia diem thuc tap
    router.get(
        "/api/get-all-registration-form",
        userController.handleGetAllRegistrationForm
    ); // lay tt phieu tiep nhan
    router.get(
        "/api/get-all-registration-form-by-student",
        userController.handleGetAllRegistrationFormByStudent
    ); // lay tt phieu tiep nhan theo mssv
    router.get(
        "/api/get-all-assignment-sheet",
        userController.handleGetAllAssignmentSheet
    ); // lay tt phieu giao viec theo id
    router.get(
        "/api/get-all-detail-assignment-sheet",
        userController.handleGetAllDetailAssignmentSheet
    ); // lay tt cong viec theo ma phieu tiep nhan + tuan
    router.get(
        "/api/get-all-detail-assignment-sheet-by-id",
        userController.handleGetAllDetailAssignmentSheetById
    ); // lay tt cong viec theo ma phieu tiep nhan
    router.get(
        "/api/get-all-registration-form-by-employee",
        userController.handleGetAllRegistrationFormByEmployee
    ); // lay tt phieu tiep nhan theo ma nhan vien
    router.get(
        "/api/get-all-registration-form-by-lecturer",
        userController.handleGetAllRegistrationFormByLecturer
    ); // lay tt phieu tiep nhan theo ma giang vien
    router.get(
        "/api/get-all-rating-sheet",
        userController.handleGetAllRatingSheet
    ); // lay tt phieu danh gia
    router.get(
        "/api/get-all-score-sheet",
        userController.handleGetAllScoreSheet
    ); // lay tt phieu cham diem

    //--------------------------------------------------------------------------------

    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.post(
        "/api/create-new-lecturer",
        userController.handleCreateNewLecturer
    );
    router.post(
        "/api/create-new-edu-staff",
        userController.handleCreateNewEduStaff
    );
    router.post(
        "/api/create-new-student",
        userController.handleCreateNewStudent
    );
    router.post(
        "/api/create-new-employee",
        userController.handleCreateNewEmployee
    );
    router.post("/api/create-new-admin", userController.handleCreateNewAdmin);
    router.post(
        "/api/create-new-internship-location",
        userController.handleCreateNewInternshipLocation
    );
    router.post(
        "/api/create-new-registration-form",
        userController.handleCreateNewRegistrationForm
    );
    router.post(
        "/api/create-new-lecturer-assignment",
        userController.handleCreateNewLecturerAssignment
    );
    router.post(
        "/api/create-new-rating-sheet",
        userController.handleCreateNewRatingSheet
    );
    router.post(
        "/api/create-new-score-sheet",
        userController.handleCreateNewScoreSheet
    );

    //--------------------------------------------------------------------------------

    router.put("/api/edit-user", userController.handleEditUser);
    router.put(
        "/api/edit-studentmanager",
        userController.handleEditStudentmanager
    ); // cap nhat tt giao vu
    router.put("/api/edit-lecturer", userController.handleEditLecturer); // cap nhat tt giang vien
    router.put("/api/edit-student", userController.handleEditStudent); // cap nhat tt sinh vien
    router.put("/api/edit-employee", userController.handleEditEmployee); // cap nhat tt nhan vien cty
    router.put("/api/edit-admin", userController.handleEditAdmin); // cap nhat tt admin
    router.put(
        "/api/edit-internship-location",
        userController.handleEditInternshipLocation
    ); // cap nhat tt dia diem thuc tap
    router.put(
        "/api/edit-registration-form",
        userController.handleEditRegistrationForm
    ); // cap nhat tt phieu tiep nhan
    router.put(
        "/api/edit-assignment-sheet",
        userController.handleEditAssignmentSheet
    ); // cap nhat tt phieu giao viec

    //--------------------------------------------------------------------------------

    router.delete("/api/delete-user", userController.handleDeleteUser); // xoa user
    router.delete(
        "/api/delete-internship-location",
        userController.handleDeleteInternshipLocation
    ); // xoa dia diem thuc tap
    router.delete(
        "/api/delete-registration-form",
        userController.handleDeleteRegistrationForm
    ); // xoa phieu tiep nhan

    //--------------------------------------------------------------------------------

    // api upload file zip
    const upload = multer();
    router.post(
        "/api/upload",
        upload.single("file"),
        async function (req, res, next) {
            // console.log(req.file);
            // console.log("File name uploaded: ", req.body.name, ".zip");
            console.log(
                "[",
                req.socket.remoteAddress,
                "] Đã tải lên file báo cáo [",
                req.body.name,
                ".zip ]"
            );
            const {
                file,
                body: { name },
            } = req;

            if (file.detectedFileExtension != ".zip")
                next(new Error("invalid file type"));

            const fileName =
                name +
                // Math.floor(Math.random * 1000) +
                file.detectedFileExtension;

            await pipeline(
                file.stream,
                fs.createWriteStream(
                    `${__dirname}/../public/uploads/submit_final_report/${fileName}`
                )
            );

            res.send("File uploaded as " + fileName);
        }
    );

    //--------------------------------------------------------------------------------

    // api download file zip
    // router.get("/api/download", async function (req, res) {
    //     console.log("File name downloaded: ", req.body.fname, ".zip");

    //     const {
    //         body: { fname },
    //     } = req;

    //     // const fileName = fname + ".zip";
    //     const fileName = "B1805676.zip";
    //     // console.log("check filename downloaded: ", fileName);

    //     const file_download = `${__dirname}/../public/uploads/submit_final_report/${fileName}`;

    //     res.download(file_download); // Set disposition and send it.
    // });

    router.get("/files", userController.getListFiles);
    router.get("/files/:name", userController.download);
    router.get("/files/xlsx/:name", userController.downloadXlsx);

    //--------------------------------------------------------------------------------

    return app.use("/", router);
};

module.exports = initWebRoutes;
