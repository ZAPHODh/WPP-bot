const UnreadedMessages = [];

const handleUnreadMessages = (unreadMessages) => {
	UnreadedMessages.push(...UnreadedMessages, unreadMessages);
};

module.exports = { handleUnreadMessages };
