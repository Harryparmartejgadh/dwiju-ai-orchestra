import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Mic, Image as ImageIcon, MicOff, Volume2, Sparkles, Music, Video } from "lucide-react";
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
}

type ChatMode = "chat" | "image" | "video" | "music";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "નમસ્તે! હું Dwiju છું. તમને કેવી રીતે મદદ કરી શકું? તમે મને લખીને, બોલીને કે છબી બતાવીને પ્રશ્ન પૂછી શકો છો.",
      sender: "dwiju",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

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
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'gu-IN';
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
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

  const sendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText || (selectedImage ? "છબી મોકલી" : ""),
      sender: "user",
      timestamp: new Date(),
      image: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    const imageToSend = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      let mode = "chat";
      let prompt = userMessage.text;

      // Determine mode based on current tab
      if (currentMode === "image") {
        mode = "generate-image";
      } else if (currentMode === "video") {
        mode = "generate-video";
      } else if (currentMode === "music") {
        mode = "generate-music";
      }

      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            ...messages.map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
            { role: "user", content: prompt }
          ],
          image: imageToSend,
          mode: mode
        },
      });

      if (error) throw error;

      const dwijuResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: "dwiju",
        timestamp: new Date(),
        generatedImage: data.image || undefined,
      };

      setMessages((prev) => [...prev, dwijuResponse]);
      
      // Auto-speak response in chat mode
      if (currentMode === "chat" && data.message) {
        speakText(data.message);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "કંઈક ખોટું થયું.",
        variant: "destructive",
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
        <div className="fixed inset-4 md:inset-8 bg-card rounded-2xl shadow-2xl border-2 border-primary/30 z-50 flex flex-col animate-scale-in max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Dwiju AI Assistant</h3>
                <p className="text-xs opacity-90">
                  {currentMode === "chat" && "💬 Chat • 👁️ Vision • 🎤 Voice"}
                  {currentMode === "image" && "🎨 Image Generation • AI Powered"}
                  {currentMode === "video" && "🎬 Video Scripts & Planning"}
                  {currentMode === "music" && "🎵 Music & Lyrics Creation"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={currentMode} onValueChange={(v) => setCurrentMode(v as ChatMode)} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50 m-2">
              <TabsTrigger value="chat" className="gap-1">
                <MessageSquare className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="image" className="gap-1">
                <Sparkles className="w-4 h-4" />
                Image
              </TabsTrigger>
              <TabsTrigger value="video" className="gap-1">
                <Video className="w-4 h-4" />
                Video
              </TabsTrigger>
              <TabsTrigger value="music" className="gap-1">
                <Music className="w-4 h-4" />
                Music
              </TabsTrigger>
            </TabsList>

            <TabsContent value={currentMode} className="flex-1 flex flex-col m-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {message.image && (
                          <img src={message.image} alt="uploaded" className="rounded-lg mb-2 max-w-full" />
                        )}
                        {message.generatedImage && (
                          <img src={message.generatedImage} alt="generated" className="rounded-lg mb-2 max-w-full" />
                        )}
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground p-3 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border">
                {selectedImage && (
                  <div className="mb-2 relative inline-block">
                    <img src={selectedImage} alt="selected" className="max-w-[200px] rounded-lg" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {currentMode === "chat" && (
                    <>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        title="છબી upload કરો"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </Button>
                    </>
                  )}
                  <Button
                    size="icon"
                    variant={isListening ? "default" : "secondary"}
                    onClick={toggleListening}
                    disabled={isLoading}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      currentMode === "image" ? "છબી વર્ણન કરો..." :
                      currentMode === "video" ? "Video વર્ણન કરો..." :
                      currentMode === "music" ? "Song/Music વર્ણન કરો..." :
                      "તમારો પ્રશ્ન લખો..."
                    }
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    size="icon" 
                    onClick={sendMessage} 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isLoading || (!inputText.trim() && !selectedImage)}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                  {isSpeaking && (
                    <Button size="icon" variant="outline" disabled>
                      <Volume2 className="w-5 h-5 animate-pulse" />
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};
