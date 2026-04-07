import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  suggestions?: string[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

// simple keyword matching — checks what the user typed and returns a preset answer
function getBotResponse(text: string): { text: string; suggestions?: string[] } {
  const msg = text.toLowerCase();

  if (msg.includes('report') || msg.includes('found something') || msg.includes('turn in') || msg.includes('submit')) {
    return {
      text: "Go to the Submit page and fill out the short form. Adding a photo makes it much easier for the owner to identify their item.",
      suggestions: ['How do I claim my item?', 'Where do I pick it up?'],
    };
  }

  if (msg.includes('claim') || msg.includes('lost') || msg.includes('missing') || msg.includes('my item')) {
    return {
      text: "Head to the Browse page to see if your item has been turned in. If you spot it, hit \"View Details\" and submit a claim. Staff will review it and notify you.",
      suggestions: ['How long does approval take?', 'Where do I pick it up?'],
    };
  }

  if (msg.includes('status') || msg.includes('approved') || msg.includes('pending') || msg.includes('check')) {
    return {
      text: "Open the Claims page to check your claim status. If you're logged in you'll also get a notification when it's approved or rejected.",
      suggestions: ['Where do I pick it up?', 'How do I log in?'],
    };
  }

  if (
    msg.includes('pick up') || msg.includes('pickup') || msg.includes('collect') ||
    msg.includes('retrieve') || msg.includes('get my') || msg.includes('office')
  ) {
    return {
      text: "Once your claim is approved, bring your student ID to the main office. Office hours are typically 8am–4pm on school days.",
      suggestions: ['How do I submit a claim?', 'How long does approval take?'],
    };
  }

  if (msg.includes('how long') || msg.includes('when will') || msg.includes('days')) {
    return {
      text: "Claims are usually reviewed within 1–2 school days. You'll get a notification as soon as there's an update.",
      suggestions: ['Where do I pick it up?', 'How do I check my status?'],
    };
  }

  if (
    msg.includes('login') || msg.includes('log in') || msg.includes('account') ||
    msg.includes('register') || msg.includes('sign up')
  ) {
    return {
      text: "You can browse items without an account. To submit a claim or report a found item you'll need to register — it only takes a minute.",
      suggestions: ['How do I report a found item?', 'How do I claim my item?'],
    };
  }

  if (
    msg.includes('available') || msg.includes('browse') || msg.includes('see items') ||
    msg.includes('what items') || msg.includes('list')
  ) {
    return {
      text: "The Browse page shows everything that's been turned in. You can filter by category (Electronics, Bags, Clothing…) and sort by date.",
      suggestions: ['How do I claim my item?', 'How do I report a found item?'],
    };
  }

  if (msg.includes('contact') || msg.includes('help') || msg.includes('support') || msg.includes('staff')) {
    return {
      text: "For anything this chat can't answer, check the Help page or visit the main office directly.",
      suggestions: ['How do I submit a claim?', 'How do I report a found item?'],
    };
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('hiya')) {
    return {
      text: "Hey! I can help you find a lost item, report something you found, or check on a claim. What do you need?",
      suggestions: ['I lost something', 'I found something', 'Check my claim'],
    };
  }

  return {
    text: "I can help with finding lost items, reporting something you found, or checking a claim. What would you like to do?",
    suggestions: ['I lost something', 'I found something', 'Check claim status'],
  };
}

export function CustomerServiceBot() {
  const { getColor, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: generateId(), text, sender: 'user' }]);
  };

  const addBotMessage = (text: string, suggestions?: string[]) => {
    setMessages(prev => [...prev, { id: generateId(), text, sender: 'bot', suggestions }]);
  };

  // auto scroll to the bottom whenever a new message comes in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // show a greeting the first time the chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "Hi! I can help you find a lost item, report something you found, or check your claim status.",
        ['I lost something', 'I found something', 'Check my claim'],
      );
    }
  }, [isOpen]);

  const handleSendMessage = (messageText?: string) => {
    const textToSend = (messageText ?? inputValue).trim();
    if (!textToSend) return;

    addUserMessage(textToSend);
    setInputValue('');
    setIsTyping(true);

    // small random delay so it doesn't feel instant
    setTimeout(() => {
      const { text, suggestions } = getBotResponse(textToSend);
      addBotMessage(text, suggestions);
      setIsTyping(false);
    }, 500 + Math.random() * 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="rounded-full p-4 shadow-2xl relative overflow-hidden cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                boxShadow: `0 0 30px ${getColor('accent1')}60`,
              }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${getColor('accent2')}40, transparent)` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 rounded-2xl shadow-2xl border-2 flex flex-col"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('accent1'),
              boxShadow: `0 0 40px ${getColor('accent1')}40`,
              height: '520px',
              maxHeight: 'calc(100vh - 100px)',
            }}
          >
            {/* Header — fixed height */}
            <div
              className="flex-shrink-0 p-4 flex items-center justify-between rounded-t-2xl"
              style={{
                background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Lost & Found Help</h3>
                  <p className="text-xs text-white/80">Ask me anything</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages — grows to fill remaining space, scrolls internally */}
            <div
              className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3"
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
              style={{
                backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
              }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{
                        width: 28, height: 28,
                        background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                      }}
                    >
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 max-w-[78%]">
                    <div
                      className={`px-3 py-2 text-sm leading-relaxed ${
                        message.sender === 'user'
                          ? 'rounded-2xl rounded-br-sm'
                          : 'rounded-2xl rounded-bl-sm'
                      }`}
                      style={{
                        backgroundColor: message.sender === 'user' ? getColor('accent1') : getColor('bgCardHover'),
                        color: message.sender === 'user' ? 'white' : getColor('textPrimary'),
                      }}
                    >
                      {message.text}
                    </div>

                    {message.suggestions && (
                      <div className="flex flex-wrap gap-1.5">
                        {message.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleSendMessage(s)}
                            className="px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer"
                            style={{
                              borderColor: getColor('accent2'),
                              color: getColor('accent2'),
                              backgroundColor: `${getColor('accent2')}12`,
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{ width: 28, height: 28, backgroundColor: getColor('accent3') }}
                    >
                      <User className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-end"
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 28, height: 28,
                      background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                    }}
                  >
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div
                    className="px-3 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center"
                    style={{ backgroundColor: getColor('bgCardHover') }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: getColor('accent1') }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area — fixed height */}
            <div
              className="flex-shrink-0 p-3 border-t rounded-b-2xl"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border'),
              }}
            >
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  className="flex-1 rounded-xl border h-9 text-sm"
                  style={{
                    borderColor: getColor('border'),
                    backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                    color: getColor('textPrimary'),
                  }}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="rounded-xl px-3 h-9 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                    color: 'white',
                    opacity: inputValue.trim() ? 1 : 0.4,
                  }}
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
