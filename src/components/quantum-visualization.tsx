import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Progress } from "@heroui/react";

interface QuantumVisualizationProps {
  protocol: string;
  status: "idle" | "processing" | "completed" | "error";
  progress: number;
}

export const QuantumVisualization: React.FC<QuantumVisualizationProps> = ({ 
  protocol, 
  status,
  progress 
}) => {
  const particleCount = 40;
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      direction: Math.random() * 360,
      color: i % 3 === 0 ? "#006FEE" : i % 3 === 1 ? "#17c964" : "#f31260"
    }));
  }, []);

  const isActive = status === "processing";
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody>
            <h3 className="text-lg font-medium mb-2">Protocol</h3>
            <p className="text-default-500">{protocol}</p>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-1">Security Level</h4>
              <Progress 
                value={protocol === "BB84" ? 70 : protocol === "E91" ? 90 : 80} 
                color={protocol === "E91" ? "success" : "primary"}
                className="h-2"
              />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <h3 className="text-lg font-medium mb-2">Quantum States</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-content2 p-2 rounded-md text-center">
                <div className="text-sm font-medium">Qubits</div>
                <div className="text-xl font-semibold">256</div>
              </div>
              <div className="bg-content2 p-2 rounded-md text-center">
                <div className="text-sm font-medium">Bases</div>
                <div className="text-xl font-semibold">{protocol === "Six-state" ? "6" : "4"}</div>
              </div>
              <div className="bg-content2 p-2 rounded-md text-center">
                <div className="text-sm font-medium">Error Rate</div>
                <div className="text-xl font-semibold">0.03%</div>
              </div>
              <div className="bg-content2 p-2 rounded-md text-center">
                <div className="text-sm font-medium">Efficiency</div>
                <div className="text-xl font-semibold">{protocol === "BB84" ? "50%" : "75%"}</div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <h3 className="text-lg font-medium mb-2">Exchange Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Key Generation</span>
                <span className={status !== "idle" ? "text-success-500" : "text-default-500"}>
                  {status !== "idle" ? "Complete" : "Pending"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Quantum Transmission</span>
                <span className={status === "completed" || (status === "processing" && progress > 50) ? "text-success-500" : "text-default-500"}>
                  {status === "completed" ? "Complete" : status === "processing" && progress > 50 ? "Active" : "Pending"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Error Correction</span>
                <span className={status === "completed" ? "text-success-500" : "text-default-500"}>
                  {status === "completed" ? "Complete" : "Pending"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Privacy Amplification</span>
                <span className={status === "completed" ? "text-success-500" : "text-default-500"}>
                  {status === "completed" ? "Complete" : "Pending"}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card className="w-full overflow-hidden">
        <CardBody className="p-0">
          <div className="relative w-full h-[400px] bg-gradient-to-br from-background to-content2 dark:from-content1 dark:to-background">
            {/* Quantum channel */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary-200"></div>
            
            {/* Sender */}
            <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-full bg-content2 border-2 border-primary-500 flex items-center justify-center shadow-lg"
              >
                <span className="text-xs font-medium">Sender</span>
              </motion.div>
            </div>
            
            {/* Receiver */}
            <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-content2 border-2 border-primary-500 flex items-center justify-center shadow-lg"
              >
                <span className="text-xs font-medium">Receiver</span>
              </motion.div>
            </div>
            
            {/* Quantum particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                initial={{ 
                  x: `${particle.x}%`, 
                  y: `${particle.y}%`,
                  opacity: isActive ? 0.7 : 0.3,
                  scale: isActive ? 1 : 0.5
                }}
                animate={{ 
                  x: isActive 
                    ? [`${particle.x}%`, `${(particle.x + particle.speed * 50) % 100}%`]
                    : `${particle.x}%`,
                  y: isActive 
                    ? [`${particle.y}%`, `${(particle.y + Math.sin(particle.direction) * 20) % 100}%`]
                    : `${particle.y}%`,
                  opacity: isActive ? [0.7, 1, 0.7] : 0.3,
                  scale: isActive ? [1, 1.2, 1] : 0.5
                }}
                transition={{
                  duration: particle.speed * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color
                }}
              />
            ))}
            
            {/* Quantum bits transmission */}
            {isActive && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`bit-${i}`}
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-primary-500"
                    initial={{ left: "10%", opacity: 0 }}
                    animate={{ 
                      left: ["10%", "90%"],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.25,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}
              </>
            )}
            
            {/* Protocol visualization */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-xs text-default-500 mb-1">
                {protocol === "BB84" ? "Bennett-Brassard 1984 Protocol" : 
                 protocol === "E91" ? "Ekert 1991 Protocol" : 
                 protocol === "BBM92" ? "Bennett-Brassard-Mermin 1992 Protocol" :
                 "Six-state Protocol"}
              </div>
              {isActive && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
                  <span className="text-xs">Transmitting quantum states...</span>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};