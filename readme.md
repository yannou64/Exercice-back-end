# Instruction d'installation

## Cloner le dépôt :

```bash
git clone https://github.com/yannou64/Exercice-back-end.git
cd Exercice-back-end
```

## Installer les dépendances

```bash
npm install
```

## Crér un fichier .env à la racine avec :

```ini
PORT=3000
URI=<lien vers base de donnee>
SECRET=<secret>
NODE_ENV=production
```

## Lancer le serveur

```bash
npm start
```

# Liste des routes

## Authentification

| Méthode | Route          | Description |
| ------- | -------------- | ----------- |
| POST    | /auth/login    | Connexion   |
| POST    | /auth/register | Inscription |
| POS     | /auth/logout   | Deconnexion |

## Articles

| Méthode | Route              | Description               |
| ------- | ------------------ | ------------------------- |
| GET     | /article/posts     | Obtenir tous les articles |
| GET     | /article/posts/:id | Obtenir un article par id |
| POST    | /article/posts     | Créer un nouvel article   |
| PUT     | /article/posts/:id | Modifier un article       |
| DELETE  | /article/posts/:id | Supprimer un article      |

# Exemple de requête insomnia

## Authentification

### Connexion

http://localhost:4434/auth/login

```
{
	"password": "admin",
	"email": "yan@toto.com"
}
```

### Inscription

http://localhost:4434/auth/register

```
{
	"username": "yan",
	"email": "yan@toto.com",
	"role": "admin",
	"password": "admin"
}
```

### Deconnexion
