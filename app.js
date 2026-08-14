// Muat data saat halaman dibuka
db.ref("AppConfig").once("value", snapshot => {
    const data = snapshot.val() || {};
    
    document.getElementById('cfgMaintenance').checked = (data.maintenance === "true");
    document.getElementById('cfgMaintenanceMsg').value = data.maintenance_msg || "";
    document.getElementById('cfgVersionCode').value = data.version_code || 1;
    document.getElementById('cfgVersion').value = data.version || "1.0.0";
    document.getElementById('cfgApkUrl').value = data.apk_url || "";
    
    // Konten Informasi
    document.getElementById('cfgAbout').value = data.desc_about || "";
    document.getElementById('cfgContact').value = data.address || ""; // Alamat
    document.getElementById('cfgDeveloper').value = data.developer || ""; // Developer baru
    document.getElementById('cfgEmail').value = data.email || ""; // Email / Kontak
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
        
        desc_about: document.getElementById('cfgAbout').value,
        address: document.getElementById('cfgContact').value,
        developer: document.getElementById('cfgDeveloper').value, // Simpan Developer
        email: document.getElementById('cfgEmail').value, // Simpan Email/Kontak
        url_privacy: document.getElementById('cfgPrivacy').value
    };

    db.ref("AppConfig").update(updatedData)
        .then(() => alert("Data berhasil disimpan ke Firebase!"))
        .catch(err => alert("Gagal menyimpan: " + err.message));
});
