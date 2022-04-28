import db from '../models/index';
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) => {
    try{
        let data = await db.Taikhoan.findAll();
        let data2 = await db.Nguoidung.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
            data2: JSON.stringify(data2)
        });
    } catch(e) {
        console.log(e)
    }  
}

let getAboutPage = async (req, res) => { 
    // return res.render('test/about.ejs');
    try{
        let data1 = await db.Nguoidung.findAll();
        return res.render('test/about.ejs', {
            data1: JSON.stringify(data1)
        });
    } catch(e) {
        console.log(e)
    }  
}

let getCRUD = async (req, res) => { 
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('postCRUD from Controller');
}
let displayGetCRUD = async (req, res) => {
    let dataUser = await CRUDService.getAllUser();
    let dataStudent = await CRUDService.getAllStudent();
    let dataAccount = await CRUDService.getAllAccount();
    return res.render('displayCRUD.ejs', {
        dataTableUser: dataUser,
        dataTableStudent: dataStudent,
        dataTableAccount: dataAccount
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.s_id;
    console.log(userId)
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // check user data not found
        // let userData
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send('Tai khoan khong ton tai!')
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    let dataStudent = await CRUDService.getAllStudent();
    let dataAccount = await CRUDService.getAllAccount();
    return res.render('displayCRUD.ejs', {
        dataTableUser: allUsers,
        dataTableStudent: dataStudent,
        dataTableAccount: dataAccount
    })
}
let deleteCRUD = async (req, res) => {
    let userId = req.query.s_id
    if (userId) {
        await CRUDService.deleteUserById(userId);
        return res.send('Xoa nguoi dung thanh cong!')
    } else {
        return res.send('Khong tim thay nguoi dung!')
    }
    
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

}