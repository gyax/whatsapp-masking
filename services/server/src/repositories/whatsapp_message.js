
exports.AddReceiveMessage = async ({whatsappId, from, to, hashMedia, type, timestamp, body, mediaKey, isForwarded, isStatus, isStarred, broadcast, fromMe, hasQuotedMsg, vCards, mentionedIds, links}, db) => {
    const WhatsappMessageReceiveModel = db.models.whatsapp_message_receives;
    return await WhatsappMessageReceiveModel.create({
        whatsappId,
        from,
        to,
        hashMedia,
        type,
        timestamp,
        body,
        mediaKey,
        isForwarded,
        isStatus,
        isStarred,
        broadcast,
        fromMe,
        hasQuotedMsg,
        vCards,
        mentionedIds,
        links
    })
}