import Users from "../models/UsersModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid','name','email','role'],
        });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}

export const getUserById = async(req, res) =>{  
    try {
        const response = await Users.findOne({
            attributes: ['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}

export const createUser = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role :  role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
}

export const updateUser = (req, res) =>{
    
}

export const deleteUser = (req, res) =>{
    
}