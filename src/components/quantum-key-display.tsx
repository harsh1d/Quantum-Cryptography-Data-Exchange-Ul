import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const QuantumKeyDisplay = () => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  
  // Generate a random quantum key for display purposes
  const quantumKey = React.useMemo(() => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(quantumKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  return (
    <div className="space-y-3">
      <div className="relative bg-content2 p-3 rounded-md font-mono text-xs overflow-hidden">
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="break-all"
          >
            {quantumKey}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center h-[60px]"
          >
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-default-300"></div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="flat" 
          size="sm" 
          className="flex-1"
          startContent={<Icon icon={isVisible ? "lucide:eye-off" : "lucide:eye"} className="w-4 h-4" />}
          onPress={toggleVisibility}
        >
          {isVisible ? "Hide" : "Show"}
        </Button>
        <Button 
          variant="flat" 
          size="sm" 
          className="flex-1"
          startContent={<Icon icon={isCopied ? "lucide:check" : "lucide:copy"} className="w-4 h-4" />}
          onPress={handleCopy}
          color={isCopied ? "success" : "default"}
        >
          {isCopied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
};