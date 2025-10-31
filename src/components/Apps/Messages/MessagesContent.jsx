import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addAskedQuestion,
  resetAskedQuestions,
} from "../../../store/messagesSlice";
import {
  faqData,
  initialMessage,
  initialQuestions,
  contacts,
} from "./messagesConstants";
import "./MessagesContent.css";

const MessagesContent = () => {
  const dispatch = useAppDispatch();
  const askedQuestions = useAppSelector(
    (state) => state.messages.askedQuestions
  );
  const askedQuestionsSet = new Set(askedQuestions);
  const windows = useAppSelector((state) => state.windowManager.windows);
  const messagesWindow = windows.find((w) => w.windowType === "messages");

  const [messages, setMessages] = useState([
    { type: "received", text: initialMessage },
  ]);
  const [availableQuestions, setAvailableQuestions] =
    useState(initialQuestions);
  const [showMoreFAQs, setShowMoreFAQs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const wasWindowOpenRef = useRef(false);

  // Reset FAQs when window is closed or loses focus
  useEffect(() => {
    const isWindowOpen =
      messagesWindow && !messagesWindow.closing && !messagesWindow.minimized;

    // If window was open but is now closed/minimized
    if (
      wasWindowOpenRef.current &&
      (!isWindowOpen || messagesWindow?.minimized)
    ) {
      dispatch(resetAskedQuestions());
      setMessages([{ type: "received", text: initialMessage }]);
      setAvailableQuestions(initialQuestions);
      setShowMoreFAQs(false);
    }

    wasWindowOpenRef.current = isWindowOpen;
  }, [messagesWindow, dispatch]);

  // Auto-refill initial FAQs to maintain 5 visible (only when not expanded)
  useEffect(() => {
    if (showMoreFAQs) return; // Don't auto-refill if user has expanded FAQs

    // Count how many unasked questions we currently have in availableQuestions
    const unaskedCount = availableQuestions.filter(
      (q) => !askedQuestionsSet.has(q)
    ).length;

    // If we have fewer than 5 unasked questions, refill to maintain 5
    if (unaskedCount < 5) {
      // Get all questions that haven't been asked and aren't already available
      const allUnaskedQuestions = faqData
        .map((faq) => faq.question)
        .filter(
          (q) => !askedQuestionsSet.has(q) && !availableQuestions.includes(q)
        );

      const needed = 5 - unaskedCount;
      const toAdd = allUnaskedQuestions.slice(0, needed);

      if (toAdd.length > 0) {
        // Remove asked questions and add new ones to maintain 5 total
        setAvailableQuestions((prev) => {
          const unaskedExisting = prev.filter((q) => !askedQuestionsSet.has(q));
          return [...unaskedExisting, ...toAdd].slice(0, 5);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [askedQuestions.length, showMoreFAQs]); // Only depend on length to avoid infinite loops

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Helper function to check if a sent message is the last sent message
  const isLastSentMessage = (messageIndex) => {
    const lastSentMessageIndex = messages.findLastIndex(
      (m) => m.type === "sent"
    );
    return messageIndex === lastSentMessageIndex && lastSentMessageIndex !== -1;
  };

  const handleQuestionClick = (question) => {
    // Prevent clicking the same question twice
    if (askedQuestionsSet.has(question)) {
      return;
    }

    // If FAQs are expanded, minimize back to 5
    if (showMoreFAQs) {
      setShowMoreFAQs(false);
      // Filter to show only unasked questions, then trim to 5
      setAvailableQuestions((prev) => {
        const unasked = prev.filter(
          (q) => !askedQuestionsSet.has(q) && q !== question
        );
        // Remove the clicked question and keep up to 5
        return unasked.slice(0, 5);
      });
    } else {
      // Just remove the clicked question from available
      setAvailableQuestions((prev) => prev.filter((q) => q !== question));
    }

    // Add to Redux state immediately
    dispatch(addAskedQuestion(question));

    // Show loading state
    setIsLoading(true);

    // Add the question as a sent message
    setMessages((prev) => [...prev, { type: "sent", text: question }]);

    // Find the answer
    const faq = faqData.find((f) => f.question === question);

    // Add response after 1s delay with loading animation
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "received", text: faq.answer }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleMoreFAQs = () => {
    setShowMoreFAQs(true);
    // Add remaining questions that haven't been asked and aren't already in availableQuestions
    const remainingQuestions = faqData
      .map((faq) => faq.question)
      .filter(
        (q) =>
          !initialQuestions.includes(q) &&
          !askedQuestionsSet.has(q) &&
          !availableQuestions.includes(q)
      );
    setAvailableQuestions((prev) => [...prev, ...remainingQuestions]);
  };

  const handleMinimizeFAQs = () => {
    setShowMoreFAQs(false);
    // Keep only initial questions that haven't been asked, but maintain 5 visible
    const unaskedInitialQuestions = initialQuestions.filter(
      (q) => !askedQuestionsSet.has(q)
    );

    // If we have fewer than 5, fill with new unasked questions
    if (unaskedInitialQuestions.length < 5) {
      const allUnaskedQuestions = faqData
        .map((faq) => faq.question)
        .filter(
          (q) =>
            !askedQuestionsSet.has(q) &&
            !initialQuestions.includes(q) &&
            !unaskedInitialQuestions.includes(q)
        );

      const needed = 5 - unaskedInitialQuestions.length;
      const toAdd = allUnaskedQuestions.slice(0, needed);
      setAvailableQuestions([...unaskedInitialQuestions, ...toAdd]);
    } else {
      setAvailableQuestions(unaskedInitialQuestions);
    }
  };

  return (
    <div className="messages-content">
      {/* Left Sidebar - Contacts */}
      <div className="messages-sidebar">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`messages-contact ${contact.id === 1 ? "active" : ""}`}
          >
            {contact.isAvatar ? (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="messages-contact-avatar-img"
              />
            ) : (
              <div className="messages-contact-avatar">{contact.avatar}</div>
            )}
            <div className="messages-contact-info">
              <div className="messages-contact-name">{contact.name}</div>
              <div className="messages-contact-preview">{contact.preview}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="messages-chat">
        {messages.map((message, index) => (
          <div key={index} className={`message-wrapper ${message.type}`}>
            {message.type === "received" && (
              <div className="message-bubble received">{message.text}</div>
            )}
            {message.type === "sent" && (
              <div className="message-sent-container">
                <div className="message-bubble sent">{message.text}</div>
                {isLastSentMessage(index) && (
                  <div className="message-status">delivered</div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="message-wrapper received">
            <div className="message-bubble received typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        {/* Available question prompts */}
        {(() => {
          const unaskedQuestions = availableQuestions.filter(
            (q) => !askedQuestionsSet.has(q)
          );
          return (
            !isLoading &&
            unaskedQuestions.length > 0 && (
              <>
                <div className="message-wrapper sent">
                  <div className="message-prompts">
                    {unaskedQuestions.map((question) => (
                      <button
                        key={question}
                        className="message-prompt"
                        onClick={() => handleQuestionClick(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* More FAQs button / Minimize FAQs button */}
                <div className="more-faqs-container">
                  {showMoreFAQs ? (
                    <button
                      className="more-faqs-button"
                      onClick={handleMinimizeFAQs}
                    >
                      Show Less FAQs
                    </button>
                  ) : (
                    <button
                      className="more-faqs-button"
                      onClick={handleMoreFAQs}
                    >
                      More FAQs...
                    </button>
                  )}
                </div>
              </>
            )
          );
        })()}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesContent;
