import ChatWidget from './components/ChatWidget';
import './styles/modern-normalize.css';
import './styles/reset.css';
import './styles/styles.scss';

function App() {
  return (
    <main>
      <img
        src="./starnet-1.png"
        alt=""
        style={{ height: '100%', width: '100%' }}
      />
      <ChatWidget apiUrl="https://496e-195-22-251-5.ngrok-free.app" />
    </main>
  );
}

export default App;
