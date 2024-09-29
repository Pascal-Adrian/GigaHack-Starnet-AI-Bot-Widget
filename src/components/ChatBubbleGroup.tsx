import ChatBubble, { ChatBubbleProps } from './ChatBubble';

export interface ChatBubbleGroupProps {
  messages: ChatBubbleProps[];
  isReceived?: boolean;
  senderName?: string;
  senderImage?: string;
}

const ChatBubbleGroup: React.FC<ChatBubbleGroupProps> = ({
  messages,
  isReceived,
  senderName,
  senderImage,
}) => {
  const className = (className: string) =>
    className +
    (isReceived ? ' ' + className + '--received' : ' ' + className + '--sent');

  return (
    <div className="chat-bubble-group">
      <div className="chat-bubble-group__wrapper">
        {isReceived && senderImage && (
          <div
            role="image"
            style={{ backgroundImage: `url(${senderImage})` }}
            className="chat-bubble-group__avatar"
          />
        )}

        <div className={className('chat-bubble-group__bubbles')}>
          {isReceived && senderName && (
            <p className="chat-bubble-group__username">{senderName}</p>
          )}
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.message}
              time={message.time}
              isSent={message.isSent}
              isRead={message.isRead}
              isReceived={isReceived}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBubbleGroup;
