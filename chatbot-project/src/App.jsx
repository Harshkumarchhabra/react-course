import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import "./App.css";
import { ChatMessages } from "./components/ChatMessages";

function App() {
    const [chatMessages, setChatMessages] = useState([]);
    return (
        <div className="app-container">
            <ChatMessages chatMessages={chatMessages} />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
        </div>
    );
}

export default App;
