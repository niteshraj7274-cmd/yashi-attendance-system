const fs = require('fs');
let code = fs.readFileSync('/app/applet/android/app/src/main/AndroidManifest.xml', 'utf8');

const perms = `    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />`;

code = code.replace("    <!-- Permissions -->\n    <uses-permission android:name=\"android.permission.INTERNET\" />", perms);
fs.writeFileSync('/app/applet/android/app/src/main/AndroidManifest.xml', code);
