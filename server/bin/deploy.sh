echo "Deploying server app"

# set application env variables
echo "Add app env variables"
vercel env add PORT=$PORT 
vercel env add NODE_ENV=$NODE_ENV 
vercel env add MONGO_USER=$MONGO_USER 
vercel env add MONGO_CLUSTER=$MONGO_CLUSTER 
vercel env add MONGO_DATABASE=$MONGO_DATABASE 
vercel env add MONGO_USER_PASSWORD=$MONGO_USER_PASSWORD

# link app to vercel project
vercel link dist/ --token=$VERCEL_TOKEN --project=$VERCEL_SERVER_PROJECT --scope=$VERCEL_SCOPE --yes

# deploy tp project
# vercel deploy dist/ --token=$VERCEL_TOKEN

