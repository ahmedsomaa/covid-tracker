echo "Deploying client app"

# link project to vercel 
echo "Link app to vercel project"
vercel link --token=$VERCEL_TOKEN --project=$VERCEL_CLIENT_PROJECT --scope=$VERCEL_SCOPE --yes

# set application env variables
vercel env add VITE_BASE_URL=$VITE_BASE_URL --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add VITE_AUTH0_REDIRECT_URI=$VITE_AUTH0_REDIRECT_URI --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add VITE_AUTH0_API_AUDIENCE=$VITE_AUTH0_API_AUDIENCE --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes

# deploy tp project
vercel deploy dist/ --token=$VERCEL_TOKEN