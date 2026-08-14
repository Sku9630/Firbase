// Konfigurasi Firebase Aksara Jawa Pro
const firebaseConfig = {
  apiKey: "AIzaSyDXVb2DRV1Ka5hqOTwh6awOaXfl4yvAwfY",
  authDomain: "aksara-jawapro.firebaseapp.com",
  databaseURL: "https://aksara-jawapro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aksara-jawapro",
  storageBucket: "aksara-jawapro.firebasestorage.app",
  messagingSenderId: "25810250492",
  appId: "1:25810250492:web:8428b2430e8ba3b2554579",
  measurementId: "G-P8RNYJSRV6"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// UI Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const btnSave = document.getElementById('btnSave');
const loginError = document.getElementById('loginError');

// 1. CEK STATUS AUTH (LOGIN / LOGOUT)
auth.onAuthStateChanged(user => {
    if (user) {
        // Jika sudah login, tampilkan dashboard
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        loadDataFromFirebase();
    } else {
        // Jika belum login, tampilkan form login
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }
});

// 2. PROSES LOGIN
btnLogin.addEventListener('click', () => {
    const email = loginEmail.value;
    const password = loginPassword.value;
    
    loginError.innerText = "";
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Login sukses!");
        })
        .catch(error => {
            loginError.innerText = "Error: " + error.message;
        });
});

// 3. PROSES LOGOUT
btnLogout.addEventListener('click', () => {
    auth.signOut();
});

// 4. LOAD DATA DARI FIREBASE KE FORM
function loadDataFromFirebase() {
    db.ref("AppConfig").once("value", snapshot => {
        const data = snapshot.val() || {};
        
        document.getElementById('cfgMaintenance').checked = (data.maintenance === "true" || data.maintenance === true);
        document.getElementById('cfgMaintenanceMsg').value = data.maintenance_msg || "";
        document.getElementById('cfgVersionCode').value = data.version_code || 1;
        document.getElementById('cfgVersion').value = data.version || "1.0.0";
        document.getElementById('cfgApkUrl').value = data.apk_url || "";
        document.getElementById('cfgMsgConvert').value = data.msg_convert || "";
        document.getElementById('cfgColorAccent').value = data.color_accent || "#6D4528";
    });
}

// 5. SIMPAN DATA DARI FORM KE FIREBASE
btnSave.addEventListener('click', () => {
    const isMaintenance = document.getElementById('cfgMaintenance').checked ? "true" : "false";
    const maintenanceMsg = document.getElementById('cfgMaintenanceMsg').value;
    const versionCode = parseInt(document.getElementById('cfgVersionCode').value) || 1;
    const version = document.getElementById('cfgVersion').value;
    const apkUrl = document.getElementById('cfgApkUrl').value;
    const msgConvert = document.getElementById('cfgMsgConvert').value;
    const colorAccent = document.getElementById('cfgColorAccent').value;

    const updatedData = {
        maintenance: isMaintenance,
        maintenance_msg: maintenanceMsg,
        version_code: versionCode,
        version: version,
        apk_url: apkUrl,
        msg_convert: msgConvert,
        color_accent: colorAccent
    };

    db.ref("AppConfig").update(updatedData)
        .then(() => {
            alert("Data berhasil diperbarui di Firebase!");
        })
        .catch(err => {
            alert("Gagal menyimpan data: " + err.message);
        });
});
  
