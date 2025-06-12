import { User } from "../models/User.js";
import { hashPassword } from "../utils/userUtils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// login d'un utilisateur
export async function login(req, res) {
  try {
    // On récupére les données de log dans le body
    const { password, email } = req.body;

    // On recherche dans la bdd un utilisateur qui correspond au mail
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ Error: "Mauvais paramètres de connection" });

    // On vérifie le mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ Error: "Mauvais paramètres de connection" });

    // On génére un token
    const token = jwt.sign({id: user.id, username: user.username, role: user.role }, process.env.SECRET, { expiresIn: "2h" });

    // On envoie le token via cookie (plus sécurisé et pratique avec insomnia que la méthode bearer)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
      maxAge: 3600000,
    });

    // Réponse
    res.status(200).json({ message: `Vous ête loggé et un token a été attribué : ${token}` });
  } catch (e) {
    res.status(500).json({ message: `Erreur pendant le login : ${e.message}` });
  }
}

// logout d'un utilisateur
export async function logout(req, res) {
  try {
    // On vérifie s'il y a un token
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ Error: "Absence de token" });

    // On nettoie le cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
    });

    // On envoie la réponse
    res.status(200).json({ message: "Deconnexion réussie" });
  } catch (e) {
    res.status(500).json({ message: `Erreur pendant le logout : ${e.message}` });
  }
}

// Création d'un nouvel utilisateur
export async function create(req, res) {
  try {
    // On récupère les données du nouvel user
    const { email, password, username, role = "user" } = req.body;

    // On vérifie si l'utilisateur existe déjà en recherchant par son email
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Cet utilisateur existe déjà" });

    // On hash le password
    const hashedPassword = await hashPassword(password);

    // On créé le nouvel utilisateur
    await User.create({ email, password: hashedPassword, username, role });

    // Réponse
    res.status(201).json({ message: `Super! l'utilisateur a bien été enregistré, bienvenu à ${username}` });
  } catch (e) {
    res.status(500).json({ message: `Problème pour enregistrer le nouvel utilisateur : ${e.message}` });
  }
}
