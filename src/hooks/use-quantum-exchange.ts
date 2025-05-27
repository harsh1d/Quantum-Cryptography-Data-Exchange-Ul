import React from "react";

export const useQuantumExchange = () => {
  const [selectedProtocol, setSelectedProtocol] = React.useState("BB84");
  const [fileToSend, setFileToSend] = React.useState<File | null>(null);
  const [recipientKey, setRecipientKey] = React.useState("");
  const [exchangeStatus, setExchangeStatus] = React.useState<"idle" | "processing" | "completed" | "error">("idle");
  const [progress, setProgress] = React.useState(0);
  const [generatedKey, setGeneratedKey] = React.useState("");
  
  // Security level based on protocol
  const securityLevel = React.useMemo(() => {
    switch (selectedProtocol) {
      case "BB84": return 7;
      case "E91": return 9;
      case "BBM92": return 8;
      case "Six-state": return 8;
      default: return 7;
    }
  }, [selectedProtocol]);
  
  // Sample metrics data
  const metrics = React.useMemo(() => {
    return {
      timeData: [
        { time: "00:00", qber: 0.05, keyRate: 1.2, entropy: 7.92 },
        { time: "00:05", qber: 0.04, keyRate: 1.3, entropy: 7.94 },
        { time: "00:10", qber: 0.06, keyRate: 1.1, entropy: 7.91 },
        { time: "00:15", qber: 0.03, keyRate: 1.4, entropy: 7.96 },
        { time: "00:20", qber: 0.04, keyRate: 1.3, entropy: 7.95 },
        { time: "00:25", qber: 0.02, keyRate: 1.5, entropy: 7.98 },
        { time: "00:30", qber: 0.03, keyRate: 1.4, entropy: 7.97 },
      ],
      radarData: [
        { subject: "Key Security", value: 95, fullMark: 100 },
        { subject: "Eavesdropping Resistance", value: 90, fullMark: 100 },
        { subject: "Quantum Resistance", value: 98, fullMark: 100 },
        { subject: "Forward Secrecy", value: 85, fullMark: 100 },
        { subject: "Authentication", value: 80, fullMark: 100 },
        { subject: "Error Correction", value: 88, fullMark: 100 },
      ],
    };
  }, []);
  
  // Generate a random quantum key
  React.useEffect(() => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 256; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedKey(result);
  }, []);
  
  // Simulate exchange process
  const startExchange = () => {
    setExchangeStatus("processing");
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setExchangeStatus("completed");
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  const cancelExchange = () => {
    setExchangeStatus("idle");
    setProgress(0);
  };
  
  return {
    selectedProtocol,
    setSelectedProtocol,
    fileToSend,
    setFileToSend,
    recipientKey,
    setRecipientKey,
    securityLevel,
    exchangeStatus,
    progress,
    startExchange,
    cancelExchange,
    generatedKey,
    metrics
  };
};
