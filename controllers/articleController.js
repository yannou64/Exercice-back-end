import { Article } from "../models/Article.js";
import { AdminOrAuthor } from "../utils/articleUtils.js";

// Création d'un nouvel article
export async function createArticle(req, res) {
  try {
    // On récupère les données du nouvel article dans body
    const { title, content, category } = req.body;
    if (!title || !content || !category)
      return res.status(400).json({ message: "Invalid fields for creating an article" });

    // On créé l'article
    const newArticle = new Article({
      title,
      content,
      category,
      author: req.user.username,
    });
    await newArticle.save();

    //reponse
    res.status(200).json({ message: "The Article has been created successfully" });
  } catch (e) {
    res.status(500).json({ message: `Failure whith create article : ${e.message}` });
  }
}

// Obtenir tous les articles
export async function getAllArticle(req, res) {
  try {
    // On récupère les options de trie et de filtre
    const { sort, category } = req.query;

    // si sort === "asc" on récupère les article filtré par category trier par date de création la plus vieille
    // Sinon on trie par date de création la plus récente
    const sortEffective = sort === "asc" ? 1 : -1;
    const articles = await Article.find({ category }).sort({ createAt: sortEffective });

    // On vérifie s'il y a du contenu
    if (articles.length === 0)
      return res.status(404).json({ message: `No items return by the database, sort: ${sort} category: ${category}` });
    res.status(200).json({ message: "All articles : ", articles });
  } catch (e) {
    res.status(500).json({ message: `Problem whith getAllarticle : ${e.message}` });
  }
}

// Obtenir un article en fonction d'un id
export async function getArticle(req, res) {
  try {
    // On récupère l'id dans les params
    const { id } = req.params;

    // On cherche un article correspondant à l'id
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: `No article with the id : ${id}` });

    // Reponse
    res.status(200).json({ article });
  } catch (e) {
    res.status(500).json({ Error: `Error while trying to get one article : ${e.message}` });
  }
}

// Mettre à jour un article par son id
export async function updateArticle(req, res) {
  try {
    // On récupère l'id de l'article
    const { id } = req.params;

    // On récupère les éléments à modifier dans l'articl
    const { title, content, category } = req.body;
    if (!title || !content || !category) return res.status(400).json({ message: "One or more fields are empty" });

    // On récupère l'article
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: `No ressources found` });

    // On vérifie que l'émetteur de la requête est soit admin soit l'autheur
    if (!AdminOrAuthor(req.user, article))
      return res.status(403).json({ message: `You are not allowed to modify the article` });

    // On fait la modification de l'article
    const updateArticle = await Article.updateOne({ _id: id }, { $set: { title, content, category } });

    // Réponse
    res.status(200).json({ message: `Update done : ${updateArticle}` });
  } catch (e) {
    res.status(500).json({ Error: `Error while trying update an article : ${e.message}` });
  }
}

export async function deleteArticle(req, res) {
  try {
    // On récupère l'id
    const {id} = req.params

    // On récupère l'article
    const article = await Article.findById(id)
    if (!article) return res.status(404).json({ message: `No ressources found` })

    // On vérifie que l'émetteur de la requête est soit admin soit l'autheur
    if (!AdminOrAuthor(req.user, article))
      return res.status(403).json({ message: `You are not allowed to modify the article` });

    // On supprimem l'article
    await Article.findByIdAndDelete(id)

    // Réponse
    res.status(200).json({ message: `Delete done` });
  } catch (e) {
    res.status(500).json({ Error: `Error while trying delete an article : ${e.message}` });
  }
}
