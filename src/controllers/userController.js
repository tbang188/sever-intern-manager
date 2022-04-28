import userService from "../services/userService";

const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";

//------------------------------------------------------------------

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!",
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    // console.log(userData.user.Nguoidung.ho_ten);
    if (userData.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã đăng nhập thành công [",
            userData.user.Nguoidung.ho_ten,
            "-",
            userData.user.Nguoidung.email,
            "]"
        );
    }

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

//------------------------------------------------------------------

let handleGetAllUsers = async (req, res) => {
    try {
        // if (!id) {
        //     return res.status(200).json({
        //         errCode: 1,
        //         errMessage: "Missing required parameters",
        //     });
        // }

        let users = await userService.getAllUsers(req.query.id);
        // let students = await userService.getAllStudent(id);
        // let accounts = await userService.getAllAccount(id);
        return res.status(200).json(
            users
            // students,
            // accounts,
        );
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllStudentManager = async (req, res) => {
    try {
        let users = await userService.getAllStudentManager(req.query.id);
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllLecturer = async (req, res) => {
    try {
        let users = await userService.getAllLecturer(req.query.id);
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllLecturerById = async (req, res) => {
    try {
        let users = await userService.getAllLecturerById(req.query.id);
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllStudent = async (req, res) => {
    try {
        let users = await userService.getAllStudent(req.query.id);
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllStudentById = async (req, res) => {
    try {
        let users = await userService.getAllStudentById(req.query.id);
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllEmployee = async (req, res) => {
    try {
        let users = await userService.getAllEmployee(req.query.id);
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllAdmin = async (req, res) => {
    try {
        let users = await userService.getAllAdmin(req.query.id);
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllAllCode = async (req, res) => {
    try {
        let data = await userService.getAllALLCode(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllSubject = async (req, res) => {
    try {
        let data = await userService.getAllSubject(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllClass = async (req, res) => {
    try {
        let data = await userService.getAllClass(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllInternshipLocation = async (req, res) => {
    try {
        let data = await userService.getAllInternshipLocation(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllRegistrationForm = async (req, res) => {
    try {
        let data = await userService.getAllRegistrationForm(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllRegistrationFormByStudent = async (req, res) => {
    try {
        let data = await userService.getAllRegistrationFormByStudent(
            req.query.sid
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log("error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllAssignmentSheet = async (req, res) => {
    try {
        let data = await userService.getAllAssignmentSheet(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllDetailAssignmentSheet = async (req, res) => {
    try {
        let data = await userService.getAllDetailAssignmentSheet(
            req.query.id,
            req.query.week
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllDetailAssignmentSheetById = async (req, res) => {
    try {
        let data = await userService.getAllDetailAssignmentSheetById(
            req.query.id
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllRegistrationFormByEmployee = async (req, res) => {
    try {
        let data = await userService.getAllRegistrationFormByEmployee(
            req.query.id
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllRegistrationFormByLecturer = async (req, res) => {
    try {
        let data = await userService.getAllRegistrationFormByLecturer(
            req.query.id
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllRatingSheet = async (req, res) => {
    try {
        let data = await userService.getAllRatingSheet(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let handleGetAllScoreSheet = async (req, res) => {
    try {
        let data = await userService.getAllScoreSheet(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

//------------------------------------------------------------------

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
};

let handleCreateNewLecturer = async (req, res) => {
    let message = await userService.createNewLecturer(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo tài khoản giảng viên [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewEduStaff = async (req, res) => {
    let message = await userService.createNewEduStaff(req.body);
    // console.log(message);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo tài khoản giáo vụ [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewStudent = async (req, res) => {
    let message = await userService.createNewStudent(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo tài khoản sinh viên [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewEmployee = async (req, res) => {
    let message = await userService.createNewEmployee(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo tài khoản cán bộ hướng dẫn [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewAdmin = async (req, res) => {
    let message = await userService.createNewAdmin(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo tài khoản quản trị viên [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewInternshipLocation = async (req, res) => {
    let message = await userService.createNewInternshipLocation(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo địa điểm thực tập [",
            req.body.tencoquan,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewRegistrationForm = async (req, res) => {
    let message = await userService.createNewRegistrationForm(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo phiếu đăng ký thực tập cho sinh viên [",
            req.body.sinhvien,
            "] tại [",
            req.body.phonglamviec,
            "] > Trạng thái: [ Chờ duyệt ]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewLecturerAssignment = async (req, res) => {
    let message = await userService.createNewLecturerAssignment(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã phân công giảng viên [",
            req.body.giangvien,
            "] cho phiếu tiếp nhận [",
            req.body.id,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewRatingSheet = async (req, res) => {
    let message = await userService.createNewRatingSheet(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo phiếu đánh giá [",
            req.body.id,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleCreateNewScoreSheet = async (req, res) => {
    let message = await userService.createNewScoreSheet(req.body);
    if (message.message === "OK") {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã tạo phiếu chấm điểm [",
            req.body.id,
            "]"
        );
    }
    return res.status(200).json(message);
};

//------------------------------------------------------------------

let handleDeleteUser = async (req, res) => {
    if (!req.body.sid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter!",
        });
    }
    let message = await userService.deleteUser(req.body.sid);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã xóa tài khoản [",
            req.body.sid,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Lỗi! Tài khoản [",
            req.body.sid,
            "] không tồn tại > Không thể thực hiện xóa tài khoản."
        );
    }
    return res.status(200).json(message);
};

let handleDeleteInternshipLocation = async (req, res) => {
    if (!req.body.macoquan) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter!",
        });
    }
    let message = await userService.deleteInternshipLocation(req.body.macoquan);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã xóa địa điểm thực tập [",
            req.body.macoquan,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Lỗi! Địa điểm thực tập [",
            req.body.macoquan,
            "] không tồn tại > Không thể thực hiện xóa địa điểm thực tập."
        );
    }
    return res.status(200).json(message);
};

let handleDeleteRegistrationForm = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter!",
        });
    }
    let message = await userService.deleteRegistrationForm(req.body.id);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã xóa phiếu đăng ký thực tập [",
            req.body.id,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Lỗi! Phiếu đăng ký thực tập [",
            req.body.id,
            "] không tồn tại > Không thể thực hiện xóa phiếu đăng ký thực tập."
        );
    }
    return res.status(200).json(message);
};

//------------------------------------------------------------------

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
};

let handleEditStudentmanager = async (req, res) => {
    let data = req.body;
    let message = await userService.updateStudentmanagerData(data);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã thay đổi thông tin tài khoản giáo vụ [",
            req.body.hoten,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Xảy ra lỗi khi thay đổi thông tin tài khoản giáo vụ [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleEditLecturer = async (req, res) => {
    let data = req.body;
    let message = await userService.updateLecturerData(data);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã thay đổi thông tin tài khoản giảng viên [",
            req.body.hoten,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Xảy ra lỗi khi thay đổi thông tin tài khoản giảng viên [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleEditStudent = async (req, res) => {
    let data = req.body;
    let message = await userService.updateStudentData(data);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã thay đổi thông tin tài khoản sinh viên [",
            req.body.hoten,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Xảy ra lỗi khi thay đổi thông tin tài khoản sinh viên [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleEditEmployee = async (req, res) => {
    let data = req.body;
    let message = await userService.updateEmployeeData(data);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã thay đổi thông tin tài khoản cán bộ hướng dẫn [",
            req.body.hoten,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Xảy ra lỗi khi thay đổi thông tin tài khoản cán bộ hướng dẫn [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleEditAdmin = async (req, res) => {
    let data = req.body;
    let message = await userService.updateAdminData(data);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã thay đổi thông tin tài khoản quản trị viên [",
            req.body.hoten,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Xảy ra lỗi khi thay đổi thông tin tài khoản quản trị viên [",
            req.body.hoten,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleEditInternshipLocation = async (req, res) => {
    let data = req.body;
    let message = await userService.updateInternshipLocationData(data);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã thay đổi thông tin địa điểm thực tập [",
            req.body.tencoquan,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Xảy ra lỗi khi thay đổi thông tin địa điểm thực tập [",
            req.body.tencoquan,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleEditRegistrationForm = async (req, res) => {
    let data = req.body;
    let message = await userService.updateRegistrationFormData(data);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã thay đổi thông tin trạng thái phiếu đăng ký thực tập [",
            req.body.id,
            "] sang [ Đã duyệt ]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Xảy ra lỗi khi thay đổi trạng thái phiếu đăng ký thực tập [",
            req.body.id,
            "]"
        );
    }
    return res.status(200).json(message);
};

let handleEditAssignmentSheet = async (req, res) => {
    let data = req.body;
    let message = await userService.updateAssignmentSheetData(data);
    if (message.errCode === 0) {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Đã cập nhật thông tin phiếu giao việc [",
            req.body.id,
            "]"
        );
    } else {
        console.log(
            "[",
            req.socket.remoteAddress,
            "] Xảy ra lỗi khi cập nhật thông tin phiếu giao việc [",
            req.body.id,
            "]"
        );
    }
    return res.status(200).json(message);
};

//------------------------------------------------------------------

const getListFiles = (req, res) => {
    const directoryPath = __dirname + "/../public/uploads/submit_final_report/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Khong co file nao tai day!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __dirname + "/../public/uploads/submit_final_report/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Khong the download file. " + err,
            });
            console.log(
                "[",
                req.socket.remoteAddress,
                "] Xảy ra lỗi khi tải file báo cáo [",
                fileName,
                "]"
            );
        } else {
            console.log(
                "[",
                req.socket.remoteAddress,
                "] Đã tải file báo cáo [",
                fileName,
                "]"
            );
        }
    });
};

const downloadXlsx = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __dirname + "/../public/uploads/xlsx/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Khong the download file. " + err,
            });
            console.log(
                "[",
                req.socket.remoteAddress,
                "] Xảy ra lỗi khi tải file XLSX [",
                fileName,
                "]"
            );
        } else {
            console.log(
                "[",
                req.socket.remoteAddress,
                "] Đã tải file XLSX [",
                fileName,
                "]"
            );
        }
    });
};

//------------------------------------------------------------------

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleGetAllStudentManager: handleGetAllStudentManager,
    handleGetAllLecturer: handleGetAllLecturer,
    handleGetAllLecturerById: handleGetAllLecturerById,
    handleGetAllStudent: handleGetAllStudent,
    handleGetAllEmployee: handleGetAllEmployee,
    handleGetAllAdmin: handleGetAllAdmin,
    handleCreateNewUser: handleCreateNewUser,
    handleCreateNewLecturer: handleCreateNewLecturer,
    handleCreateNewEduStaff: handleCreateNewEduStaff,
    handleCreateNewStudent: handleCreateNewStudent,
    handleCreateNewEmployee: handleCreateNewEmployee,
    handleCreateNewAdmin: handleCreateNewAdmin,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    handleEditStudentmanager: handleEditStudentmanager,
    handleEditLecturer: handleEditLecturer,
    handleEditStudent: handleEditStudent,
    handleEditEmployee: handleEditEmployee,
    handleEditAdmin: handleEditAdmin,
    handleGetAllAllCode: handleGetAllAllCode,
    handleGetAllSubject: handleGetAllSubject,
    handleGetAllClass: handleGetAllClass,
    handleCreateNewInternshipLocation: handleCreateNewInternshipLocation,
    handleGetAllInternshipLocation: handleGetAllInternshipLocation,
    handleDeleteInternshipLocation: handleDeleteInternshipLocation,
    handleEditInternshipLocation: handleEditInternshipLocation,
    handleCreateNewRegistrationForm: handleCreateNewRegistrationForm,
    handleGetAllRegistrationForm: handleGetAllRegistrationForm,
    handleDeleteRegistrationForm: handleDeleteRegistrationForm,
    handleGetAllRegistrationFormByStudent:
        handleGetAllRegistrationFormByStudent,
    handleGetAllStudentById: handleGetAllStudentById,
    handleEditRegistrationForm: handleEditRegistrationForm,
    handleCreateNewLecturerAssignment: handleCreateNewLecturerAssignment,
    handleGetAllAssignmentSheet: handleGetAllAssignmentSheet,
    handleGetAllRegistrationFormByEmployee:
        handleGetAllRegistrationFormByEmployee,
    handleEditAssignmentSheet: handleEditAssignmentSheet,
    handleGetAllDetailAssignmentSheet: handleGetAllDetailAssignmentSheet,
    handleGetAllDetailAssignmentSheetById:
        handleGetAllDetailAssignmentSheetById,
    handleCreateNewRatingSheet: handleCreateNewRatingSheet,
    handleCreateNewScoreSheet: handleCreateNewScoreSheet,
    handleGetAllRatingSheet: handleGetAllRatingSheet,
    handleGetAllRegistrationFormByLecturer:
        handleGetAllRegistrationFormByLecturer,
    handleGetAllScoreSheet: handleGetAllScoreSheet,
    getListFiles: getListFiles,
    download: download,
    downloadXlsx: downloadXlsx,
};
