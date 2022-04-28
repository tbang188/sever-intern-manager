import bcrypt from "bcryptjs";
import db from "../models/index";
require("log-timestamp")(function () {
    return "[" + new Date() + "] >";
});

const salt = bcrypt.genSaltSync(10);

//------------------------------------------------------------------

let hashUserPassword = (password) => {
    // hash password
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist
                let user = await db.Taikhoan.findOne({
                    attributes: [
                        "id",
                        "s_id",
                        "ten_dang_nhap",
                        "loai_tai_khoan",
                        "mat_khau",
                    ],
                    where: { ten_dang_nhap: email },
                    include: [
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "id",
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                if (user) {
                    // compare password
                    let check = await bcrypt.compareSync(
                        password,
                        user.mat_khau
                    );
                    // let check = true;
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.mat_khau;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                // return password
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Nguoidung.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let checkIdInternshipLocation = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let internship_location = await db.Coquan.findOne({
                where: { ma_co_quan: inputId },
            });
            if (internship_location) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

//------------------------------------------------------------------

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId === "All") {
                let users = await db.Nguoidung.findAll({
                    include: [
                        {
                            model: db.Sinhvien,
                            attributes: ["ma_lop"],
                        },
                        {
                            model: db.Giangvien,
                            attributes: ["hoc_ham", "hoc_vi", "ma_bo_mon"],
                        },
                        {
                            model: db.Giaovu,
                            attributes: ["chuc_vu"],
                        },
                        {
                            model: db.Nhanvien,
                            attributes: [
                                "chuc_vu",
                                "bo_phan_lam_viec",
                                "ma_co_quan",
                            ],
                        },
                        {
                            model: db.Taikhoan,
                            attributes: ["loai_tai_khoan", "mat_khau"],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }

            if (userId && userId !== "All") {
                let users = await db.Nguoidung.findOne({
                    where: { s_id: userId },
                    include: [
                        {
                            model: db.Sinhvien,
                            attributes: ["ma_lop"],
                        },
                        {
                            model: db.Giangvien,
                            attributes: ["hoc_ham", "hoc_vi", "ma_bo_mon"],
                        },
                        {
                            model: db.Giaovu,
                            attributes: ["chuc_vu"],
                        },
                        {
                            model: db.Nhanvien,
                            attributes: [
                                "chuc_vu",
                                "bo_phan_lam_viec",
                                "ma_co_quan",
                            ],
                        },
                        {
                            model: db.Taikhoan,
                            attributes: ["loai_tai_khoan", "mat_khau"],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllStudentManager = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId === "All") {
                let users = await db.Taikhoan.findAll({
                    where: { loai_tai_khoan: "R4" },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Giaovu,
                            attributes: ["s_id", "chuc_vu"],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
            if (userId && userId !== "All") {
                let users = await db.Taikhoan.findOne({
                    where: { loai_tai_khoan: "R4", s_id: userId },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Giaovu,
                            attributes: ["s_id", "chuc_vu"],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllLecturer = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId === "All") {
                let users = await db.Taikhoan.findAll({
                    where: { loai_tai_khoan: "R3" },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Giangvien,
                            attributes: [
                                "s_id",
                                "hoc_ham",
                                "hoc_vi",
                                "ma_bo_mon",
                            ],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }

            if (userId && userId !== "All") {
                let users = await db.Taikhoan.findOne({
                    where: { loai_tai_khoan: "R3", s_id: userId },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Giangvien,
                            attributes: [
                                "s_id",
                                "hoc_ham",
                                "hoc_vi",
                                "ma_bo_mon",
                            ],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllLecturerById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId === "All") {
                let users = await db.Taikhoan.findAll({
                    where: { loai_tai_khoan: "R3" },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Giangvien,
                            attributes: [
                                "s_id",
                                "hoc_ham",
                                "hoc_vi",
                                "ma_bo_mon",
                            ],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }

            if (userId && userId !== "All") {
                let users = [
                    await db.Taikhoan.findOne({
                        where: { loai_tai_khoan: "R3", s_id: userId },
                        attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                        include: [
                            {
                                model: db.Giangvien,
                                attributes: [
                                    "s_id",
                                    "hoc_ham",
                                    "hoc_vi",
                                    "ma_bo_mon",
                                ],
                            },
                            {
                                model: db.Nguoidung,
                                attributes: [
                                    "s_id",
                                    "ho_ten",
                                    "dia_chi",
                                    "email",
                                    "sdt",
                                ],
                            },
                        ],
                        raw: true,
                        nest: true,
                    }),
                ];
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllStudent = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId === "All") {
                let users = await db.Taikhoan.findAll({
                    where: { loai_tai_khoan: "R2" },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Sinhvien,
                            attributes: ["s_id", "ma_lop"],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
            if (userId && userId !== "All") {
                let users = await db.Taikhoan.findOne({
                    where: { loai_tai_khoan: "R2", s_id: userId },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Sinhvien,
                            attributes: ["s_id", "ma_lop"],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllStudentById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = [
                await db.Nguoidung.findOne({
                    where: { s_id: userId },
                    attributes: ["s_id", "ho_ten", "dia_chi", "email", "sdt"],
                    include: [
                        {
                            model: db.Sinhvien,
                            attributes: ["s_id", "ma_lop"],
                        },
                    ],
                    raw: true,
                    nest: true,
                }),
            ];
            resolve({
                errCode: 0,
                users: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllEmployee = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId === "All") {
                let users = await db.Taikhoan.findAll({
                    where: { loai_tai_khoan: "R5" },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Nhanvien,
                            attributes: [
                                "s_id",
                                "chuc_vu",
                                "bo_phan_lam_viec",
                                "ma_co_quan",
                            ],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
            if (userId && userId !== "All") {
                let users = await db.Taikhoan.findOne({
                    where: { loai_tai_khoan: "R5", s_id: userId },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Nhanvien,
                            attributes: [
                                "s_id",
                                "chuc_vu",
                                "bo_phan_lam_viec",
                                "ma_co_quan",
                            ],
                        },
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllAdmin = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId === "All") {
                let users = await db.Taikhoan.findAll({
                    where: { loai_tai_khoan: "R1" },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
            if (userId && userId !== "All") {
                let users = await db.Taikhoan.findOne({
                    where: { loai_tai_khoan: "R1", s_id: userId },
                    attributes: ["s_id", "loai_tai_khoan", "mat_khau"],
                    include: [
                        {
                            model: db.Nguoidung,
                            attributes: [
                                "s_id",
                                "ho_ten",
                                "dia_chi",
                                "email",
                                "sdt",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    users: users,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllALLCode = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeInput === "All") {
                let allcode = await db.Allcode.findAll({
                    attributes: ["key", "type", "valueEn", "valueVi"],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    allcode: allcode,
                });
            }
            if (typeInput && typeInput !== "All") {
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput },
                    attributes: ["key", "type", "valueEn", "valueVi"],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    allcode: allcode,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllSubject = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeInput === "All") {
                let subject = await db.Bomon.findAll({
                    attributes: ["ma_bo_mon", "ten_bo_mon"],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    subject: subject,
                });
            }
            if (typeInput && typeInput !== "All") {
                let subject = await db.Bomon.findAll({
                    where: { ma_bo_mon: typeInput },
                    attributes: ["ma_bo_mon", "ten_bo_mon"],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    subject: subject,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllClass = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeInput === "All") {
                let classdb = await db.Lop.findAll({
                    attributes: ["ma_lop", "ten_lop"],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    classdb: classdb,
                });
            }
            if (typeInput && typeInput !== "All") {
                let classdb = await db.Lop.findAll({
                    where: { ma_lop: typeInput },
                    attributes: ["ma_lop", "ten_lop"],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    classdb: classdb,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllInternshipLocation = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let internship_location = await db.Chitietthuctap.findAll({
                    attributes: [
                        "ma_co_quan",
                        "ma_nhan_vien",
                        "noi_dung_cv",
                        "gio_1tuan",
                        "moi_truong_lam_viec",
                        "so_luong_sv",
                        "yeu_cau_sv",
                        "quyen_loi_sv",
                        "ghi_chu",
                    ],
                    include: [
                        {
                            model: db.Coquan,
                            attributes: [
                                "ma_co_quan",
                                "ten_co_quan",
                                "ten_day_du",
                                "tinh_tp",
                                "dia_chi",
                                "website",
                                "sdt_co_quan",
                                "email_co_quan",
                            ],
                        },
                        // {
                        //     model: db.Nhanvien,
                        //     attributes: ["s_id", "ma_co_quan"],
                        // },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    internship_location: internship_location,
                });
            }
            if (inputId && inputId !== "All") {
                let internship_location = await db.Chitietthuctap.findAll({
                    where: { ma_co_quan: inputId },
                    attributes: [
                        "ma_co_quan",
                        "ma_nhan_vien",
                        "noi_dung_cv",
                        "gio_1tuan",
                        "moi_truong_lam_viec",
                        "so_luong_sv",
                        "yeu_cau_sv",
                        "quyen_loi_sv",
                        "ghi_chu",
                    ],
                    include: [
                        {
                            model: db.Coquan,
                            attributes: [
                                "ma_co_quan",
                                "ten_co_quan",
                                "ten_day_du",
                                "tinh_tp",
                                "dia_chi",
                                "website",
                                "sdt_co_quan",
                                "email_co_quan",
                            ],
                        },
                        // {
                        //     model: db.Nhanvien,
                        //     attributes: ["s_id", "ma_co_quan"],
                        // },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    internship_location: internship_location,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllRegistrationForm = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let registration_form = await db.Dangkycoquan.findAll({
                    attributes: [
                        "id",
                        "ma_co_quan",
                        "ma_sinh_vien",
                        "trang_thai",
                    ],
                    include: [
                        {
                            model: db.Phieutiepnhan,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "phong_lam_viec",
                                "noi_dung",
                                "gio_1ngay",
                                "ngay_1tuan",
                                "tinh_trang",
                                "nhan_vien",
                                "sinh_vien",
                            ],
                        },
                        {
                            model: db.Chitietphancong,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "giang_vien",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    registration_form: registration_form,
                });
            }
            if (inputId && inputId !== "All") {
                let registration_form = await db.Dangkycoquan.findAll({
                    where: { id: inputId },
                    attributes: [
                        "id",
                        "ma_co_quan",
                        "ma_sinh_vien",
                        "trang_thai",
                    ],
                    include: [
                        {
                            model: db.Phieutiepnhan,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "phong_lam_viec",
                                "noi_dung",
                                "gio_1ngay",
                                "ngay_1tuan",
                                "tinh_trang",
                                "nhan_vien",
                                "sinh_vien",
                            ],
                        },
                        {
                            model: db.Chitietphancong,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "giang_vien",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    registration_form: registration_form,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllRegistrationFormByStudent = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let registration_form = await db.Dangkycoquan.findAll({
                    attributes: [
                        "id",
                        "ma_co_quan",
                        "ma_sinh_vien",
                        "trang_thai",
                    ],
                    include: [
                        {
                            model: db.Phieutiepnhan,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "phong_lam_viec",
                                "noi_dung",
                                "gio_1ngay",
                                "ngay_1tuan",
                                "tinh_trang",
                                "nhan_vien",
                                "sinh_vien",
                            ],
                        },
                        {
                            model: db.Chitietphancong,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "giang_vien",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    registration_form: registration_form,
                });
            }
            if (inputId && inputId !== "All") {
                let registration_form = await db.Dangkycoquan.findAll({
                    where: { ma_sinh_vien: inputId },
                    attributes: [
                        "id",
                        "ma_co_quan",
                        "ma_sinh_vien",
                        "trang_thai",
                    ],
                    include: [
                        {
                            model: db.Phieutiepnhan,
                            where: { sinh_vien: inputId },
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "phong_lam_viec",
                                "noi_dung",
                                "gio_1ngay",
                                "ngay_1tuan",
                                "tinh_trang",
                                "nhan_vien",
                                "sinh_vien",
                            ],
                        },
                        {
                            model: db.Chitietphancong,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "giang_vien",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    registration_form: registration_form,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// phieugiaoviec theo id
let getAllAssignmentSheet = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let sheet = await db.Phieugiaoviec.findAll({
                    attributes: [
                        "id",
                        "ma_phieu_tiep_nhan",
                        "ngay_bd_thuc_tap",
                        "ngay_kt_thuc_tap",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    sheet: sheet,
                });
            }
            if (inputId && inputId !== "All") {
                let sheet = await db.Phieugiaoviec.findAll({
                    where: { id: inputId },
                    attributes: [
                        "id",
                        "ma_phieu_tiep_nhan",
                        "ngay_bd_thuc_tap",
                        "ngay_kt_thuc_tap",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    sheet: sheet,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// congviec theo ma_phieu_tiep_nhan + tuan_thu
let getAllDetailAssignmentSheet = (inputId, inputWeek) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let detail_sheet = await db.Congviec.findAll({
                    attributes: [
                        "id",
                        "viec_lam",
                        "so_buoi",
                        "tuan_thu",
                        "ngay_bd",
                        "ma_phieu_tiep_nhan",
                        "ghi_chu",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    detail_sheet: detail_sheet,
                });
            }
            if (inputId && inputId !== "All") {
                let detail_sheet = await db.Congviec.findAll({
                    where: { ma_phieu_tiep_nhan: inputId, tuan_thu: inputWeek },
                    attributes: [
                        "id",
                        "viec_lam",
                        "so_buoi",
                        "tuan_thu",
                        "ngay_bd",
                        "ma_phieu_tiep_nhan",
                        "ghi_chu",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    detail_sheet: detail_sheet,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// congviec theo ma_phieu_tiep_nhan
let getAllDetailAssignmentSheetById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let detail_sheet = await db.Congviec.findAll({
                    attributes: [
                        "id",
                        "viec_lam",
                        "so_buoi",
                        "tuan_thu",
                        "ngay_bd",
                        "ma_phieu_tiep_nhan",
                        "ghi_chu",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    detail_sheet: detail_sheet,
                });
            }
            if (inputId && inputId !== "All") {
                let detail_sheet = await db.Congviec.findAll({
                    where: { ma_phieu_tiep_nhan: inputId },
                    attributes: [
                        "id",
                        "viec_lam",
                        "so_buoi",
                        "tuan_thu",
                        "ngay_bd",
                        "ma_phieu_tiep_nhan",
                        "ghi_chu",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    detail_sheet: detail_sheet,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllRegistrationFormByEmployee = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let registration_form = await db.Phieutiepnhan.findAll({
                    attributes: [
                        "id",
                        "ma_phieu_tiep_nhan",
                        "phong_lam_viec",
                        "noi_dung",
                        "gio_1ngay",
                        "ngay_1tuan",
                        "tinh_trang",
                        "nhan_vien",
                        "sinh_vien",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    registration_form: registration_form,
                });
            }
            if (inputId && inputId !== "All") {
                let registration_form = await db.Phieutiepnhan.findAll({
                    where: { nhan_vien: inputId },
                    attributes: [
                        "id",
                        "ma_phieu_tiep_nhan",
                        "phong_lam_viec",
                        "noi_dung",
                        "gio_1ngay",
                        "ngay_1tuan",
                        "tinh_trang",
                        "nhan_vien",
                        "sinh_vien",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    registration_form: registration_form,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllRegistrationFormByLecturer = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let registration_form = await db.Chitietphancong.findAll({
                    attributes: ["id", "ma_phieu_tiep_nhan", "giang_vien"],
                    include: [
                        {
                            model: db.Phieutiepnhan,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "phong_lam_viec",
                                "noi_dung",
                                "gio_1ngay",
                                "ngay_1tuan",
                                "tinh_trang",
                                "nhan_vien",
                                "sinh_vien",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    registration_form: registration_form,
                });
            }
            if (inputId && inputId !== "All") {
                let registration_form = await db.Chitietphancong.findAll({
                    where: { giang_vien: inputId },
                    attributes: ["id", "ma_phieu_tiep_nhan", "giang_vien"],
                    include: [
                        {
                            model: db.Phieutiepnhan,
                            attributes: [
                                "id",
                                "ma_phieu_tiep_nhan",
                                "phong_lam_viec",
                                "noi_dung",
                                "gio_1ngay",
                                "ngay_1tuan",
                                "tinh_trang",
                                "nhan_vien",
                                "sinh_vien",
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    registration_form: registration_form,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllRatingSheet = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let rating_sheet = await db.Phieudanhgiasv.findAll({
                    attributes: [
                        "id",
                        "ma_phieu_giao_viec",
                        "noi_quy",
                        "gio_giac",
                        "giao_tiep",
                        "tich_cuc",
                        "dap_ung_yccv",
                        "tt_hoc_tap",
                        "de_xuat_sang_tao",
                        "bao_cao_tien_do",
                        "dong_gop",
                        "hoan_thanh",
                        "nhan_xet_khac",
                        "ctdt",
                        "gop_y_ctdt",
                        "ngay_lap",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    rating_sheet: rating_sheet,
                });
            }
            if (inputId && inputId !== "All") {
                let rating_sheet = await db.Phieudanhgiasv.findAll({
                    where: { id: inputId },
                    attributes: [
                        "id",
                        "ma_phieu_giao_viec",
                        "noi_quy",
                        "gio_giac",
                        "giao_tiep",
                        "tich_cuc",
                        "dap_ung_yccv",
                        "tt_hoc_tap",
                        "de_xuat_sang_tao",
                        "bao_cao_tien_do",
                        "dong_gop",
                        "hoan_thanh",
                        "nhan_xet_khac",
                        "ctdt",
                        "gop_y_ctdt",
                        "ngay_lap",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    rating_sheet: rating_sheet,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllScoreSheet = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === "All") {
                let score_sheet = await db.Phieuchamdiem.findAll({
                    attributes: [
                        "id",
                        "ma_phieu_giao_viec",
                        "format",
                        "trinh_bay",
                        "lich_lam_viec",
                        "so_buoi_thuc_tap",
                        "ke_hoach_cong_tac",
                        "hieu_biet_co_quan",
                        "pp_thuc_hien",
                        "cung_co_ly_thuyet",
                        "ky_nang_thuc_hanh",
                        "kinh_nghiem_thuc_tien",
                        "dong_gop_co_quan",
                        "khong_sinh_hoat",
                        "khong_phieu_giao_viec",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    score_sheet: score_sheet,
                });
            }
            if (inputId && inputId !== "All") {
                let score_sheet = await db.Phieuchamdiem.findAll({
                    where: { id: inputId },
                    attributes: [
                        "id",
                        "ma_phieu_giao_viec",
                        "format",
                        "trinh_bay",
                        "lich_lam_viec",
                        "so_buoi_thuc_tap",
                        "ke_hoach_cong_tac",
                        "hieu_biet_co_quan",
                        "pp_thuc_hien",
                        "cung_co_ly_thuyet",
                        "ky_nang_thuc_hanh",
                        "kinh_nghiem_thuc_tien",
                        "dong_gop_co_quan",
                        "khong_sinh_hoat",
                        "khong_phieu_giao_viec",
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    score_sheet: score_sheet,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//------------------------------------------------------------------

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Your email is already in use, Plz try another email",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.matkhau
                );

                await db.Nguoidung.create({
                    s_id: data.sid, //khoa chinh
                    ho_ten: data.hoten,
                    dia_chi: data.diachi,
                    email: data.email,
                    sdt: data.sdt,
                });
                let userId = await db.Nguoidung.findOne({
                    where: { s_id: data.sid },
                });
                await db.Sinhvien.create({
                    id: userId.id,
                    s_id: data.sid, //khoa chinh + ngoai
                    ma_lop: data.malop, //khoa chinh
                });
                await db.Taikhoan.create({
                    id: userId.id,
                    s_id: data.sid, //khoa chinh + ngoai
                    ten_dang_nhap: data.email,
                    mat_khau: hashPasswordFromBcrypt,
                    loai_tai_khoan: data.loaitaikhoan,
                });

                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewLecturer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email.toString());
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Email " +
                        data.email +
                        " đã tồn tại, hãy sử dụng email khác!",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.matkhau.toString()
                );

                await db.Nguoidung.create({
                    s_id: data.sid.toString(), //khoa chinh
                    ho_ten: data.hoten.toString(),
                    dia_chi: data.diachi.toString(),
                    email: data.email.toString(),
                    sdt: data.sdt.toString(),
                });

                let userId = await db.Nguoidung.findOne({
                    where: { s_id: data.sid.toString() },
                });

                await db.Giangvien.create({
                    id: userId.id,
                    s_id: data.sid.toString(),
                    hoc_ham: data.hocham.toString(),
                    hoc_vi: data.hocvi.toString(),
                    ma_bo_mon: data.mabomon.toString(),
                });

                await db.Taikhoan.create({
                    id: userId.id,
                    s_id: data.sid.toString(), //khoa chinh + ngoai
                    ten_dang_nhap: data.email.toString(),
                    mat_khau: hashPasswordFromBcrypt,
                    loai_tai_khoan: "R3",
                });

                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewEduStaff = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email.toString());
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Email " +
                        data.email +
                        " đã tồn tại, hãy sử dụng email khác!",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.matkhau.toString()
                );

                await db.Nguoidung.create({
                    s_id: data.sid.toString(),
                    ho_ten: data.hoten.toString(),
                    dia_chi: data.diachi.toString(),
                    email: data.email.toString(),
                    sdt: data.sdt.toString(),
                });

                let userId = await db.Nguoidung.findOne({
                    where: { s_id: data.sid.toString() },
                });

                await db.Giaovu.create({
                    id: userId.id,
                    s_id: data.sid.toString(),
                    chuc_vu: data.chucvu.toString(),
                });

                await db.Taikhoan.create({
                    id: userId.id,
                    s_id: data.sid.toString(),
                    ten_dang_nhap: data.email.toString(),
                    mat_khau: hashPasswordFromBcrypt,
                    loai_tai_khoan: "R4",
                });

                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email.toString());
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Email " +
                        data.email +
                        " đã tồn tại, hãy sử dụng email khác!",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.matkhau.toString()
                );

                await db.Nguoidung.create({
                    s_id: data.sid.toString(), //khoa chinh
                    ho_ten: data.hoten.toString(),
                    dia_chi: data.diachi.toString(),
                    email: data.email.toString(),
                    sdt: data.sdt.toString(),
                });
                let userId = await db.Nguoidung.findOne({
                    where: { s_id: data.sid.toString() },
                });
                await db.Sinhvien.create({
                    id: userId.id,
                    s_id: data.sid.toString(), //khoa chinh + ngoai
                    ma_lop: data.malop.toString(), //khoa chinh
                });
                await db.Taikhoan.create({
                    id: userId.id,
                    s_id: data.sid.toString(), //khoa chinh + ngoai
                    ten_dang_nhap: data.email.toString(),
                    mat_khau: hashPasswordFromBcrypt,
                    loai_tai_khoan: "R2",
                });
                // console.log("Đã tạo tài khoản sinh viên [", data.hoten, "]"),
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewEmployee = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email.toString());
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Email " +
                        data.email +
                        " đã tồn tại, hãy sử dụng email khác!",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.matkhau.toString()
                );

                await db.Nguoidung.create({
                    s_id: data.sid.toString(),
                    ho_ten: data.hoten.toString(),
                    dia_chi: data.diachi.toString(),
                    email: data.email.toString(),
                    sdt: data.sdt.toString(),
                });

                let userId = await db.Nguoidung.findOne({
                    where: { s_id: data.sid.toString() },
                });

                await db.Nhanvien.create({
                    id: userId.id,
                    s_id: data.sid.toString(),
                    chuc_vu: data.chucvu.toString(),
                    bo_phan_lam_viec: data.bophanlamviec.toString(),
                    ma_co_quan: data.macoquan.toString(),
                });

                await db.Taikhoan.create({
                    id: userId.id,
                    s_id: data.sid.toString(),
                    ten_dang_nhap: data.email.toString(),
                    mat_khau: hashPasswordFromBcrypt,
                    loai_tai_khoan: "R5",
                });
                // console.log(
                //     "Đã tạo tài khoản cán bộ hướng dẫn [",
                //     data.hoten,
                //     "]"
                // ),
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email.toString());
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Email " +
                        data.email +
                        " đã tồn tại, hãy sử dụng email khác!",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.matkhau.toString()
                );

                await db.Nguoidung.create({
                    s_id: data.sid.toString(),
                    ho_ten: data.hoten.toString(),
                    dia_chi: data.diachi.toString(),
                    email: data.email.toString(),
                    sdt: data.sdt.toString(),
                });

                let userId = await db.Nguoidung.findOne({
                    where: { s_id: data.sid.toString() },
                });

                await db.Taikhoan.create({
                    id: userId.id,
                    s_id: data.sid.toString(),
                    ten_dang_nhap: data.email.toString(),
                    mat_khau: hashPasswordFromBcrypt,
                    loai_tai_khoan: "R1",
                });
                // console.log(
                //     "Đã tạo tài khoản quản trị viên [",
                //     data.hoten,
                //     "]"
                // ),
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewInternshipLocation = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check id is exist ???
            let check = await checkIdInternshipLocation(
                data.macoquan.toString()
            );
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Mã cơ quan " +
                        data.macoquan +
                        " đã tồn tại, hãy kiểm tra lại!",
                });
            } else {
                await [
                    db.Coquan.create({
                        ma_co_quan: data.macoquan.toString(),
                        ten_co_quan: data.tencoquan.toString(),
                        ten_day_du: "",
                        tinh_tp: data.tinhtp.toString(),
                        dia_chi: data.diachi.toString(),
                        website: data.website.toString(),
                        sdt_co_quan: data.sdtcoquan.toString(),
                        email_co_quan: data.emailcoquan.toString(),
                    }),

                    db.Chitietthuctap.create({
                        ma_co_quan: data.macoquan.toString(),
                        ma_nhan_vien: "",
                        noi_dung_cv: data.noidungcv.toString(),
                        gio_1tuan: data.gio1tuan.toString(),
                        moi_truong_lam_viec: data.moitruonglamviec.toString(),
                        so_luong_sv: data.soluongsv.toString(),
                        yeu_cau_sv: data.yeucausv.toString(),
                        quyen_loi_sv: data.quyenloisv.toString(),
                        ghi_chu: data.ghichu.toString(),
                    }),
                ];
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewRegistrationForm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Phieutiepnhan.create({
                id: data.id,
                ma_phieu_tiep_nhan: data.maphieutiepnhan,
                phong_lam_viec: data.phonglamviec,
                noi_dung: data.noidung,
                gio_1ngay: data.gio1ngay,
                ngay_1tuan: 0,
                tinh_trang: data.tinhtrang,
                nhan_vien: data.nhanvien,
                sinh_vien: data.sinhvien,
            });
            await db.Dangkycoquan.create({
                id: data.id,
                ma_co_quan: data.macoquan,
                ma_sinh_vien: data.masinhvien,
                trang_thai: data.trangthai,
            });

            resolve({
                errCode: 0,
                message: "OK",
            });
        } catch (e) {
            reject(e);
        }
    });
};

let createNewLecturerAssignment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Chitietphancong.create({
                id: data.id,
                ma_phieu_tiep_nhan: data.id,
                giang_vien: data.giangvien,
            });

            resolve({
                errCode: 0,
                message: "OK",
            });
        } catch (e) {
            reject(e);
        }
    });
};

let createNewRatingSheet = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Phieudanhgiasv.create({
                id: data.id,
                ma_phieu_giao_viec: data.id,
                noi_quy: data.noiquy,
                gio_giac: data.giogiac,
                giao_tiep: data.giaotiep,
                tich_cuc: data.tichcuc,
                dap_ung_yccv: data.dapungyccv,
                tt_hoc_tap: data.tthoctap,
                de_xuat_sang_tao: data.dexuatsangtao,
                bao_cao_tien_do: data.baocaotiendo,
                dong_gop: data.donggop,
                hoan_thanh: data.hoanthanh,
                nhan_xet_khac: data.nhanxetkhac,
                ctdt: data.ctdt,
                gop_y_ctdt: data.gopyctdt,
                ngay_lap: data.ngaylap,
            });
            let register_form = await db.Phieutiepnhan.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (register_form) {
                register_form.ngay_1tuan = 1;
                await register_form.save();
            }

            resolve({
                errCode: 0,
                message: "OK",
            });
        } catch (e) {
            reject(e);
        }
    });
};

let createNewScoreSheet = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Phieuchamdiem.create({
                id: data.id,
                ma_phieu_giao_viec: data.id,
                format: data.format,
                trinh_bay: data.trinhbay,
                lich_lam_viec: data.lichlamviec,
                so_buoi_thuc_tap: data.sobuoithuctap,
                ke_hoach_cong_tac: data.kehoachcongtac,
                hieu_biet_co_quan: data.hieubietcoquan,
                pp_thuc_hien: data.ppthuchien,
                cung_co_ly_thuyet: data.cungcolythuyet,
                ky_nang_thuc_hanh: data.kynangthuchanh,
                kinh_nghiem_thuc_tien: data.kinhnghiemthuctien,
                dong_gop_co_quan: data.donggopcoquan,
                khong_sinh_hoat: data.khongsinhhoat,
                khong_phieu_giao_viec: data.khongphieugiaoviec,
            });
            let register_form = await db.Phieutiepnhan.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (register_form) {
                register_form.ngay_1tuan = 11;
                await register_form.save();
            }
            console.log("Đã tạo phiếu chấm điểm [", data.id, "]"),
                resolve({
                    errCode: 0,
                    message: "OK",
                });
        } catch (e) {
            reject(e);
        }
    });
};

//------------------------------------------------------------------

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.Nguoidung.findOne({
            where: { s_id: userId },
        });
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: "ERROR",
            });
        }

        await db.Nguoidung.destroy({
            where: { s_id: userId },
        });
        await db.Sinhvien.destroy({
            where: { s_id: userId },
        });
        await db.Giangvien.destroy({
            where: { s_id: userId },
        });
        await db.Giaovu.destroy({
            where: { s_id: userId },
        });
        await db.Nhanvien.destroy({
            where: { s_id: userId },
        });
        await db.Taikhoan.destroy({
            where: { s_id: userId },
        });
        resolve({
            errCode: 0,
            message: "OK",
        });
    });
};

let deleteInternshipLocation = (inputId) => {
    return new Promise(async (resolve, reject) => {
        let foundInternshipLocation = await db.Coquan.findOne({
            where: { ma_co_quan: inputId },
        });
        if (!foundInternshipLocation) {
            resolve({
                errCode: 2,
                errMessage: "ERROR",
            });
        }

        await db.Chitietthuctap.destroy({
            where: { ma_co_quan: inputId },
        });
        await db.Coquan.destroy({
            where: { ma_co_quan: inputId },
        });

        resolve({
            errCode: 0,
            message: "OK",
        });
    });
};

let deleteRegistrationForm = (inputId) => {
    return new Promise(async (resolve, reject) => {
        let foundRegistrationForm = await db.Dangkycoquan.findOne({
            where: { id: inputId },
        });
        if (!foundRegistrationForm) {
            resolve({
                errCode: 2,
                errMessage: "ERROR",
            });
        }
        await db.Dangkycoquan.destroy({
            where: { id: inputId },
        });
        await db.Phieutiepnhan.destroy({
            where: { id: inputId },
        });
        resolve({
            errCode: 0,
            message: "OK",
        });
    });
};

//------------------------------------------------------------------

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.sid) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let user = await db.Nguoidung.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            if (user) {
                user.ho_ten = data.hoten;
                user.sdt = data.sdt;
                user.dia_chi = data.diachi;

                await user.save();

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateStudentmanagerData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.sid) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let user = await db.Nguoidung.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let student_manager = await db.Giaovu.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let account = await db.Taikhoan.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            if (user) {
                user.ho_ten = data.hoten;
                user.sdt = data.sdt;
                user.dia_chi = data.diachi;
                user.email = data.email;
                student_manager.chuc_vu = data.chucvu;
                account.ten_dang_nhap = data.email;
                account.mat_khau = data.matkhau;

                await user.save();
                await student_manager.save();
                await account.save();

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateLecturerData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.sid) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let user = await db.Nguoidung.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let lecturer = await db.Giangvien.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let account = await db.Taikhoan.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            if (user) {
                user.ho_ten = data.hoten;
                user.sdt = data.sdt;
                user.dia_chi = data.diachi;
                user.email = data.email;
                account.ten_dang_nhap = data.email;
                account.mat_khau = data.matkhau;
                lecturer.hoc_ham = data.hocham;
                lecturer.hoc_vi = data.hocvi;
                lecturer.ma_bo_mon = data.mabomon;

                await user.save();
                await lecturer.save();
                await account.save();

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateStudentData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.sid) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let user = await db.Nguoidung.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let student = await db.Sinhvien.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let account = await db.Taikhoan.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            if (user) {
                user.ho_ten = data.hoten;
                user.sdt = data.sdt;
                user.dia_chi = data.diachi;
                user.email = data.email;
                account.ten_dang_nhap = data.email;
                account.mat_khau = data.matkhau;
                student.ma_lop = data.malop;

                await user.save();
                await student.save();
                await account.save();

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateEmployeeData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.sid) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let user = await db.Nguoidung.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let employee = await db.Nhanvien.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let account = await db.Taikhoan.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            if (user) {
                user.ho_ten = data.hoten;
                user.sdt = data.sdt;
                user.dia_chi = data.diachi;
                user.email = data.email;
                account.ten_dang_nhap = data.email;
                account.mat_khau = data.matkhau;
                employee.chuc_vu = data.chucvu;
                employee.bo_phan_lam_viec = data.bophanlamviec;
                employee.ma_co_quan = data.macoquan;

                await user.save();
                await employee.save();
                await account.save();

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateAdminData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.sid) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let user = await db.Nguoidung.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            let account = await db.Taikhoan.findOne({
                where: { s_id: data.sid },
                raw: false,
            });
            if (user) {
                user.ho_ten = data.hoten;
                user.sdt = data.sdt;
                user.dia_chi = data.diachi;
                user.email = data.email;
                account.ten_dang_nhap = data.email;
                account.mat_khau = data.matkhau;

                await user.save();
                await account.save();

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateInternshipLocationData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.macoquan) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let company = await db.Coquan.findOne({
                where: { ma_co_quan: data.macoquan },
                raw: false,
            });
            let detail_internship = await db.Chitietthuctap.findOne({
                where: { ma_co_quan: data.macoquan },
                raw: false,
            });
            if (company) {
                company.ma_co_quan = data.macoquan;
                company.ten_co_quan = data.tencoquan;
                company.ten_day_du = data.tendaydu; // co the null
                company.tinh_tp = data.tinhtp;
                company.dia_chi = data.diachi;
                company.website = data.website;
                company.sdt_co_quan = data.sdtcoquan;
                company.email_co_quan = data.emailcoquan;
                detail_internship.ma_nhan_vien = data.manhanvien;
                detail_internship.noi_dung_cv = data.noidungcv;
                detail_internship.gio_1tuan = data.gio1tuan;
                detail_internship.moi_truong_lam_viec = data.moitruonglamviec;
                detail_internship.so_luong_sv = data.soluongsv;
                detail_internship.yeu_cau_sv = data.yeucausv;
                detail_internship.quyen_loi_sv = data.quyenloisv;
                detail_internship.ghi_chu = data.ghichu; // co the null
                await company.save();
                await detail_internship.save();

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateRegistrationFormData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let register_company = await db.Dangkycoquan.findOne({
                where: { id: data.id },
                raw: false,
            });
            let register_form = await db.Phieutiepnhan.findOne({
                where: { id: data.id },
                raw: false,
            });
            let nhanvien = await db.Nhanvien.findOne({
                where: { ma_co_quan: register_company.ma_co_quan },
            });
            if (register_company) {
                register_company.trang_thai = data.trang_thai;
                register_form.tinh_trang = data.trang_thai;
                register_form.nhan_vien = nhanvien.s_id;
                await register_company.save();
                await register_form.save();
                await db.Phieugiaoviec.create({
                    id: data.id,
                    ma_phieu_tiep_nhan: data.id,
                });
                await db.Congviec.create({
                    ma_phieu_tiep_nhan: data.id,
                    tuan_thu: "1",
                });
                await db.Congviec.create({
                    ma_phieu_tiep_nhan: data.id,
                    tuan_thu: "2",
                });
                await db.Congviec.create({
                    ma_phieu_tiep_nhan: data.id,
                    tuan_thu: "3",
                });
                await db.Congviec.create({
                    ma_phieu_tiep_nhan: data.id,
                    tuan_thu: "4",
                });
                await db.Congviec.create({
                    ma_phieu_tiep_nhan: data.id,
                    tuan_thu: "5",
                });
                await db.Congviec.create({
                    ma_phieu_tiep_nhan: data.id,
                    tuan_thu: "6",
                });
                await db.Congviec.create({
                    ma_phieu_tiep_nhan: data.id,
                    tuan_thu: "7",
                });
                await db.Congviec.create({
                    ma_phieu_tiep_nhan: data.id,
                    tuan_thu: "8",
                });

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateAssignmentSheetData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                console.log("check nodejs ", data);
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter",
                });
            }
            let assignment_form = await db.Phieugiaoviec.findOne({
                where: { id: data.id },
                raw: false,
            });
            let congviec_1 = await db.Congviec.findOne({
                where: { ma_phieu_tiep_nhan: data.id, tuan_thu: "1" },
                raw: false,
            });
            let congviec_2 = await db.Congviec.findOne({
                where: { ma_phieu_tiep_nhan: data.id, tuan_thu: "2" },
                raw: false,
            });
            let congviec_3 = await db.Congviec.findOne({
                where: { ma_phieu_tiep_nhan: data.id, tuan_thu: "3" },
                raw: false,
            });
            let congviec_4 = await db.Congviec.findOne({
                where: { ma_phieu_tiep_nhan: data.id, tuan_thu: "4" },
                raw: false,
            });
            let congviec_5 = await db.Congviec.findOne({
                where: { ma_phieu_tiep_nhan: data.id, tuan_thu: "5" },
                raw: false,
            });
            let congviec_6 = await db.Congviec.findOne({
                where: { ma_phieu_tiep_nhan: data.id, tuan_thu: "6" },
                raw: false,
            });
            let congviec_7 = await db.Congviec.findOne({
                where: { ma_phieu_tiep_nhan: data.id, tuan_thu: "7" },
                raw: false,
            });
            let congviec_8 = await db.Congviec.findOne({
                where: { ma_phieu_tiep_nhan: data.id, tuan_thu: "8" },
                raw: false,
            });

            if (assignment_form) {
                assignment_form.ngay_bd_thuc_tap = data.ngaybdthuctap;
                assignment_form.ngay_kt_thuc_tap = data.ngayktthuctap;
                await assignment_form.save();

                congviec_1.viec_lam = data.vieclam1;
                congviec_2.viec_lam = data.vieclam2;
                congviec_3.viec_lam = data.vieclam3;
                congviec_4.viec_lam = data.vieclam4;
                congviec_5.viec_lam = data.vieclam5;
                congviec_6.viec_lam = data.vieclam6;
                congviec_7.viec_lam = data.vieclam7;
                congviec_8.viec_lam = data.vieclam8;

                congviec_1.so_buoi = data.sobuoi1;
                congviec_2.so_buoi = data.sobuoi2;
                congviec_3.so_buoi = data.sobuoi3;
                congviec_4.so_buoi = data.sobuoi4;
                congviec_5.so_buoi = data.sobuoi5;
                congviec_6.so_buoi = data.sobuoi6;
                congviec_7.so_buoi = data.sobuoi7;
                congviec_8.so_buoi = data.sobuoi8;

                congviec_1.ngay_bd = data.ngaybd1;
                congviec_2.ngay_bd = data.ngaybd2;
                congviec_3.ngay_bd = data.ngaybd3;
                congviec_4.ngay_bd = data.ngaybd4;
                congviec_5.ngay_bd = data.ngaybd5;
                congviec_6.ngay_bd = data.ngaybd6;
                congviec_7.ngay_bd = data.ngaybd7;
                congviec_8.ngay_bd = data.ngaybd8;

                congviec_1.ghi_chu = data.ghichu1;
                congviec_2.ghi_chu = data.ghichu2;
                congviec_3.ghi_chu = data.ghichu3;
                congviec_4.ghi_chu = data.ghichu4;
                congviec_5.ghi_chu = data.ghichu5;
                congviec_6.ghi_chu = data.ghichu6;
                congviec_7.ghi_chu = data.ghichu7;
                congviec_8.ghi_chu = data.ghichu8;

                await congviec_1.save();
                await congviec_2.save();
                await congviec_3.save();
                await congviec_4.save();
                await congviec_5.save();
                await congviec_6.save();
                await congviec_7.save();
                await congviec_8.save();

                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//------------------------------------------------------------------

//------------------------------------------------------------------

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    checkIdInternshipLocation: checkIdInternshipLocation,
    getAllUsers: getAllUsers,
    getAllStudentManager: getAllStudentManager,
    getAllLecturer: getAllLecturer,
    getAllLecturerById: getAllLecturerById,
    getAllStudent: getAllStudent,
    getAllEmployee: getAllEmployee,
    getAllAdmin: getAllAdmin,
    createNewUser: createNewUser,
    createNewLecturer: createNewLecturer,
    createNewEduStaff: createNewEduStaff,
    createNewStudent: createNewStudent,
    createNewEmployee: createNewEmployee,
    createNewAdmin: createNewAdmin,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    updateStudentmanagerData: updateStudentmanagerData,
    updateLecturerData: updateLecturerData,
    updateStudentData: updateStudentData,
    updateEmployeeData: updateEmployeeData,
    updateAdminData: updateAdminData,
    getAllALLCode: getAllALLCode,
    getAllSubject: getAllSubject,
    getAllClass: getAllClass,
    createNewInternshipLocation: createNewInternshipLocation,
    getAllInternshipLocation: getAllInternshipLocation,
    deleteInternshipLocation: deleteInternshipLocation,
    updateInternshipLocationData: updateInternshipLocationData,
    createNewRegistrationForm: createNewRegistrationForm,
    getAllRegistrationForm: getAllRegistrationForm,
    deleteRegistrationForm: deleteRegistrationForm,
    getAllRegistrationFormByStudent: getAllRegistrationFormByStudent,
    getAllStudentById: getAllStudentById,
    updateRegistrationFormData: updateRegistrationFormData,
    createNewLecturerAssignment: createNewLecturerAssignment,
    getAllAssignmentSheet: getAllAssignmentSheet,
    getAllRegistrationFormByEmployee: getAllRegistrationFormByEmployee,
    updateAssignmentSheetData: updateAssignmentSheetData,
    getAllDetailAssignmentSheet: getAllDetailAssignmentSheet,
    getAllDetailAssignmentSheetById: getAllDetailAssignmentSheetById,
    createNewRatingSheet: createNewRatingSheet,
    createNewScoreSheet: createNewScoreSheet,
    getAllRatingSheet: getAllRatingSheet,
    getAllRegistrationFormByLecturer: getAllRegistrationFormByLecturer,
    getAllScoreSheet: getAllScoreSheet,
};
