# link project to vercel 
echo "Link app to vercel project"
cd dist/ && vercel link --token=$VERCEL_TOKEN --project=$VERCEL_CLIENT_PROJECT --scope=$VERCEL_SCOPE --yes

# set application env variables
echo "Add app env variables"
echo $VITE_BASE_URL | vercel env add VITE_BASE_URL --prod --token=$VERCEL_TOKEN 
echo $VITE_AUTH0_DOMAIN | vercel env add VITE_AUTH0_DOMAIN --prod --token=$VERCEL_TOKEN
echo $VITE_AUTH0_CLIENT_ID | vercel env add VITE_AUTH0_CLIENT_ID --prod --token=$VERCEL_TOKEN
echo $VITE_AUTH0_REDIRECT_URI | vercel env add VITE_AUTH0_REDIRECT_URI --prod --token=$VERCEL_TOKEN
echo $VITE_AUTH0_API_AUDIENCE | vercel env add VITE_AUTH0_API_AUDIENCE --prod --token=$VERCEL_TOKEN
echo $VITE_AUT0_READ_API_SCOPE | vercel env add VITE_AUT0_READ_API_SCOPE --prod --token=$VERCEL_TOKEN
echo $VITE_AUTH0_UPDATE_API_SCOPE | vercel env add VITE_AUTH0_UPDATE_API_SCOPE --prod --token=$VERCEL_TOKEN

# deploy to project
echo "Deploying client app"
vercel deploy --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes --prod --confirm