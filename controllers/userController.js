import { User } from "../models/User.js"
import { hashPassword } from "../utils/userUtils.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function loginUserController(req, res) {
  // récupérer les données de log dans le body
  const {password, email, role} = req.body
  try{
    // rechercher dans la bdd un utilisateur qui correspond au mail
    const user = await User.findOne({email})
    if(!user) throw new Error("Mauvais paramètre de connection")
    // comparer le mot de passe 
    const match = await bcrypt.compare(password, user.password)
    if(!match) throw new Error("Mauvais paramètre de connection")
    // générer un token 
    const token = jwt.sign({email, role: "client"}, process.env.SECRET, {expiresIn: "2h"})
    // reponse
    res.status(200).cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: 'strict'
    }).json({message: `Vous ête loggé et un token a été attribué : ${token}`})
  } catch(e) {
    res.status(400).json({message: `erreur : ${e.message}`})
  }
}

export async function logoutUserController(req, res){
    res.clearCookie('token').status(200).json({message: "Deconnexion réussie"})
}

export async function createUser(req, res){
  // On récupère les données du nouvel user
  const {email, password} = req.body
  // On vérifie si l'email existe déjà
  try {
      const user = await User.findOne({email})
    if(user){
      res.status(400).json({message: "Cet utilisateur existe déjà"})
    } else {
      const hashedPassword = await hashPassword(password)
      await User.create({email, password: hashedPassword})
      res.status(200).json({message: "Super! l'utilisateur a bien été enregistré"})
    }
  } catch (e) {
    res.status(400).json({message: `Problème pour enregistrer le nouvel utilisateur : ${e.message}`})
  }
}