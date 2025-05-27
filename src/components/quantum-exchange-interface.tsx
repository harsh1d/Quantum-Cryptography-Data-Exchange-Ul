import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Tabs,
  Tab,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Progress,
  Tooltip,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  addToast
} from "@heroui/react";
import { QuantumVisualization } from "./quantum-visualization";
import { SecurityMetricsChart } from "./security-metrics-chart";
import { QuantumKeyDisplay } from "./quantum-key-display";
import { useQuantumExchange } from "../hooks/use-quantum-exchange";

export const QuantumExchangeInterface = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
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
  } = useQuantumExchange();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToSend(e.target.files[0]);
    }
  };

  const handleExchangeStart = () => {
    if (!fileToSend || !recipientKey) {
      addToast({
        title: "Missing Information",
        description: "Please select a file and enter recipient's quantum key",
        color: "warning"
      });
      return;
    }
    startExchange();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="text-primary-500"
            >
              <Icon icon="lucide:atom" className="w-10 h-10" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Quantum Secure Exchange</h1>
          </div>
          <Tooltip content="System Status: Online" placement="bottom">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success-500"></span>
              </span>
              <span className="text-sm text-success-500">Online</span>
            </div>
          </Tooltip>
        </div>
        
        <Card className="mb-6">
          <CardBody>
            <Tabs aria-label="Exchange Options" className="w-full">
              <Tab key="setup" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:settings" />
                  <span>Setup</span>
                </div>
              }>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Protocol Selection</h3>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button 
                            variant="flat" 
                            className="w-full justify-between"
                            endContent={<Icon icon="lucide:chevron-down" />}
                          >
                            {selectedProtocol}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                          aria-label="Quantum Protocols" 
                          onAction={(key) => setSelectedProtocol(key as string)}
                        >
                          <DropdownItem key="BB84">BB84 Protocol</DropdownItem>
                          <DropdownItem key="E91">E91 Protocol</DropdownItem>
                          <DropdownItem key="BBM92">BBM92 Protocol</DropdownItem>
                          <DropdownItem key="Six-state">Six-state Protocol</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">File Selection</h3>
                      <Input
                        type="file"
                        placeholder="Select file to encrypt"
                        onChange={handleFileChange}
                        startContent={<Icon icon="lucide:file" />}
                        className="mb-2"
                      />
                      {fileToSend && (
                        <p className="text-sm text-default-500">
                          Selected: {fileToSend.name} ({Math.round(fileToSend.size / 1024)} KB)
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Recipient's Quantum Key</h3>
                      <Input
                        value={recipientKey}
                        onValueChange={setRecipientKey}
                        placeholder="Enter recipient's quantum public key"
                        startContent={<Icon icon="lucide:key" />}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Security Level</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Quantum Resistance</span>
                          <span className="font-medium">{securityLevel}/10</span>
                        </div>
                        <Progress 
                          value={securityLevel * 10} 
                          color={securityLevel > 7 ? "success" : securityLevel > 4 ? "warning" : "danger"}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-default-500">
                          <span>Standard</span>
                          <span>Enhanced</span>
                          <span>Maximum</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Protocol Information</h3>
                      <Card className="bg-content2">
                        <CardBody className="text-sm">
                          <p className="mb-2">
                            <span className="font-medium">Protocol:</span> {selectedProtocol}
                          </p>
                          <p className="mb-2">
                            <span className="font-medium">Key Size:</span> 256-bit Quantum Key
                          </p>
                          <p>
                            <span className="font-medium">Encryption:</span> Post-Quantum Hybrid Encryption
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button 
                        color="primary" 
                        endContent={<Icon icon="lucide:arrow-right" />}
                        onPress={handleExchangeStart}
                        isDisabled={exchangeStatus === "processing"}
                      >
                        Start Secure Exchange
                      </Button>
                    </div>
                  </div>
                </div>
              </Tab>
              
              <Tab key="visualization" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:activity" />
                  <span>Visualization</span>
                </div>
              }>
                <div className="py-4">
                  <QuantumVisualization 
                    protocol={selectedProtocol} 
                    status={exchangeStatus}
                    progress={progress}
                  />
                </div>
              </Tab>
              
              <Tab key="metrics" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:bar-chart" />
                  <span>Security Metrics</span>
                </div>
              }>
                <div className="py-4">
                  <SecurityMetricsChart metrics={metrics} />
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
        
        {exchangeStatus === "processing" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 border-primary">
              <CardBody>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" color="primary" />
                      <h3 className="text-lg font-medium">Exchange in Progress</h3>
                    </div>
                    <Button 
                      size="sm" 
                      color="danger" 
                      variant="flat"
                      onPress={cancelExchange}
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <Progress 
                    value={progress} 
                    color="primary"
                    showValueLabel
                    className="h-2"
                  />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-default-500">Protocol</p>
                      <p className="font-medium">{selectedProtocol}</p>
                    </div>
                    <div>
                      <p className="text-default-500">Qubits Processed</p>
                      <p className="font-medium">{Math.floor(progress * 256)} / 256</p>
                    </div>
                    <div>
                      <p className="text-default-500">Error Rate</p>
                      <p className="font-medium">0.03%</p>
                    </div>
                    <div>
                      <p className="text-default-500">Estimated Time</p>
                      <p className="font-medium">{Math.ceil((100 - progress) / 10)} seconds</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
        
        {exchangeStatus === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 border-success">
              <CardBody>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center">
                        <Icon icon="lucide:check" className="text-white w-3 h-3" />
                      </div>
                      <h3 className="text-lg font-medium">Exchange Completed</h3>
                    </div>
                    <Button 
                      size="sm" 
                      color="primary" 
                      variant="flat"
                      onPress={onOpen}
                    >
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-default-500">File</p>
                      <p className="font-medium truncate max-w-[150px]">
                        {fileToSend?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-default-500">Encryption</p>
                      <p className="font-medium">Quantum-resistant AES-256</p>
                    </div>
                    <div>
                      <p className="text-default-500">Key Exchange</p>
                      <p className="font-medium">{selectedProtocol}</p>
                    </div>
                    <div>
                      <p className="text-default-500">Timestamp</p>
                      <p className="font-medium">{new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex gap-3">
              <Icon icon="lucide:shield" className="text-primary-500 w-6 h-6" />
              <div className="flex flex-col">
                <p className="text-md font-medium">Security Status</p>
                <p className="text-small text-default-500">Real-time monitoring</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Quantum Resistance</span>
                  <span className="text-success-500 font-medium">Strong</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Eavesdropping Detection</span>
                  <span className="text-success-500 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Key Integrity</span>
                  <span className="text-success-500 font-medium">Verified</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Channel Security</span>
                  <span className="text-warning-500 font-medium">Moderate</span>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader className="flex gap-3">
              <Icon icon="lucide:history" className="text-primary-500 w-6 h-6" />
              <div className="flex flex-col">
                <p className="text-md font-medium">Recent Exchanges</p>
                <p className="text-small text-default-500">Last 24 hours</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:file-text" className="w-4 h-4" />
                    <span className="truncate max-w-[120px]">financial_report.pdf</span>
                  </div>
                  <span className="text-xs text-default-500">10:32 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:file-image" className="w-4 h-4" />
                    <span className="truncate max-w-[120px]">secure_image.png</span>
                  </div>
                  <span className="text-xs text-default-500">Yesterday</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:file-text" className="w-4 h-4" />
                    <span className="truncate max-w-[120px]">contract_v2.docx</span>
                  </div>
                  <span className="text-xs text-default-500">Yesterday</span>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button variant="flat" size="sm" className="w-full">View All History</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="flex gap-3">
              <Icon icon="lucide:key" className="text-primary-500 w-6 h-6" />
              <div className="flex flex-col">
                <p className="text-md font-medium">Your Quantum Key</p>
                <p className="text-small text-default-500">For receiving files</p>
              </div>
            </CardHeader>
            <CardBody>
              <QuantumKeyDisplay />
            </CardBody>
            <CardFooter>
              <Button variant="flat" size="sm" className="w-full">Regenerate Key</Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Exchange Details</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-default-500 mb-1">Generated Quantum Key (Partial)</h4>
                    <div className="bg-content2 p-3 rounded-md font-mono text-xs overflow-x-auto">
                      {generatedKey.substring(0, 32)}...{generatedKey.substring(generatedKey.length - 32)}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-default-500 mb-1">Security Metrics</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-content2 p-3 rounded-md">
                        <p className="text-xs text-default-500">Quantum Bit Error Rate</p>
                        <p className="font-medium">0.03%</p>
                      </div>
                      <div className="bg-content2 p-3 rounded-md">
                        <p className="text-xs text-default-500">Privacy Amplification</p>
                        <p className="font-medium">1.42x</p>
                      </div>
                      <div className="bg-content2 p-3 rounded-md">
                        <p className="text-xs text-default-500">Entropy</p>
                        <p className="font-medium">7.998 bits/byte</p>
                      </div>
                      <div className="bg-content2 p-3 rounded-md">
                        <p className="text-xs text-default-500">Secure Key Rate</p>
                        <p className="font-medium">1.28 kbps</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-default-500 mb-1">File Information</h4>
                    <div className="bg-content2 p-3 rounded-md">
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <p className="text-default-500">Name:</p>
                        <p className="truncate">{fileToSend?.name}</p>
                        <p className="text-default-500">Size:</p>
                        <p>{fileToSend ? Math.round(fileToSend.size / 1024) : 0} KB</p>
                        <p className="text-default-500">Encryption:</p>
                        <p>Quantum-resistant AES-256</p>
                        <p className="text-default-500">Recipient:</p>
                        <p className="truncate">{recipientKey.substring(0, 16)}...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Download Certificate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};