FROM node:20-alpine3.21

WORKDIR /app

# Activer corepack et préparer pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copie des fichiers globaux de la racine
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copier le package.json du frontend
COPY frontend/package.json frontend/

# Installer les dépendances
RUN pnpm install

# Se déplacer dans le dossier frontend
WORKDIR /app/frontend

# Copier les fichiers du frontend
COPY frontend/tsconfig.json ./
COPY frontend/tsconfig.app.json ./
COPY frontend/tsconfig.app.tsbuildinfo ./
COPY frontend/tsconfig.node.json ./
COPY frontend/tsconfig.node.tsbuildinfo ./
COPY frontend/index.html ./
COPY frontend/vite.config.ts ./

COPY frontend/.eslint.config.* ./
COPY frontend/postcss.config.* ./
COPY frontend/tailwind.config.* ./

COPY frontend/public ./public
COPY frontend/src ./src

CMD ["pnpm", "dev"]