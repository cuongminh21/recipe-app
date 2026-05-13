# Extension
## backend
> npm init -y
> npm i express@5.1.0 @neondatabase/serverless@1.0.0 cors@2.8.5 dotenv@16.5.0 drizzle-orm@0.44.22 cron@4.3.0
> npm i nodemon@3.1.10 -D
> npm i -D drizzle-kit tsx
> npx drizzle-kit generate --config=./drizzle.config.js
> npx drizzle-kit migrate --config=./drizzle.config.js
## frontend
> npx create-expo-app@latest .
> npm run reset-project
> npm install @clerk/expo expo-secure-store
> npx expo install expo-linear-gradient
> npm i react-native-webview


# package.json
 "type": "module",
 "main": "src/server.js",
 "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
 },