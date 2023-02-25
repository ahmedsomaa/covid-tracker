echo "Deploying server app"

# link app to vercel project
echo "Link app to vercel project"
vercel link dist/ --token=$VERCEL_TOKEN --project=$VERCEL_SERVER_PROJECT --scope=$VERCEL_SCOPE --yes

# set application env variables
echo "Add app env variables"
vercel env add PORT=$PORT --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add NODE_ENV=$NODE_ENV --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add MONGO_USER=$MONGO_USER --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add MONGO_CLUSTER=$MONGO_CLUSTER --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add MONGO_DATABASE=$MONGO_DATABASE --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes
vercel env add MONGO_USER_PASSWORD=$MONGO_USER_PASSWORD --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE --yes

# deploy tp project
vercel deploy dist/ --token=$VERCEL_TOKEN

