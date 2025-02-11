export const appwriteConfig = {
    endpointUrl: process.env.ENDPOINT_ID!,
    projectId: process.env.PROJECT_ID!,
    databaseId: process.env.DATABASE_ID!,
    usersCollectionId: process.env.USERS_COLLECTION_ID!,
    filesCollectionId: process.env.FILES_COLLECTION_ID!,
    bucketId: process.env.BUCKET_ID!,
    secretKey: process.env.SECRET_KEY!,
}