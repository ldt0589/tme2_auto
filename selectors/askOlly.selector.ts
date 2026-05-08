export const AskOllySelectors = {
  askInput:  'div[contenteditable="true"][aria-describedby="placeholder-evf-ai-mention-editor"]',
  sendButton: '#ai-chat-send-button',
  newChatButton: {
    role: 'button',
    name: 'New Chat',
  },
  okButton: {
    role: 'button',
    name: 'OK',
  },
  messageContainer: '#evf-ai-chat-wrapper main',
  likeButton: 'button[data-testid="btn-like-tooltip"]',
} as const;