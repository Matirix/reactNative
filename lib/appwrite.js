
import { Client, Account, ID, Avatars, Databases, Query, Storage} from 'react-native-appwrite';
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
const storage = new Storage(client);

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

// Creating a user session
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

// For Getting the user's session + data
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


export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
        )
        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.orderAsc("$createdAt"), Query.limit(3)]
        )
        // console.log(posts.documents)
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }

}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }

}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async() => {
    try {
        const session =  await account.deleteSession('current');
        return session
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;
     try {
        if (type === 'image') {
            fileUrl = storage.getFilePreview(appWriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
        }
        if (type === 'video') {
            fileUrl = storage.getFileView(appWriteConfig.storageId, fileId);
        } else {
            throw new Error('Invalid file type')
        }
        if (!fileUrl) throw Error;

        return fileUrl;

     } catch (error)
     {
        throw new Error(error);
     }
 }

export const uploadFile = async (file, type) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.type,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            appWriteConfig.storageId,
            ID.unique(),
            asset
        );
        
        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])
        const newPost = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                description: form.description,
                prompt: form.prompt,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                creator: form.creator
            }
        )
        return newPost;

    } catch (error) {
        throw new Error(error);
    }

}