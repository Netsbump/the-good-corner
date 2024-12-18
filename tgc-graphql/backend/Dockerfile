FROM node:20-alpine3.21

WORKDIR /app

# Activer corepack et préparer pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copie des fichiers globaux de la racine
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copier les package.json
COPY backend/package.json backend/
COPY packages/package.json packages/

# Copier le code source du package partagé
COPY packages packages/

# Installer les dépendances
RUN pnpm install

# Se déplacer dans le dossier backend
WORKDIR /app/backend

# Copier les fichiers de configuration du backend
COPY backend/tsconfig.json ./
COPY backend/eslint.config.* ./

# Copier le code source
COPY backend/src/ ./src/

CMD ["pnpm", "start"] 