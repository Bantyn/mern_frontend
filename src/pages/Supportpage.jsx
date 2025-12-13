"use client";

import { useEffect, useRef, useCallback, useState, useTransition } from "react";
import clsx from "clsx";
import {
  ImageIcon,
  Figma,
  MonitorIcon,
  Paperclip,
  SendIcon,
  XIcon,
  LoaderIcon,
  Sparkles,
  Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function formatMessage(text) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // Responsive paragraph text
        p: ({ node, ...props }) => (
          <p
            style={{ margin: "0.75rem 0" }}
            className=" dark:text-white text-sm sm:text-base md:text-lg leading-relaxed w-full"
            {...props}
          />
        ),

        // Inline & Block Code (responsive)
        code: ({ node, inline, children, ...props }) => {
          return inline ? (
            // Inline code
            <code
              style={{
                background: "#2d2d2d",
                padding: "2px 5px",
                borderRadius: "4px",
                fontSize: "0.85rem",
              }}
              className="text-gray-100 "
              {...props}
            >
              {children}
            </code>
          ) : (
            // Block code
            <pre
              style={{
                // background: "#111",
                padding: "14px",
                borderRadius: "10px",
                overflowX: "auto",
              }}
              className="my-3 w-[100%] word-break bg-black/70 dark:bg-black/30 backdrop-blur-2xl shadow-2xl border border-gray-200/10"
            >
              <code
                {...props}
                className="text-gray-200 text-xs sm:text-sm md:text-base"
              >
                {children}
              </code>
            </pre>
          );
        },

        // Responsive Links
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="text-blue-400 underline text-sm sm:text-base md:w-[80%] w-[62%]"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),

        // Lists responsive
        ul: ({ node, ...props }) => (
          <ul
            className="list-disc md:w-[80%] w-[80%] pl-6 text-sm sm:text-base md:text-lg space-y-1 dark:text-gray-200"
            {...props}
          />
        ),

        ol: ({ node, ...props }) => (
          <ol
            className="list-decimal pl-6 text-sm sm:text-base md:text-lg space-y-1 dark:text-gray-200 md:w-[80%] w-[62%]"
            {...props}
          />
        ),

        // Headings responsive
        h1: ({ node, ...props }) => (
          <h1
            className="md:w-[80%] w-[62%] text-2xl sm:text-3xl font-bold dark:text-white my-3"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="md:w-[80%] w-[62%] text-xl sm:text-2xl font-semibold dark:text-white my-3"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            className="md:w-[80%] w-[62%] text-lg sm:text-xl font-semibold dark:text-white my-2"
            {...props}
          />
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function useAutoResizeTextarea({ minHeight, maxHeight }) {
  const textareaRef = useRef(null);

  const adjustHeight = useCallback(
    (reset) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = `${minHeight}px`;
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

const Textarea = React.forwardRef(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className={clsx("relative", containerClassName)}>
        <textarea
          className={clsx(
            "flex min-h-[80px] w-full rounded-md border dark:border-gray-300 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-gray-900 dark:placeholder:text-gray-400 ",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing
              ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <motion.span
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-blue-300/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default function SupportPage() {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  // const [isPending, startTransition] = useTransition();
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  // const [recentCommand, setRecentCommand] = useState(null);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  // const [inputFocused, setInputFocused] = useState(false);
  const commandPaletteRef = useRef(null);

  const commandSuggestions = [
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Clone UI",
      description: "Generate a UI from a screenshot",
      prefix: "/clone",
    },
    {
      icon: <Figma className="w-4 h-4" />,
      label: "Import Figma",
      description: "Import a design from Figma",
      prefix: "/figma",
    },
    {
      icon: <MonitorIcon className="w-4 h-4" />,
      label: "Create Page",
      description: "Generate a new web page",
      prefix: "/page",
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Improve",
      description: "Improve existing UI design",
      prefix: "/improve",
    },
  ];

  useEffect(() => {
    if (value.startsWith("/") && !value.includes(" ")) {
      setShowCommandPalette(true);
      const matchingSuggestionIndex = commandSuggestions.findIndex((cmd) =>
        cmd.prefix.startsWith(value)
      );
      setActiveSuggestion(
        matchingSuggestionIndex >= 0 ? matchingSuggestionIndex : -1
      );
    } else {
      setShowCommandPalette(false);
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (showCommandPalette) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < commandSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev > 0 ? prev - 1 : commandSuggestions.length - 1
        );
      } else if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        if (activeSuggestion >= 0) selectCommandSuggestion(activeSuggestion);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowCommandPalette(false);
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) handleSendMessage();
    }
  };

  const API_URL = `${window.location.protocol}//${window.location.hostname}:5000`;
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (!value.trim()) return;

    const userMessage = value.trim();
    setValue("");
    adjustHeight(true);

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
        timestamp: new Date().toISOString(),
        type: "text",
      },
    ]);

    setIsTyping(true);
    try {
      // const renderedApiUrl = process.env.NODE_ENV === "production";
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/genai`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      const data = await response.json();
      const botReply = data?.reply || "No response from server";

      // Add bot reply
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: typeof botReply === "string" ? botReply : botReply.text || "",
          timestamp: new Date().toISOString(),
          type: "text",
        },
      ]);
    } catch (err) {
      console.error("Error calling API:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: err.message || "Error occurred",
          timestamp: new Date().toISOString(),
          type: "text",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAttachFile = () => {
    const mockFileName = `file-${Math.floor(Math.random() * 1000)}.pdf`;
    setAttachments((prev) => [...prev, mockFileName]);
  };

  const removeAttachment = (index) =>
    setAttachments((prev) => prev.filter((_, i) => i !== index));

  const selectCommandSuggestion = (index) => {
    const selectedCommand = commandSuggestions[index];
    setValue(selectedCommand.prefix + " ");
    setShowCommandPalette(false);
    setRecentCommand(selectedCommand.label);
    setTimeout(() => setRecentCommand(null), 2000);
  };
  const chatBoxRef = useRef(null);
const messagesEndRef = useRef(null);

useEffect(() => {
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }
}, [messages]);



  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center dark:bg-black-50 dark:text-white/70 p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/50 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-700/50 rounded-full filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-pink-800/50 rounded-full filter blur-[96px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-3xl mx-auto relative ">
        {/* Top Hero Section */}
        <div className="text-center mt-30 mb-10 space-y-4">
          <h1 className="text-[2.5rem] font-bold dark:text-white tracking-tight">
            Welcome to <span className="text-blue-500">Banty Support AI</span>
          </h1>

          <p className="dark:text-white/60 text-lg max-w-2xl mx-auto">
            Get instant help with coding, UI/UX design, deployments, errors,
            backend, and more. Ask anything — I'm here 24/7.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="px-4 py-1.5 bg-black/10 border-black/10 dark:bg-white/10 backdrop-blur-xl border dark:border-white/10 text-sm rounded-full dark:text-white/70">
              🔥 Powered by AI
            </span>
            <span className="px-4 py-1.5 bg-black/10 border-black/10 dark:bg-white/10 backdrop-blur-xl border dark:border-white/10 text-sm rounded-full dark:text-white/70">
              ⚡ Instant Replies
            </span>
            <span className="px-4 py-1.5 bg-black/10 border-black/10 dark:bg-white/10 backdrop-blur-xl border dark:border-white/10 text-sm rounded-full dark:text-white/70">
              🛠 Developer Friendly
            </span>
          </div>
        </div>

        <motion.div
          className=" relative z-10 space-y-15"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center dark:text-white space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <h1 className="text-4xl  mt-20 font-medium tracking-tight pb-1">
                How can I help today?
                
              </h1>
              <motion.div
                className="h-px dark:bg-gray-700 hover:bg-gray-500 bg-black mx-auto mt-2 mb-6"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            <motion.p
              className="text-sm text-black/40 dark:text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Type a command or ask a question
            </motion.p>
          </div>

          {/* Chat Input */}
          <motion.div
            className="relative bg-white/10  dark:bg-black/10 rounded-2xl  border border-gray-800/5 dark:border-gray-200/5 shadow-md hover:scale-[1.002] dark:shadow-white/5 hover:shadow-lg transition-all duration-300 flex flex-col"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <AnimatePresence>
              {showCommandPalette && (
                <motion.div
                  ref={commandPaletteRef}
                  className="absolute left-4 right-4 bottom-full mb-2 bg-black/10 rounded-lg z-50 shadow-lg border border-gray-800 overflow-hidden"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="py-1">
                    {commandSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion.prefix}
                        className={clsx(
                          "flex items-center gap-2 px-3 py-2 text-xs transition-colors cursor-pointer",
                          activeSuggestion === index
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                        onClick={() => selectCommandSuggestion(index)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                          {suggestion.icon}
                        </div>
                        <div className="font-medium">{suggestion.label}</div>
                        <div className="text-gray-400 text-xs ml-1">
                          {suggestion.prefix}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


{/* messages */}
<div
  className="p-4 max-h-[60vh] overflow-y-scroll scroll-smooth flex flex-col gap-2"
  ref={chatBoxRef}
>
  {messages.map((msg, index) => (
    <div
      key={index}
      className={clsx(
        "max-w-[100%] md:max-w-[90%] p-3 rounded-xl flex flex-col",
        msg.sender === "user"
          ? "bg-rose-400 dark:bg-rose-400/20 mt-3 px-5 py-3 border border-rose-400/20 text-white ml-auto text-right"
          : "bg-gray-200 dark:bg-gray-100/20 mt-3 px-5 py-3 border border-gray-100/20 text-black mr-auto text-left"
      )}
    >
      <div className="break-words">
        {typeof msg.text === "string"
          ? formatMessage(msg.text)
          : msg.text}
      </div>

      <span className="text-[11px] text-gray-400 mt-1">
        {new Date(msg.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  ))}

  {/* scroll target */}
  <div ref={messagesEndRef}></div>
</div>

            <div className="p-4">
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                containerClassName="w-full"
                className="w-full px-4 py-3 font-semibold text-lg shadow-sm  resize-none dark:text-white placeholder-gray-400 backdrop-blur-xs border border-gray-500/10 dark:border-gray-500/10 focus:outline-none min-h-[70px]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  overflow: "hidden",
                }}
                showRing={false}
              />
            </div>

            {/* Attachments */}
            <AnimatePresence>
              {attachments.length > 0 && (
                <motion.div
                  className="px-4 pb-3 flex gap-2 flex-wrap"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {attachments.map((file, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-xs bg-gray-100 py-1.5 px-3 rounded-lg text-gray-700"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <span>{file}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="p-4 border-t border-gray-200/0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  onClick={handleAttachFile}
                  whileTap={{ scale: 0.94 }}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors relative group"
                >
                  <Paperclip className="w-4 h-4" />
                </motion.button>

                <motion.button
                  type="button"
                  data-command-button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCommandPalette((prev) => !prev);
                  }}
                  whileTap={{ scale: 0.94 }}
                  className={`p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors relative group ${
                    showCommandPalette ? "bg-gray-100 text-gray-900" : ""
                  }`}
                >
                  <Command className="w-4 h-4" />
                </motion.button>
              </div>

              <motion.button
                type="button"
                onClick={handleSendMessage}
                data-command-button="true"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isTyping || !value.trim()}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
    ${
      value.trim()
        ? "bg-rose-700/20 border border-rose-700 text-rose-700 shadow-lg hover:bg-rose-700/80 hover:text-white active:scale-95"
        : "bg-rose-700/50 border border-rose-700 text-rose-700 opacity-50 cursor-not-allowed"
    }`}
              >
                {isTyping ? (
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <SendIcon className="w-4 h-4" />
                )}
                <span>Send</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Help Categories */}
          <div className="mt-10 mb-12">
            <h2 className="text-xl font-semibold dark:text-white mb-4">
              Need help with?
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Frontend",
                "Backend",
                "Hosting",
                "Authentication",
                "Database",
                "UI/UX",
                "APIs",
                "Optimization",
                "Debugging",
              ].map((t, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setValue(`Can you help me with ${t.toLowerCase()}`)
                  }
                  className="px-4 py-2 rounded-full bg-black/10 dark:bg-white/10  hover:bg-black/20 dark:hover:bg-white/20 text-sm backdrop-blur-lg border border-white/10 dark:text-white/70 transition-colors hover:scale-102 active:scale-97"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          {/* Quick Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 mb-12">
            {[
              { title: "Fix My Code", cmd: "Fix this code:", emoji: "🛠" },
              {
                title: "Explain Error",
                cmd: "Explain this error:",
                emoji: "💡",
              },
              { title: "Generate UI", cmd: "Create UI for:", emoji: "🎨" },
              {
                title: "Make Backend API",
                cmd: "Create backend API for:",
                emoji: "⚙️",
              },
              {
                title: "Debug React Code",
                cmd: "Debug this React component:",
                emoji: "⚛️",
              },
              { title: "Write SQL Query", cmd: "Write SQL for:", emoji: "🗃" },
            ].map((item, i) => (
              <motion.div
                key={i}
                onClick={() => setValue(item.cmd + " ")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="p-5 cursor-pointer rounded-xl backdrop-blur-lg bg-black/10 dark:bg-white/10 border border-white/20 hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-700 dark:text-white"
              >
                <div className="text-2xl">{item.emoji}</div>
                <div className="text-lg font-semibold mt-1">{item.title}</div>
                <div className="text-black/60 dark:text-white/60 text-sm mt-1">
                  Click to use
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center ml-1">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-gray-700 rounded-full mx-0.5"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
