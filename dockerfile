from node:latest as node
workdir /app
copy ..
run npm install
run npm run build --prod

from nginx:alpine
copy --from = node /app/dist/tweet-app-front /usr/share/nginx/html