// وظائف مساعدة لجميع الصفحات

// الحصول على المستخدم الحالي
function getCurrentUser() {
    return localStorage.getItem("loggedInUser");
}

// التحقق من تسجيل الدخول
function checkLogin() {
    let user = getCurrentUser();
    if (!user) {
        let email = prompt("تسجيل الدخول مطلوب\nأدخل بريدك الإلكتروني:");
        let password = prompt("أدخل كلمة السر:");
        if (email && password) {
            localStorage.setItem("loggedInUser", email);
            return email;
        }
        return null;
    }
    return user;
}

// حفظ بيانات فيديو للاعب
function saveVideoAnalysis(user, videoData) {
    let key = `videos_${user}`;
    let history = JSON.parse(localStorage.getItem(key)) || [];
    history.push(videoData);
    if (history.length > 20) history.shift();
    localStorage.setItem(key, JSON.stringify(history));
}

// الحصول على فيديوهات اللاعب
function getUserVideos(user) {
    let key = `videos_${user}`;
    return JSON.parse(localStorage.getItem(key)) || [];
}