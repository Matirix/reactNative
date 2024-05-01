
import { Client, Account, ID, Avatars, Databases, Query} from 'react-native-appwrite';
// Init your react-native SDK
const client = new Client();

export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.matirix.aora",
    projectId:"6631763d00198b67c0c6",
    databaseId: "66317710000bfa4c0cc9",
    userCollectionId: "663177300003c4ded371",
    videoCollectionId: "66317748000aa094a9cd",
    storageId: "66317863002900700a14"
}


client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw Error;

        // Generatating avatar link
        avatarURL = avatars.getInitials(username)

        // Signing in and getting user session
        await signIn(email, password);

        // Database user creation
        const newUser = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            {
                userId: newAccount.$id,
                username,
                email,
                avatar: avatarURL
            }

        )
        
        return newUser;


    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [Query.equal('userId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0];

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}