module.exports = {
  root: true, // Indique qu'il s'agit de la configuration de plus haut niveau et qu'ESLint ne doit pas chercher d'autres configurations
  env: {
    browser: true, // Définit l'environnement d'exécution comme navigateur (window, document, etc. disponibles)
    es2021: true, // Active les fonctionnalités d'ECMAScript 2020
  },
  parser: "@typescript-eslint/parser", // Utilise le parseur de TypeScript pour ESLint
  parserOptions: {
    ecmaVersion: 2021, // Utilise la version ECMAScript 2021
    sourceType: 'module', // Indique que le code utilise des modules ES6
    project: './tsconfig.json', // Chemin vers le fichier tsconfig.json
    tsconfigRootDir: __dirname, // Répertoire racine pour le tsconfig.json
  },
  extends: [
    "eslint:recommended", // Utilise un ensemble de règles recommandées par ESLint
    'plugin:@typescript-eslint/recommended', // Règles spécifiques à TypeScript recommandées
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:prettier/recommended", // Intègre Prettier avec ESLint pour formater le code selon les règles définies
  ],
 
  plugins: [
    "@typescript-eslint", // Active les règles spécifiques à TypeScript
    "prettier", // Active Prettier comme plugin ESLint
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "warn", // Exiger un type de retour explicite pour les fonctions
    "@typescript-eslint/no-unused-vars": "error", // Signaler les variables inutilisées
    "@typescript-eslint/no-explicit-any": "warn", // Avertir contre l'utilisation de 'any'
    "prettier/prettier": "error", // Signaler les erreurs de formatage Prettier comme des erreurs ESLint
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.js'], // Ignore ces dossiers et fichiers
};
