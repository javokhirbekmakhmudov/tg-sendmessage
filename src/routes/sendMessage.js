const { Router } = require("express")
const router = Router()
const config = require("config")
const axios = require("axios")

router.post("/", async(req, res) => {
    const { text, priority } = req.body
    const token = config.get("token")
    const groupId = config.get("groupId")

    // Validate priority
    const priorities = ["low", "medium","high"]

    const isInclude = priorities.includes(priority)

    if(!isInclude)
        return res.status(400).json({ message: "Priority is not available" })

    // Send Telegram Group or Channel
    const message = `text : ${text}\n\npriority : ${priority}`

    const sendMessage = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${groupId}&text=${message}`

    await axios.default.get(sendMessage)

    res.status(200).json({ message: "Message Sended" })
})

module.exports = router