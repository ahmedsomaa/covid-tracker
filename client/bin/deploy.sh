# link project to vercel 
echo "Link app to vercel project"
cd dist/ && vercel link --token=$VERCEL_TOKEN --project=$VERCEL_CLIENT_PROJECT --scope=$VERCEL_SCOPE --yes

# set application env variables
echo "Add app env variables"
echo $VITE_BASE_URL | vercel env add VITE_BASE_URL production --token=$VERCEL_TOKEN 
echo $VITE_AUTH0_DOMAIN | vercel env add VITE_AUTH0_DOMAIN production --token=$VERCEL_TOKEN
echo $VITE_AUTH0_CLIENT_ID | vercel env add VITE_AUTH0_CLIENT_ID production --token=$VERCEL_TOKEN
echo $VITE_AUTH0_REDIRECT_URI | vercel env add VITE_AUTH0_REDIRECT_URI production --token=$VERCEL_TOKEN
echo $VITE_AUTH0_API_AUDIENCE | vercel env add VITE_AUTH0_API_AUDIENCE production --token=$VERCEL_TOKEN

# deploy to project
echo "Deploying client app"
cd dist/ && vercel deploy --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes --prod --confirm