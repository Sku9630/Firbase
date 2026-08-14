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
const db = firebase.database();

const btnSave = document.getElementById('btnSave');

// 1. LANGSUNG MUAT DATA DARI FIREBASE SAAT HALAMAN DIBUKA
loadDataFromFirebase();

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

// 2. SIMPAN DATA KE FIREBASE SAAT TOMBOL DIKLIK
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
                                 
