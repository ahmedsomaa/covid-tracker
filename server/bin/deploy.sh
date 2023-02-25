# link app to vercel project
echo "Link app to vercel project"
vercel link --token=$VERCEL_TOKEN --project=$VERCEL_SERVER_PROJECT --scope=$VERCEL_SCOPE --yes

# set application env variables
echo "Add app env variables"
echo $PORT | vercel env add PORT production --token=$VERCEL_TOKEN
echo $NODE_ENV | vercel env add NODE_ENV production --token=$VERCEL_TOKEN
echo $MONGO_USER | vercel env add MONGO_USER production --token=$VERCEL_TOKEN
echo $MONGO_CLUSTER | vercel env add MONGO_CLUSTER production --token=$VERCEL_TOKEN
echo $MONGO_DATABASE | vercel env add MONGO_DATABASE production --token=$VERCEL_TOKEN
echo $MONGO_USER_PASSWORD | vercel env add MONGO_USER_PASSWORD production --token=$VERCEL_TOKEN

# deploy tp project
echo "Deploying server app"
vercel deploy dist/ --token=$VERCEL_TOKEN

