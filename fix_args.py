with open("src/components/StaffDashboardScreen.tsx", "r") as f:
    code = f.read()

code = code.replace(
    "const fetchLocationWithTimeoutAndFallback = (onSuccess, onError) => {",
    "const fetchLocationWithTimeoutAndFallback = (onSuccess: any, onError: any, options?: any) => {"
)
code = code.replace(
    "{ enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }\n        );",
    "options || { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }\n        );"
)

with open("src/components/StaffDashboardScreen.tsx", "w") as f:
    f.write(code)

