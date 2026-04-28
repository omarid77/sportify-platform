// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC72gQknjhHonSKAtzGcSg1tJE1MPilFKc",
    authDomain: "scout-zone.firebaseapp.com",
    projectId: "scout-zone",
    storageBucket: "scout-zone.firebasestorage.app",
    messagingSenderId: "412537736261",
    appId: "1:412537736261:web:adedd51350fbdd8fa6672c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Helper function to get current user
function getCurrentUser() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                resolve(user);
            } else {
                reject(null);
            }
        });
    });
}

// Save performance data
async function savePerformance(userId, data) {
    await db.collection('users').doc(userId).collection('performances').add({
        ...data,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Get user's performances
async function getPerformances(userId, limit = 10) {
    const snapshot = await db.collection('users')
        .doc(userId)
        .collection('performances')
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Save video analysis
async function saveVideoAnalysis(userId, videoData) {
    await db.collection('users').doc(userId).collection('videoAnalyses').add({
        ...videoData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}