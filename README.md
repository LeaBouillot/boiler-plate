# Boilerplate Node.js + React + MongoDB

Ce projet est un boilerplate de base pour une application full-stack utilisant Node.js pour le backend, React pour le frontend et MongoDB comme base de données.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Étape 1 : 
Node.js (avec npm inclus)
MongoDB installé et en cours d'exécution
Installation

- Étape 2 : Installez les dépendances backend
Dans le répertoire du backend (supposé être dans le dossier server), installez les dépendances nécessaires à Node.js :

##### `npm install mongoose --save`
##### `npm install body-parser --save`
##### `npm install nodemon --save-dev`

- mongoose : ODM (Object Data Modeling) pour MongoDB et Node.js.
- body-parser : Middleware pour analyser les données POST.
- nodemon : Outil de développement qui redémarre automatiquement le serveur lors de changements de fichiers.

## Démarrage du projet

#### Backend (Node.js + MongoDB)
#### Dans le dossier server, lancez le serveur en utilisant nodemon :
`npm run dev
`
## Structure du projet
`
boilerplate/ <br>
├── config/          # Config
│   ├── dev.js/      # module.exports
│   ├── key.js/      # process.env.NODE_ENV
│   ├── prod.js/     # process.env.MONGO_URI
├── modles/          # Modèles Mongoose
│   ├── User.js/     # userSchema mongoose
├── index.js/        # Point d'entrée du serveur
├── .gitignore       # Fichiers à ignorer par Git
├── package.json     # Dépendances et scripts du projet
├── README.md        # Documentation du projet
`


### Description des répertoires et fichiers

- **`config/`** : Contient les fichiers de configuration pour différents environnements.
  - **`dev.js`** : Contient la configuration spécifique à l'environnement de développement (par exemple, paramètres de connexion à la base de données pour le développement).
  - **`key.js`** : Gère les variables d'environnement et le processus de configuration en fonction du type d'environnement (développement, production).
  - **`prod.js`** : Contient la configuration pour l'environnement de production (par exemple, la connexion à MongoDB en production avec `process.env.MONGO_URI`).

- **`models/`** : Contient les modèles de données pour MongoDB en utilisant Mongoose.
  - **`User.js`** : Définit le schéma Mongoose pour les utilisateurs. Ce modèle représente les données d'un utilisateur dans la base de données.

- **`index.js`** : Le point d'entrée du serveur Node.js. Ce fichier configure le serveur Express, les routes, les middleware et la connexion à la base de données.

- **`.gitignore`** : Fichier de configuration pour Git qui spécifie les fichiers ou répertoires à ignorer, comme `node_modules/`, `.env`, ou d'autres fichiers sensibles.

- **`package.json`** : Fichier de configuration npm, contenant la liste des dépendances et des scripts pour le projet (backend et frontend si nécessaire).
