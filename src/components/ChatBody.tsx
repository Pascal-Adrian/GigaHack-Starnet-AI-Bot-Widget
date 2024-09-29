import ChatBubbleGroup, { ChatBubbleGroupProps } from './ChatBubbleGroup';
import InputContainer from './InputContainer';

export interface ChatBodyProps {
  messages: ChatBubbleGroupProps[];
  senderImage: string;
  senderName: string;
  handleSendMessage: (message: string) => void;
}

const ChatBody: React.FC<ChatBodyProps> = ({
  messages,
  senderImage,
  senderName,
  handleSendMessage,
}) => {
  return (
    <aside className="chat-body">
      <div className="chat-body__header">
        <div
          role="image"
          style={{ backgroundImage: `url(${senderImage})` }}
          className="chat-body__avatar"
        />
        <p>{senderName}</p>
      </div>
      <div className="chat-body__messages">
        {messages.map((message, index) => (
          <ChatBubbleGroup key={index} {...message} />
        ))}
      </div>
      <InputContainer sendMessage={handleSendMessage} />
    </aside>
  );
};

export default ChatBody;
