const GEMINI_API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY);
const PROJECT_ID = String(import.meta.env.VITE_PROJECT_ID);
const API_ENDPOINT = String(import.meta.env.VITE_API_ENDPOINT);
const DATABASE_ID = String(import.meta.env.VITE_DATABASE_ID);
const COLLECTION_ID = String(import.meta.env.VITE_COLLECTION_ID);

export {
    GEMINI_API_KEY,
    PROJECT_ID,
    API_ENDPOINT,
    DATABASE_ID,
    COLLECTION_ID
}