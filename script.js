async function auditSite() {

    const url =
        document.getElementById("urlInput").value.trim();

    const results =
        document.getElementById("results");

    if (!url) {
        alert("Please enter a URL");
        return;
    }

    results.classList.remove("hidden");

    results.innerHTML = `
    <div class="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
        Running audit...
    </div>
    `;

    try {

        const response =
            await fetch(
                `/api/audit?url=${encodeURIComponent(url)}`
            );

        const data =
            await response.json();

        const scoreColor =
            data.score >= 75
                ? "text-green-400"
                : data.score >= 50
                ? "text-yellow-400"
                : "text-red-400";

        results.innerHTML = `
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">
                    Audit Report
                </h2>

                <span class="${scoreColor} text-3xl font-bold">
                    ${data.score}/100
                </span>
            </div>

            <div class="space-y-3">

                <div class="flex justify-between">
                    <span>🔒 HTTPS Security</span>
                    <span>
                        ${data.httpsSecure ? "✅ Passed" : "❌ Failed"}
                    </span>
                </div>

                <div class="flex justify-between">
                    <span>📱 Mobile Friendly</span>
                    <span>
                        ${data.mobileFriendly ? "✅ Passed" : "❌ Failed"}
                    </span>
                </div>

                <div class="flex justify-between">
                    <span>🏷️ Title Tag</span>
                    <span>
                        ${data.titleFound ? "✅ Found" : "❌ Missing"}
                    </span>
                </div>

                <div class="flex justify-between">
                    <span>📝 Meta Description</span>
                    <span>
                        ${data.metaDescriptionFound ? "✅ Found" : "❌ Missing"}
                    </span>
                </div>

                <div class="flex justify-between">
                    <span>⚡ Load Time</span>
                    <span>
                        ${data.loadTime}s
                    </span>
                </div>

            </div>

        </div>
        `;

    } catch (error) {

        results.innerHTML = `
        <div class="bg-red-900 p-5 rounded-xl">
            Audit Failed. Please verify the URL.
        </div>
        `;
    }
}
