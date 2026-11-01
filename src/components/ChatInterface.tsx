import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Mic, Image as ImageIcon, MicOff, Volume2, Sparkles, Music, Video, RotateCw, StopCircle, Loader2, Camera, MessageCircle, Volume, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  text: string;
  sender: "user" | "dwiju";
  timestamp: Date;
  image?: string;
  generatedImage?: string;
  error?: boolean;
}

type ChatMode = "chat" | "image" | "video" | "music";
type ReplyMode = "text" | "voice" | "both";

interface ChatInterfaceProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ChatInterface = ({ isOpen: externalIsOpen, onOpenChange }: ChatInterfaceProps = {}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };
  const [currentMode, setCurrentMode] = useState<ChatMode>("chat");
  const [replyMode, setReplyMode] = useState<ReplyMode>("both");
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load saved messages from localStorage
    const saved = localStorage.getItem('dwiju-chat-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
    return [{
      id: "1",
      text: "નમસ્તે! હું Dwiju છું, તમારો AI Assistant. હું જોઈ શકું છું 👁️, બોલી શકું છું 🎤, સાંભળી શકું છું 👂, અને છબીઓ બનાવી શકું છું 🎨. તમને કેવી રીતે મદદ કરી શકું?",
      sender: "dwiju",
      timestamp: new Date(),
    }];
  });
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('dwiju-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'gu-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "વૉઇસ Error",
          description: "વૉઇસ recognition કામ કરી શક્યું નહીં.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Unsupported",
        description: "તમારું browser voice recognition support કરતું નથી.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'gu-IN';
      utterance.pitch = 0.85;
      utterance.rate = 0.95;
      
      // Load voices and select best male voice
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const gujaratiVoice = voices.find(v => v.lang.includes('gu'));
        const hindiVoice = voices.find(v => v.lang.includes('hi'));
        const maleVoice = voices.find(v => 
          v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female')
        );
        
        utterance.voice = matchingVoice || gujaratiVoice || hindiVoice || maleVoice || voices[0];
      };
      
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureFromCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      await new Promise(resolve => {
        video.onloadedmetadata = resolve;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      stream.getTracks().forEach(track => track.stop());
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setSelectedImage(dataUrl);
      
      toast({
        title: "ફોટો લીધો",
        description: "કેમેરાથી છબી capture થઈ ગઈ",
      });
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: "કેમેરા Error",
        description: "કેમેરા ઍક્સેસ મળી શક્યું નહીં. કૃપા કરીને permission આપો.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (retryLastMessage = false) => {
    if (!retryLastMessage && !inputText.trim() && !selectedImage) return;

    let userMessage: Message;
    let imageToSend: string | null = null;

    if (retryLastMessage) {
      // Find the last user message
      const lastUserMsg = [...messages].reverse().find(m => m.sender === "user");
      if (!lastUserMsg) return;
      userMessage = lastUserMsg;
      imageToSend = lastUserMsg.image || null;
    } else {
      userMessage = {
        id: Date.now().toString(),
        text: inputText || (selectedImage ? "છબી મોકલી" : ""),
        sender: "user",
        timestamp: new Date(),
        image: selectedImage || undefined,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      imageToSend = selectedImage;
      setSelectedImage(null);
    }

    setIsLoading(true);

    try {
      let mode = "chat";
      let prompt = userMessage.text;

      if (currentMode === "image") {
        mode = "generate-image";
      } else if (currentMode === "video") {
        mode = "generate-video";
      } else if (currentMode === "music") {
        mode = "generate-music";
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: messages
            .filter(m => !m.error)
            .slice(-20)
            .map(m => ({ 
              role: m.sender === "user" ? "user" : "assistant", 
              content: m.text 
            }))
            .concat([{ role: "user", content: prompt }]),
          image: imageToSend,
          mode: mode
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "API Error");
      }

      if (!data) {
        throw new Error("No response received");
      }

      const dwijuResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message || "માફ કરશો, હું તમને જવાબ આપી શક્યો નહીં.",
        sender: "dwiju",
        timestamp: new Date(),
        generatedImage: data.image || undefined,
      };

      setMessages((prev) => [...prev, dwijuResponse]);
      
      // Voice response based on reply mode
      if (currentMode === "chat" && data.message && !data.image && (replyMode === "voice" || replyMode === "both")) {
        setTimeout(() => speakText(data.message), 300);
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      
      let errorText = "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.";
      let isApiKeyError = false;
      
      if (error.name === "AbortError") {
        errorText = "સમય સમાપ્ત થયો. કૃપા કરીને ફરી પ્રયાસ કરો.";
      } else if (error.message?.includes("Failed to fetch")) {
        errorText = "નેટવર્ક એરર. તમારું કનેક્શન ચેક કરો.";
      } else if (error.message?.includes("API") || error.message?.includes("key") || error.message?.includes("configured")) {
        errorText = "⚠️ API Key Error: કોઈ API key ખોટી અથવા missing છે. કૃપા કરીને settings check કરો.";
        isApiKeyError = true;
      } else if (error.message?.includes("Rate limit")) {
        errorText = "⚠️ Rate Limit: ઘણા બધા requests. થોડી વાર પછી પ્રયાસ કરો.";
        isApiKeyError = true;
      } else if (error.message?.includes("Payment")) {
        errorText = "⚠️ Payment Required: API credits ખલાસ થઈ ગયા છે. કૃપા કરીને recharge કરો.";
        isApiKeyError = true;
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: "dwiju",
        timestamp: new Date(),
        error: true,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: isApiKeyError ? "⚠️ API Configuration Error" : "Error",
        description: errorText,
        variant: "destructive",
        duration: isApiKeyError ? 10000 : 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 z-50 animate-pulse"
          size="icon"
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      )}

      {/* Chat Window - Full Screen */}
      {isOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-innovation to-primary text-primary-foreground p-4 flex items-center justify-between shadow-lg flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse shadow-inner">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Dwiju AI
                  <span className="text-xs px-2 py-0.5 bg-primary-foreground/20 rounded-full">Online</span>
                </h3>
                <p className="text-xs opacity-90 flex items-center gap-2 flex-wrap">
                  {currentMode === "chat" && "💬 Chat • 👁️ Vision • 🎤 Voice"}
                  {currentMode === "image" && "🎨 Image Generation"}
                  {currentMode === "video" && "🎬 Video Planning"}
                  {currentMode === "music" && "🎵 Music Creation"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm('ચેટ હિસ્ટ્રી ડિલીટ કરો?')) {
                    localStorage.removeItem('dwiju-chat-history');
                    setMessages([{
                      id: "1",
                      text: "નમસ્તે! હું Dwiju છું, તમારો AI Assistant. હું જોઈ શકું છું 👁️, બોલી શકું છું 🎤, સાંભળી શકું છું 👂, અને છબીઓ બનાવી શકું છું 🎨. તમને કેવી રીતે મદદ કરી શકું?",
                      sender: "dwiju",
                      timestamp: new Date(),
                    }]);
                    toast({ title: "History Cleared", description: "ચેટ હિસ્ટ્રી ડિલીટ થઈ ગઈ" });
                  }
                }}
                className="hover:bg-primary-foreground/20 text-xs"
              >
                Clear
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Reply Mode Toggle */}
          <div className="bg-muted/30 px-4 py-2 flex items-center justify-center gap-3 border-b flex-shrink-0">
            <span className="text-xs font-medium text-muted-foreground">Reply Mode:</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={replyMode === "text" ? "default" : "outline"}
                onClick={() => setReplyMode("text")}
                className="h-8 px-3 text-xs gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                Text Only
              </Button>
              <Button
                size="sm"
                variant={replyMode === "voice" ? "default" : "outline"}
                onClick={() => setReplyMode("voice")}
                className="h-8 px-3 text-xs gap-1"
              >
                <Volume className="w-3 h-3" />
                Voice Only
              </Button>
              <Button
                size="sm"
                variant={replyMode === "both" ? "default" : "outline"}
                onClick={() => setReplyMode("both")}
                className="h-8 px-3 text-xs gap-1"
              >
                <AudioLines className="w-3 h-3" />
                Both
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={currentMode} onValueChange={(v) => setCurrentMode(v as ChatMode)} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50 mx-2 mt-2 flex-shrink-0">
              <TabsTrigger value="chat" className="gap-1 text-xs">
                <MessageSquare className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="image" className="gap-1 text-xs">
                <Sparkles className="w-4 h-4" />
                Image
              </TabsTrigger>
              <TabsTrigger value="video" className="gap-1 text-xs">
                <Video className="w-4 h-4" />
                Video
              </TabsTrigger>
              <TabsTrigger value="music" className="gap-1 text-xs">
                <Music className="w-4 h-4" />
                Music
              </TabsTrigger>
            </TabsList>

            <TabsContent value={currentMode} className="flex-1 flex flex-col m-0 overflow-hidden">
              {/* Messages - Scrollable Area */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4" ref={scrollAreaRef}>
                <div className="space-y-4 max-w-4xl mx-auto pb-4">
                  {messages.map((message, index) => (
                    <div key={message.id} className="animate-fade-in">
                      <div
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
                            message.sender === "user"
                              ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                              : message.error
                              ? "bg-destructive/10 text-destructive border-2 border-destructive/30"
                              : "bg-gradient-to-br from-muted to-muted/80 text-foreground border-2 border-border/50"
                          }`}
                        >
                          {message.image && (
                            <div className="mb-3 rounded-xl overflow-hidden border-2 border-primary-foreground/20">
                              <img src={message.image} alt="uploaded" className="w-full" />
                            </div>
                          )}
                          {message.generatedImage && (
                            <div className="mb-3 rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg">
                              <img src={message.generatedImage} alt="generated" className="w-full" />
                            </div>
                          )}
                          <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{message.text}</p>
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-current/10 gap-2">
                            <p className="text-xs opacity-70 font-medium">
                              {message.timestamp.toLocaleTimeString("gu-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            {message.sender === "dwiju" && !message.error && (
                              <div className="flex gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 hover:bg-primary/20"
                                  onClick={() => speakText(message.text)}
                                  title="બોલો"
                                  disabled={isSpeaking}
                                >
                                  <Volume2 className="w-4 h-4" />
                                </Button>
                                {index === messages.length - 1 && !isLoading && (
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 hover:bg-primary/20"
                                    onClick={() => sendMessage(true)}
                                    title="ફરી પ્રયાસ કરો"
                                  >
                                    <RotateCw className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-gradient-to-br from-muted to-muted/80 text-foreground p-5 rounded-2xl border-2 border-border/50 shadow-md flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span className="text-sm text-muted-foreground">Dwiju વિચારી રહ્યું છે...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area - Fixed at Bottom */}
              <div className="border-t-2 bg-card p-3 md:p-4 space-y-2 flex-shrink-0 shadow-lg">
                {selectedImage && (
                  <div className="relative rounded-lg overflow-hidden max-w-xs mx-auto border-2 border-primary mb-2">
                    <img src={selectedImage} alt="preview" className="w-full" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 w-7 h-7"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={toggleListening}
                    disabled={isLoading}
                    className={`h-11 w-11 flex-shrink-0 ${isListening ? "bg-destructive text-destructive-foreground animate-pulse" : ""}`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="h-11 w-11 flex-shrink-0"
                    title="ફાઈલમાંથી છબી પસંદ કરો"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={captureFromCamera}
                    disabled={isLoading}
                    className="h-11 w-11 flex-shrink-0"
                    title="કેમેરાથી ફોટો લો"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                  
                  {isSpeaking && (
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={stopSpeaking}
                      className="h-11 w-11 flex-shrink-0 animate-pulse bg-secondary text-secondary-foreground"
                    >
                      <StopCircle className="w-5 h-5" />
                    </Button>
                  )}
                  
                  <Input
                    type="text"
                    placeholder={
                      currentMode === "chat" 
                        ? "મને કંઈપણ પૂછો... 👁️🎤👂"
                        : currentMode === "image"
                        ? "છબી બનાવો... 🎨✨"
                        : currentMode === "video"
                        ? "વીડિયો આઈડિયા... 🎬📝"
                        : "સંગીત બનાવો... 🎵🎼"
                    }
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="h-11 text-base flex-1"
                  />
                  
                  <Button
                    onClick={() => sendMessage(false)}
                    disabled={isLoading || (!inputText.trim() && !selectedImage)}
                    className="h-11 px-4 bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0 shadow-md"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};
