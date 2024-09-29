import { useEffect, useRef, useState } from 'react';
import Emoji from '../assets/icons/face-smile-regular.svg?react';
import Send from '../assets/icons/paper-plane-solid.svg?react';
import Atach from '../assets/icons/paperclip-solid.svg?react';
import More from '../assets/icons/ellipsis-vertical-solid.svg?react';
import Mic from '../assets/icons/microphone-solid.svg?react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { send } from 'vite';

export interface InputContainerProps {
  sendMessage: (message: string) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleMessages = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleInput = () => {
    const element = ref.current;
    if (element) {
      element.style.height = '5px';
      element.style.height = element.scrollHeight + 'px';
    }
  };

  const {
    hasRecognitionSupport,
    isListening,
    transcript,
    startListening,
    stopListening,
  } = useSpeechRecognition('ro-RO');

  const handleSpeech = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    setMessage(transcript);
    handleInput();
  }, [transcript]);

  const micClassName = (className: string) =>
    className + (isListening ? ' ' + className + '--listening' : '');

  const handleSendMessage = (message: string) => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className="input-container">
      <div className="input-container__more">
        <button className="input-container__button">
          <More className="input-container__icon" />
        </button>
        <button className="input-container__button">
          <Atach className="input-container__icon" />
        </button>
      </div>
      <textarea
        className="input-container__input"
        name="message-input"
        id="message-input"
        maxLength={1000}
        placeholder="Scrie-ți aici"
        onChange={handleMessages}
        onInput={handleInput}
        rows={1}
        ref={ref}
        value={message}
      />
      <div className="input-container__more">
        <button className="input-container__button">
          <Emoji className="input-container__icon" />
        </button>
        {hasRecognitionSupport && (
          <button
            className={micClassName('input-container__button')}
            onClick={handleSpeech}
          >
            <Mic className="input-container__icon" />
          </button>
        )}

        <button
          className="input-container__button input-container__button--send"
          disabled={message.length === 0 || isListening}
          onClick={() => handleSendMessage(message)}
        >
          <Send className="input-container__icon input-container__icon--white" />
        </button>
      </div>
    </div>
  );
};

export default InputContainer;
