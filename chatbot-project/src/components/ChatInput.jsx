import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";
export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    function saveInputText(event) {
        setInputText(event.target.value);
    }
    async function sendMessage() {
        if (inputText.trim() === "" || isLoading) return;
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                id: crypto.randomUUID(),
            },
        ];

        setChatMessages(newChatMessages);

        setInputText("");
        setIsLoading(true);

        setChatMessages([
            ...newChatMessages,
            {
                message: "Loading...",
                sender: "robot",
                id: "LoadingId",
            },
        ]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: "robot",
                id: crypto.randomUUID(),
            },
        ]);
        setIsLoading(false);
    }
    return (
        <div className="chat-input-container">
            <input
                placeholder="How can i Help you?"
                size="30"
                onChange={saveInputText}
                onKeyDown={HandleEnter}
                value={inputText}
                className="chat-input"
            />
            <button
                onClick={sendMessage}
                disabled={isLoading}
                className="send-button"
            >
                Send
            </button>
        </div>
    );
    function HandleEnter(e) {
        if (e.key === "Enter") {
            sendMessage();
        } else if (e.key === "Escape") {
            setInputText("");
        }
    }
}
