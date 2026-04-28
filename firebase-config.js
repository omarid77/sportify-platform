// استبدل هذه البيانات بالبيانات من مشروع Firebase الخاص بك
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "sportify-pro.firebaseapp.com",
    projectId: "sportify-pro",
    storageBucket: "sportify-pro.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// وظائف مساعدة
async function saveUserData(userId, data) {
    await db.collection('users').doc(userId).set(data, { merge: true });
}

async function getUserData(userId) {
    let doc = await db.collection('users').doc(userId).get();
    return doc.exists ? doc.data() : null;
}

async function savePerformance(userId, performanceData) {
    await db.collection('users').doc(userId).collection('performances').add({
        ...performanceData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function getPerformances(userId, limit = 10) {
    let snapshot = await db.collection('users')
        .doc(userId)
        .collection('performances')
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();
    return snapshot.docs.map(doc => doc.data());
}