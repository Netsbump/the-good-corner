module.exports = {
    root: true, // Indique qu'il s'agit de la configuration de plus haut niveau et qu'ESLint ne doit pas chercher d'autres configurations
    env: {
      browser: true, // Définit l'environnement d'exécution comme navigateur (window, document, etc. disponibles)
      es2020: true, // Active les fonctionnalités d'ECMAScript 2020
    },
    extends: [
      'eslint:recommended', // Utilise un ensemble de règles recommandées par ESLint
      'plugin:@typescript-eslint/recommended-type-checked',
      'plugin:prettier/recommended', // Intègre Prettier avec ESLint pour formater le code selon les règles définies
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'], // Dossiers et fichiers à ignorer par ESLint
    parser: '@typescript-eslint/parser', // Utilise le parseur de TypeScript pour ESLint
    parserOptions: {
      ecmaVersion: 'latest', // Utilise la dernière version disponible d'ECMAScript
      sourceType: 'module', // Indique que le code utilise des modules ES6
      project: ['./tsconfig.json', './tsconfig.node.json'], // Chemins vers les fichiers de configuration TypeScript
      tsconfigRootDir: __dirname, // Répertoire racine pour les fichiers tsconfig
    },
    plugins: [
      '@typescript-eslint', // Active les règles spécifiques à TypeScript
      'prettier' // Active Prettier comme plugin ESLint
    ],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn', // Exiger un type de retour explicite pour les fonctions
      '@typescript-eslint/no-unused-vars': 'error', // Signaler les variables inutilisées
      '@typescript-eslint/no-explicit-any': 'warn', // Avertir contre l'utilisation de 'any'
      'prettier/prettier': 'error', // Signaler les erreurs de formatage Prettier comme des erreurs ESLint
    },
  };