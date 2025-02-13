export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_ENDPOINT_ID!,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    databaseId: process.env.NEXT_PUBLIC_DATABASE_ID!,
    usersCollectionId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
    filesCollectionId: process.env.NEXT_PUBLIC_FILES_COLLECTION_ID!,
    bucketId: process.env.NEXT_PUBLIC_BUCKET_ID!,
    secretKey: process.env.SECRET_KEY!,
}