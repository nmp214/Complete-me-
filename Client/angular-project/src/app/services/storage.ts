// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDr841ZE_Bnhh79sCY3e1wNQk0PbwQPGs0",
    authDomain: "complete-me-216ba.firebaseapp.com",
    // databaseURL: "https://complete-me-216ba-default-rtdb.firebaseio.com",
    projectId: "complete-me-216ba",
    storageBucket: "complete-me-216ba.appspot.com",
    messagingSenderId: "847299382079",
    appId: "1:847299382079:web:a508f51bb6317d740a218a",
    measurementId: "G-HE681YT5FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = () => getAnalytics(app);

const storage = getStorage();

export const upload = async (file: File) => {
    console.log('file in upload: ', file);
    const storageRef = ref(storage, `shapes/${file.name}`);
    const metadata = {
        contentType: 'mp3',
    };
    console.log(storageRef);
    await uploadBytes(storageRef, file, metadata);
    console.log('upload complete');
    return download(file.name).then((response) => {
        console.log(response);
        return response;
    });
}

export const download = async (name: string): Promise<string> => {
    const URL: any = await getDownloadURL(ref(storage, `shapes/${name}`))
        .then((url) => {
            return url;
        })
        .catch((error) => {
            console.log(error);
        });
    return URL;
}