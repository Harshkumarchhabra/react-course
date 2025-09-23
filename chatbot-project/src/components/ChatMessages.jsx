import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

function useAutoScroll(dependencies) {
    const ref = useRef(null);

    useEffect(() => {
        const containerElem = ref.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, dependencies);

    return ref;
}

export function ChatMessages({ chatMessages }) {
    const chatMessagesRef = useAutoScroll([chatMessages]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.length === 0 ? (
                <div style={{ textAlign: "center", color: "gray" }}>
                    Welcome to the chatbot project! Send a message using the
                    textbox below.
                </div>
            ) : (
                chatMessages.map((chatMessage) => (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                ))
            )}
        </div>
    );
}
