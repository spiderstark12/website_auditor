async function auditSite() {

    const url = document.getElementById("urlInput").value.trim();
    const results = document.getElementById("results");

    if (!url) {
        alert("Please enter a website URL");
        return;
    }

    results.classList.remove("hidden");

    let score = 0;

    const httpsSecure = url.startsWith("https://");
    if (httpsSecure) score += 20;

    const hasDomain = url.includes(".");
    if (hasDomain) score += 20;

    const hasWWW = url.includes("www.");
    if (hasWWW) score += 20;

    const reasonableLength = url.length > 10;
    if (reasonableLength) score += 20;

    const modernDomain =
        url.endsWith(".com") ||
        url.endsWith(".org") ||
        url.endsWith(".net") ||
        url.endsWith(".in");

    if (modernDomain) score += 20;

    let verdict = "";

    if (score >= 80) {
        verdict = "Excellent Website Foundation";
    } else if (score >= 60) {
        verdict = "Good Website Foundation";
    } else if (score >= 40) {
        verdict = "Needs Improvement";
    } else {
        verdict = "Poor Website Foundation";
    }

    const scoreColor =
        score >= 80
            ? "text-green-400"
            : score >= 60
            ? "text-yellow-400"
            : "text-red-400";

    results.innerHTML = `
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">
                Audit Report
            </h2>

            <span class="${scoreColor} text-3xl font-bold">
                ${score}/100
            </span>
        </div>

        <div class="space-y-3">

            <div class="flex justify-between">
                <span>🔒 HTTPS Security</span>
                <span>${httpsSecure ? "✅ Passed" : "❌ Failed"}</span>
            </div>

            <div class="flex justify-between">
                <span>🌐 Valid Domain</span>
                <span>${hasDomain ? "✅ Passed" : "❌ Failed"}</span>
            </div>

            <div class="flex justify-between">
                <span>📡 WWW Configuration</span>
                <span>${hasWWW ? "✅ Passed" : "❌ Missing"}</span>
            </div>

            <div class="flex justify-between">
                <span>📏 URL Structure</span>
                <span>${reasonableLength ? "✅ Good" : "❌ Weak"}</span>
            </div>

            <div class="flex justify-between">
                <span>🚀 Modern Domain</span>
                <span>${modernDomain ? "✅ Passed" : "❌ Unknown"}</span>
            </div>

        </div>

        <div class="mt-6 p-4 rounded-xl bg-black border border-zinc-800">
            <p class="font-semibold ${scoreColor}">
                ${verdict}
            </p>
        </div>

    </div>
    `;
}
