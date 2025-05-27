import React from "react";
import { motion } from "framer-motion";
import { QuantumExchangeInterface } from "./components/quantum-exchange-interface";

export default function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background to-content2 dark:from-background dark:to-content1 p-4 md:p-8"
    >
      <QuantumExchangeInterface />
    </motion.div>
  );
}