import { Article } from "../models/Article.js";

// Création d'un nouvel article
export async function createArticle(req, res) {
  try {
    // On récupère les données du nouvel article dans body
    const { title, content, category } = req.body;
    if (!title || !content || !category) return res.status(400).json({ message: "Champs invalident pour la création d'un article" });

    // On créé l'article
    const newArticle = new Article({
      title,
      content,
      category,
      author: req.user.username
    }) 
    await newArticle.save()

    //reponse
    res.status(200).json({ message: "L'article a bien été créé" });
  } catch (e) {
    res.status(500).json({ message: `Echec de la création d'article : ${e.message}` });
  }
}


// Obtenir tous les articles
export async function getAllArticle(req, res) {
  try {
    // On récupère les options de trie et de filtre
    const { sort, category } = req.query

    // si sort === "asc" on récupère les article filtré par category trier par date de création la plus vieille
    // Sinon on trie par date de création la plus récente
    const sortEffective = sort === "asc" ? 1 : -1
    const articles = await Article.find({ category }).sort({ createAt: sortEffective });

    // On vérifie s'il y a du contenu
    if (articles.length === 0) return res.status(404).json({ message: `Pas d'articles retournés par la base de donnée, sort: ${sort} category: ${category}` });
    res.status(200).json({message: "Voici tous les articles", articles})
  } catch (e) {
    res.status(500).json({message: `Problème pendant getAllarticle : ${e.message}`})
  }
}

// Obtenir un article en fonction d'un id
export async function getArticle(req, res){
  try {
    // On récupère l'id dans les params
    const {id} = req.params 

    // On cherche un article correspondant à l'id
    const article =  await Article.findById(id)
    if(!article) return res.status(404).json({message: `No article with the id : ${id}`})

    // Reponse
    res.status(200).json({ article })
  } catch (e) {
    res.status(500).json({Error: `Error while trying to get one article : ${e.message}`})
  }
}

