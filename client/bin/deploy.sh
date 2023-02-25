#
vercel env add VITE_BASE_URL=$VITE_BASE_URL
vercel env add VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN
vercel env add VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID
vercel env add VITE_AUTH0_REDIRECT_URI=$VITE_AUTH0_REDIRECT_URI
vercel env add VITE_AUTH0_API_AUDIENCE=$VITE_AUTH0_API_AUDIENCE

# link project to vercel 
vercel link dist/ --token=$VERCEL_TOKEN --project=$VERCEL_CLIENT_PROJECT --scope=$VERCEL_SCOPE --yes

# deploy tp project
# vercel deploy dist/ --token=$VERCEL_TOKEN