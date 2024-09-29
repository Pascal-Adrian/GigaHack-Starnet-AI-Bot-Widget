import { useEffect, useState } from 'react';

let recognition: SpeechRecognition | null = null;

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
}

export const useSpeechRecognition = (language: string) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');

  useEffect(() => {
    if (!recognition) {
      return;
    }

    // setting the language for the Speech Recognition API
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log(event);
      setTranscript(event.results[0][0].transcript);
      if (event.results[0].isFinal) {
        setIsListening(false);
        stopListening();
      }
    };
  }, []);

  const startListening = () => {
    if (!recognition) {
      return;
    }

    setTranscript('');
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (!recognition) {
      return;
    }

    setIsListening(false);
    recognition.stop();
  };

  return {
    hasRecognitionSupport: !!recognition,
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};
