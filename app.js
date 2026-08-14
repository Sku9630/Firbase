const firebaseConfig = {
  apiKey: "AIzaSyDXVb2DRV1Ka5hqOTwh6awOaXfl4yvAwfY",
  authDomain: "aksara-jawapro.firebaseapp.com",
  databaseURL: "https://aksara-jawapro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aksara-jawapro",
  storageBucket: "aksara-jawapro.firebasestorage.app",
  messagingSenderId: "25810250492",
  appId: "1:25810250492:web:8428b2430e8ba3b2554579"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Muat data saat halaman dibuka
db.ref("AppConfig").once("value", snapshot => {
    const data = snapshot.val() || {};
    
    // Data Maintenance & Versi
    document.getElementById('cfgMaintenance').checked = (data.maintenance === "true");
    document.getElementById('cfgMaintenanceMsg').value = data.maintenance_msg || "";
    document.getElementById('cfgVersionCode').value = data.version_code || 1;
    document.getElementById('cfgVersion').value = data.version || "1.0.0";
    document.getElementById('cfgApkUrl').value = data.apk_url || "";
    
    // Data About, Contact, Privacy (Sesuai dengan key yang dipanggil di Sketchware)
    document.getElementById('cfgAbout').value = data.desc_about || "";
    document.getElementById('cfgContact').value = data.address || "";
    document.getElementById('cfgPrivacy').value = data.url_privacy || "";
});

// Simpan data
document.getElementById('btnSave').addEventListener('click', () => {
    const updatedData = {
        maintenance: document.getElementById('cfgMaintenance').checked ? "true" : "false",
        maintenance_msg: document.getElementById('cfgMaintenanceMsg').value,
        version_code: parseInt(document.getElementById('cfgVersionCode').value) || 1,
        version: document.getElementById('cfgVersion').value,
        apk_url: document.getElementById('cfgApkUrl').value,
        
        // Menggunakan key yang sesuai dengan kode Sketchware Anda
        desc_about: document.getElementById('cfgAbout').value,
        address: document.getElementById('cfgContact').value,
        url_privacy: document.getElementById('cfgPrivacy').value
    };

    db.ref("AppConfig").update(updatedData)
        .then(() => alert("Data berhasil disimpan ke Firebase!"))
        .catch(err => alert("Gagal menyimpan: " + err.message));
});
      

// ... di dalam fungsi Muat data saat halaman dibuka
document.getElementById('cfgAbout').value = data.desc_about || "";
document.getElementById('cfgContact').value = data.address || "";
document.getElementById('cfgPrivacy').value = data.url_privacy || "";
document.getElementById('cfgDeveloper').value = data.developer || ""; // Tambahkan ini

// ... di dalam fungsi Simpan data
const updatedData = {
    // ... data lainnya
    desc_about: document.getElementById('cfgAbout').value,
    address: document.getElementById('cfgContact').value,
    url_privacy: document.getElementById('cfgPrivacy').value,
    developer: document.getElementById('cfgDeveloper').value // Tambahkan ini
};
  
