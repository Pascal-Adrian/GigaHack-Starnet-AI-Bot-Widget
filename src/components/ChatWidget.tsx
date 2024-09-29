import ChatBody from './ChatBody';
import { ChatBubbleGroupProps } from './ChatBubbleGroup';
import Support from '../assets/icons/headset-solid.svg?react';
import Close from '../assets/icons/xmark-solid.svg?react';
import { useState } from 'react';
import axios from 'axios';

export interface ChatWidgetProps {
  apiUrl: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ apiUrl }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatBubbleGroupProps[]>([]);

  const handleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const className = (className: string) =>
    className +
    (isChatOpen ? ' ' + className + '--open' : ' ' + className + '--close');

  const handleSendMessage = async (userMessage: string) => {
    const newMessage: ChatBubbleGroupProps = {
      messages: [
        {
          message: userMessage,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          isSent: true,
          isRead: true,
        },
      ],
      isReceived: false,
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await axios.post(
        `${apiUrl}/process`,
        {
          message: userMessage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage: ChatBubbleGroupProps = {
        messages: [
          {
            message: response.data.answer,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          },
        ],
        isReceived: true,
        senderImage: './user-placeholder.png',
        senderName: 'Starnet_Bot',
      };

      setMessages((prev) => [...prev, botMessage]);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={className('chat-widget')}>
      {isChatOpen ? (
        <button className="chat-widget__close" onClick={handleChat}>
          <Close className="chat-widget__icon" />
        </button>
      ) : (
        <button className="chat-widget__open" onClick={handleChat}>
          <Support className="chat-widget__icon" />
        </button>
      )}
      {isChatOpen && (
        <ChatBody
          messages={messages}
          senderImage="./user-placeholder.png"
          senderName="Starnet_Bot"
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default ChatWidget;
