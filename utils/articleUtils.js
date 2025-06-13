
// Vérifier que l'utilisateur est soit admin soit l'auteur de l'article
export function AdminOrAuthor(user, article) {
  if (user.role === "user" && user.author != article.author) {
    return false
  }
  return true;
}
