# 使用 Node.js 官方映像檔作為基底
FROM node:20-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製其餘檔案
COPY . .

# 建置 React 應用程式
RUN npm run build

# 使用 Nginx 來提供靜態檔案
FROM nginx:alpine

# 複製建置好的檔案到 Nginx 的預設資料夾
COPY --from=0 /app/build /usr/share/nginx/html

# 開放 80 埠
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]