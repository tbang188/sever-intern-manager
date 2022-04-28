import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => { //tao tai khoan Sinh vien
    return new Promise(async(resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.matkhau);
            await db.Nguoidung.create({
                s_id: data.sid, //khoa chinh
                ho_ten: data.hoten,
                dia_chi: data.diachi,
                email: data.email,
                sdt: data.sdt
            })
            await db.Sinhvien.create({
                s_id: data.sid, //khoa chinh + ngoai
                ma_lop: data.malop //khoa chinh
            })
            await db.Taikhoan.create({
                s_id: data.sid, //khoa chinh + ngoai
                ten_dang_nhap: data.email,
                mat_khau: hashPasswordFromBcrypt,
                loai_tai_khoan: data.loaitaikhoan
            })        
            resolve('OK! Tao tai khoan THANH CONG!')
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => { // hash password
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => { //lay tat ca trong bang 'nguoidung'
    return new Promise(async(resolve, reject) => {
        try {
            let users = db.Nguoidung.findAll({
                raw: true,
            })          
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getAllStudent = () => { //lay tat ca trong bang 'sinhvien'
    return new Promise(async(resolve, reject) => {
        try {
            let students = db.Sinhvien.findAll({
                raw: true,
            })          
            resolve(students)
        } catch (e) {
            reject(e)
        }
    })
}

let getAllLecturer = () => { //lay tat ca trong bang 'giangvien'
    return new Promise(async(resolve, reject) => {
        try {
            let lecturers = db.Giangvien.findAll({
                raw: true,
            })          
            resolve(lecturers)
        } catch (e) {
            reject(e)
        }
    })
}

let getAllStudyManager = () => { //lay tat ca trong bang 'giaovu'
    return new Promise(async(resolve, reject) => {
        try {
            let study_managers = db.Giaovu.findAll({
                raw: true,
            })          
            resolve(study_managers)
        } catch (e) {
            reject(e)
        }
    })
}

let getAllEmployee  = () => { //lay tat ca trong bang 'nhanvien'
    return new Promise(async(resolve, reject) => {
        try {
            let employees = db.Nhanvien.findAll({
                raw: true,
            })          
            resolve(employees)
        } catch (e) {
            reject(e)
        }
    })
}

let getAllAccount = () => { //lay tat ca trong bang 'taikhoan'
    return new Promise(async(resolve, reject) => {
        try {
            let accounts = db.Taikhoan.findAll({
                raw: true,
            })          
            resolve(accounts)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.Nguoidung.findOne({
                where: { s_id: userId}
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.Nguoidung.findOne({
                where: { s_id: data.s_id},
                raw: false
            })
            if (user) {
                user.ho_ten = data.hoten;
                user.sdt = data.sdt;
                user.dia_chi = data.diachi;

                await user.save();

                let allUsers = await db.Nguoidung.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user1 = await db.Nguoidung.findOne({
                where: { s_id: userId}
            })
            let user2 = await db.Sinhvien.findOne({
                where: { s_id: userId}
            })
            let user3 = await db.Taikhoan.findOne({
                where: { s_id: userId}
            })
            
            if (user1) {
                await db.Nguoidung.destroy({
                    where: { s_id: userId }
                })
                await db.Sinhvien.destroy({
                    where: { s_id: userId }
                })
                await db.Taikhoan.destroy({
                    where: { s_id: userId }
                })
                resolve();
            }
        } catch (e) {
            reject(e);
        }    
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getAllStudent: getAllStudent,
    getAllLecturer: getAllLecturer,
    getAllStudyManager: getAllStudyManager,
    getAllEmployee: getAllEmployee,
    getAllAccount: getAllAccount,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,

}