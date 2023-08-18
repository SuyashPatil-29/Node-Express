const shortid = require("shortid");
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req,res){

    const body = req.body

    if(!body.url){
        res.end("No url found")
    }

    const shortID = shortid()
    await URL.create({
        shortId : shortID,
        redirectUrl : body.url,
        visitHistory : []
    })

    res.json({generatedId : shortID})
}

module.exports = {handleGenerateNewShortUrl}