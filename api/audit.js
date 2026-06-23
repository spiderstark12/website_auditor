const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
    try {

        const { url } = req.query;

        if (!url) {
            return res.status(400).json({
                error: "URL is required"
            });
        }

        const startTime = Date.now();

        const response = await axios.get(url, {
            timeout: 10000,
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const loadTime =
            ((Date.now() - startTime) / 1000).toFixed(2);

        const html = response.data;

        const $ = cheerio.load(html);

        const title =
            $("title").text().trim();

        const metaDescription =
            $('meta[name="description"]').attr("content");

        const viewport =
            $('meta[name="viewport"]').attr("content");

        let score = 0;

        const httpsSecure =
            url.startsWith("https://");

        if (httpsSecure) score += 25;
        if (title) score += 25;
        if (metaDescription) score += 25;
        if (viewport) score += 25;

        res.status(200).json({
            httpsSecure,
            titleFound: !!title,
            metaDescriptionFound: !!metaDescription,
            mobileFriendly: !!viewport,
            loadTime,
            score
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};
