import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface KnowledgeBase {
  keywords: string[];
  response: string;
  suggestions?: string[];
}

/**
 * CustomerServiceBot Component
 * Automated customer service chatbot with intelligent responses
 * Features:
 * - Keyword-based intelligent responses
 * - Common questions about lost & found
 * - Quick action suggestions
 * - Smooth animations and interactions
 */
export function CustomerServiceBot() {
  const { getColor, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomePulse, setShowWelcomePulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Knowledge base for automated responses
  const knowledgeBase: KnowledgeBase[] = [
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'start'],
      response: "Hi there! 👋 I'm your Lost & Found Assistant. I'm here to help you find your lost items or report found items. How can I assist you today?",
      suggestions: ['Find a lost item', 'Report found item', 'Check claim status', 'How it works']
    },
    {
      keywords: ['lost', 'missing', 'can\'t find', 'looking for'],
      response: "I'm sorry to hear you lost something! 😔 Here's how to find it:\n\n1. Browse our Found Items page to search\n2. Use filters by category, location, and date\n3. Set up notifications for matching items\n4. File a claim when you find your item\n\nWould you like me to guide you through searching?",
      suggestions: ['Search now', 'Set up alerts', 'View all items']
    },
    {
      keywords: ['found', 'found something', 'picked up', 'discovered'],
      response: "Great! Thank you for being honest! 🌟 To report a found item:\n\n1. Click 'Report Found Item' button\n2. Fill out the item details (category, location, date)\n3. Upload a clear photo\n4. Add a description\n5. Submit for review\n\nYour submission helps reunite items with their owners!",
      suggestions: ['Report item now', 'Photo guidelines', 'See examples']
    },
    {
      keywords: ['claim', 'retrieve', 'pick up', 'get back', 'mine'],
      response: "To claim an item you found online:\n\n1. Click on the item from the listings\n2. Verify it's yours by providing details\n3. Submit a claim request\n4. Wait for admin verification\n5. Bring valid ID to pick it up\n\nClaims are usually processed within 24 hours!",
      suggestions: ['View my claims', 'Required documents', 'Pickup locations']
    },
    {
      keywords: ['status', 'check', 'update', 'track'],
      response: "You can check your claim status in the Claims Portal! 🔍\n\nStatus options:\n• Pending - Under review\n• Approved - Ready for pickup\n• Rejected - More info needed\n• Collected - Item retrieved\n\nYou'll also receive notifications for status updates.",
      suggestions: ['Open Claims Portal', 'Enable notifications']
    },
    {
      keywords: ['how', 'work', 'process', 'steps'],
      response: "Here's how our Lost & Found system works:\n\n📋 **For Finders:**\n1. Report found items with photos\n2. Items get posted after verification\n3. Help reunite items with owners\n\n🔍 **For Seekers:**\n1. Browse or search for your item\n2. Submit a claim with proof\n3. Pick up after approval\n\nIt's that simple!",
      suggestions: ['View tutorial', 'See FAQs', 'Contact admin']
    },
    {
      keywords: ['photo', 'image', 'picture', 'upload'],
      response: "Photo Guidelines for Reporting Items:\n\n✅ Do:\n• Take clear, well-lit photos\n• Show multiple angles\n• Include distinctive features\n• Keep files under 5MB\n\n❌ Don't:\n• Include people's faces\n• Show sensitive information\n• Use blurry images\n\nGood photos help owners identify their items!",
      suggestions: ['Report item', 'See examples']
    },
    {
      keywords: ['category', 'categories', 'type', 'kinds'],
      response: "We organize items into these categories:\n\n📱 Electronics - Phones, laptops, tablets\n🎒 Bags & Accessories - Backpacks, wallets\n📚 Books & Stationery - Textbooks, notebooks\n👕 Clothing - Jackets, uniforms, shoes\n🔑 Keys & Cards - ID cards, keychains\n⚽ Sports Equipment - Balls, gear\n🎵 Musical Instruments\n🎮 Other - Everything else!\n\nThis helps you search more efficiently.",
      suggestions: ['Browse by category', 'Search items']
    },
    {
      keywords: ['location', 'where', 'place', 'building'],
      response: "Common locations where items are found:\n\n🏫 Classrooms (by building/room)\n📚 Library\n🍽️ Cafeteria\n🏃 Gym & Sports Facilities\n🚌 Parking Lot\n🎭 Auditorium\n🏢 Administration Offices\n🚻 Restrooms\n\nAlways check the specific location in item listings!",
      suggestions: ['View map', 'Browse locations']
    },
    {
      keywords: ['time', 'when', 'hours', 'schedule', 'pickup'],
      response: "Pickup Information:\n\n🕐 **Hours:**\nMonday - Friday: 8:00 AM - 5:00 PM\nWeekends: By appointment only\n\n📍 **Location:**\nMain Office - Student Services\nBuilding A, Room 101\n\n📞 **Contact:**\nCall ahead to confirm availability!\n\nBring your student ID when picking up items.",
      suggestions: ['Get directions', 'Schedule pickup']
    },
    {
      keywords: ['notification', 'alert', 'email', 'notify'],
      response: "Stay updated with our notification system! 🔔\n\nYou'll be notified about:\n• New items matching your searches\n• Claim status updates\n• Messages from admins\n• Item availability changes\n\nEnable notifications in your settings to never miss an update!",
      suggestions: ['Enable notifications', 'Manage preferences']
    },
    {
      keywords: ['proof', 'verify', 'evidence', 'identification'],
      response: "To verify item ownership, you may need:\n\n🆔 Required:\n• Valid student ID\n• Description of unique features\n• Approximate date/location lost\n\n📋 Helpful:\n• Serial numbers (electronics)\n• Photos of the item\n• Purchase receipts\n• Inscriptions or markings\n\nThis protects against false claims!",
      suggestions: ['Prepare claim', 'Security tips']
    },
    {
      keywords: ['safe', 'secure', 'privacy', 'security'],
      response: "Your security is our priority! 🔒\n\n• Items stored in secure location\n• Admin verification required\n• ID checked at pickup\n• Personal info protected\n• Photos don't show sensitive details\n\nWe follow strict privacy guidelines to protect everyone.",
      suggestions: ['Read security policy', 'Report concern']
    },
    {
      keywords: ['contact', 'help', 'support', 'admin', 'human'],
      response: "Need to talk to a real person? 👤\n\n📧 Email: lostandfound@school.edu\n📞 Phone: (555) 123-4567\n🏢 Office: Student Services, Bldg A-101\n\n⏰ Response time: Usually within 24 hours\n\nFor urgent matters, please visit the office in person!",
      suggestions: ['Send email', 'Office hours', 'Visit office']
    },
    {
      keywords: ['reward', 'compensation', 'finder', 'tip'],
      response: "About Finder's Rewards:\n\n💝 While not required, you can:\n• Thank finders directly\n• Leave positive feedback\n• Offer a finder's reward (optional)\n\n🌟 Remember:\nHonesty and integrity are the real rewards! Many students return items out of kindness.\n\nTip: A simple thank you goes a long way!",
      suggestions: ['Say thanks', 'Leave feedback']
    },
    {
      keywords: ['thanks', 'thank you', 'appreciate', 'helpful'],
      response: "You're very welcome! 😊 I'm glad I could help!\n\nIs there anything else you'd like to know about our Lost & Found system?",
      suggestions: ['Ask another question', 'Visit homepage', 'Close chat']
    },
    {
      keywords: ['bye', 'goodbye', 'see you', 'exit', 'close'],
      response: "Goodbye! 👋 Feel free to come back anytime you need help. Good luck finding your items!",
      suggestions: ['Close chat']
    }
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message when opening chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Hello! I'm your Lost & Found Assistant Bot! 🤖\n\nI can help you with:\n• Finding lost items\n• Reporting found items\n• Checking claim status\n• Answering questions\n\nHow can I help you today?",
          ['I lost something', 'I found something', 'Check my claim', 'How does this work?']
        );
        setShowWelcomePulse(false);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const addBotMessage = (text: string, suggestions?: string[]) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const findBestResponse = (input: string): KnowledgeBase | null => {
    const lowerInput = input.toLowerCase();
    
    // Find knowledge base entry with matching keywords
    for (const kb of knowledgeBase) {
      if (kb.keywords.some(keyword => lowerInput.includes(keyword))) {
        return kb;
      }
    }
    
    return null;
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    // Add user message
    addUserMessage(textToSend);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = findBestResponse(textToSend);
      
      if (response) {
        addBotMessage(response.response, response.suggestions);
      } else {
        // Default fallback response
        addBotMessage(
          "I'm not quite sure about that! 🤔 Here are some things I can help with:\n\n• Finding lost items\n• Reporting found items\n• Checking claim status\n• Understanding the process\n\nTry asking about one of these topics, or contact admin for specific questions!",
          ['Find lost item', 'Report found item', 'Contact admin', 'How it works']
        );
      }
      
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay for realism
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Auto-send with the suggestion text
    setTimeout(() => {
      handleSendMessage(suggestion);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
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
              className="rounded-full p-4 shadow-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                boxShadow: `0 0 30px ${getColor('accent1')}60`,
              }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
              
              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${getColor('accent2')}40, transparent)`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 rounded-2xl shadow-2xl overflow-hidden border-2"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('accent1'),
              boxShadow: `0 0 40px ${getColor('accent1')}40`,
              maxHeight: '600px',
              height: '80vh',
            }}
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between border-b-2"
              style={{
                background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                borderColor: getColor('accent1'),
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Customer Service</h3>
                  <div className="flex items-center gap-1 text-xs text-white/90">
                    <Sparkles className="h-3 w-3" />
                    <span>AI Assistant</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                height: 'calc(80vh - 180px)',
                backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div
                      className="p-2 rounded-full flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                        width: '32px',
                        height: '32px',
                      }}
                    >
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col gap-2 max-w-[75%]`}>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                      }`}
                      style={{
                        backgroundColor:
                          message.sender === 'user'
                            ? getColor('accent1')
                            : getColor('bgCardHover'),
                        color: message.sender === 'user' ? 'white' : getColor('textPrimary'),
                        boxShadow: message.sender === 'user' 
                          ? `0 0 20px ${getColor('accent1')}40`
                          : 'none',
                      }}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.sender === 'bot' && (
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion) => (
                          <motion.button
                            key={suggestion}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 rounded-full text-xs font-medium border-2 transition-all cursor-pointer"
                            style={{
                              borderColor: getColor('accent2'),
                              color: getColor('accent2'),
                              backgroundColor: `${getColor('accent2')}10`,
                            }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div
                      className="p-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: getColor('accent3'),
                        width: '32px',
                        height: '32px',
                      }}
                    >
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div
                    className="p-2 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                      width: '32px',
                      height: '32px',
                    }}
                  >
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1"
                    style={{
                      backgroundColor: getColor('bgCardHover'),
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getColor('accent1') }}
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              className="p-4 border-t-2"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border'),
              }}
            >
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border-2"
                  style={{
                    borderColor: getColor('border'),
                    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
                    color: getColor('textPrimary'),
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="rounded-xl px-4"
                  style={{
                    background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                    color: 'white',
                    opacity: inputValue.trim() ? 1 : 0.5,
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}