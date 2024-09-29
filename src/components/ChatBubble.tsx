import Sent from '../assets/icons/check-solid.svg?react';
import Read from '../assets/icons/check-double-solid.svg?react';
import Respond from '../assets/icons/share-solid.svg?react';
import { useState } from 'react';
import { marked } from 'marked';

export interface ChatBubbleProps {
  message: string;
  time: string;
  isSent?: boolean;
  isRead?: boolean;
  isReceived?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  time,
  isSent = false,
  isRead = false,
  isReceived = false,
}) => {
  const [showRespond, setShowRespond] = useState<boolean>(false);

  const className = (className: string) =>
    className +
    ' ' +
    (isReceived ? className + '--received' : className + '--sent');

  const respondClassName = (className: string) =>
    showRespond ? className + ' ' + className + '--visible' : className;

  const icon = () => {
    if (!isReceived && isSent && isRead) {
      return <Read />;
    } else if (!isReceived && isSent) {
      return <Sent />;
    }

    return null;
  };

  const handleShowRespond = () => {
    if (showRespond) {
      setShowRespond(false);
    } else {
      setShowRespond(true);
    }
  };

  return (
    <div
      className={className('chat-bubble')}
      onMouseEnter={handleShowRespond}
      onMouseLeave={handleShowRespond}
    >
      <div className={className('chat-bubble__bubble')}>
        <span
          className={className('chat-bubble__text')}
          dangerouslySetInnerHTML={{ __html: marked(message) }}
        />

        <span className={className('chat-bubble__time')}>
          {time}
          {icon() && <div className="chat-bubble__icon">{icon()}</div>}
        </span>
      </div>
      <button className={respondClassName('chat-bubble__respond')}>
        <Respond className="chat-bubble__respond-icon" />
      </button>
    </div>
  );
};

export default ChatBubble;
