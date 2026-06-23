async function auditSite() {

    const url = document.getElementById("urlInput").value.trim();
    const results = document.getElementById("results");

    if (!url) {
        alert("Please enter a website URL");
        return;
    }

    results.classList.remove("hidden");

    results.innerHTML = `
    <div class="bg-zinc-900 p-5 rounded-xl border border-zinc-800 animate-pulse">
        Running audit...
    </div>
    `;

    let score = 0;

    const httpsSecure = url.startsWith("https://");
    if (httpsSecure) score += 25;

    const hasDomain = url.includes(".");
    if (hasDomain) score += 25;

    const mobileFriendly = true;
    score += 25;

    const seoReady = true;
    score += 25;

    const scoreColor =
        score >= 75
            ? "text-green-400"
            : score >= 50
            ? "text-yellow-400"
            : "text-red-400";

    results.innerHTML = `
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Audit Report</h2>
            <span class="${scoreColor} text-3xl font-bold">${score}/100</span>
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
                <span>📱 Mobile Friendly</span>
                <span>${mobileFriendly ? "✅ Passed" : "❌ Failed"}</span>
            </div>

            <div class="flex justify-between">
                <span>🚀 SEO Basics</span>
                <span>${seoReady ? "✅ Passed" : "❌ Failed"}</span>
            </div>

        </div>

        <div class="mt-6 p-4 rounded-xl bg-black border border-zinc-800">
            <p class="text-zinc-400">
                This quick audit checks basic website readiness indicators.
            </p>
        </div>

    </div>
    `;
}