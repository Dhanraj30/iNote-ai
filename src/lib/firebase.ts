// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "inote-ai.firebaseapp.com",
  projectId: "inote-ai",
  storageBucket: "inote-ai.firebasestorage.app",
  messagingSenderId: "674441568221",
  appId: "1:674441568221:web:8a9ecb8685257fc0cc6034",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param image_url - The URL of the image to upload.
 * @param name - The name of the file (used to generate a unique file name).
 * @returns The Firebase download URL or `null` if the upload fails.
 */
export async function uploadFileToFirebase(
  image_url: string,
  name: string
): Promise<string | null> {
  try {
    // Fetch the image from the URL
    const response = await fetch(image_url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert the image to a buffer
    const buffer = await response.arrayBuffer();

    // Generate a unique file name
    const file_name = name.replace(/\s+/g, "") + Date.now() + ".jpeg"; // Fixed Date.now()

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, file_name);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });

    // Get the download URL
    const firebase_url = await getDownloadURL(storageRef);
    return firebase_url;
  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    return null; // Return null if the upload fails
  }
}