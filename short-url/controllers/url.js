const shortid = require("shortid");
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req,res){
    const shortID = shortid()
    
    const body = req.body

    if(!body.url) return res.status(400).json({msg : "Url is required"})

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
        createdBy : req.user._id
    })

    return res.render("home", {id : shortID })
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})

    res.json({totalClicks : result.visitHistory.length, analytics : result.visitHistory})
}

async function handleClickOnRoute(req,res){
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push : {
        visitHistory : {
            timestamp : Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
}

module.exports = {handleGenerateNewShortUrl, handleGetAnalytics,handleClickOnRoute}