import { motion, useAnimation } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";

export function Loader({ isLoading = true }) {
  const controls = useAnimation();
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // When the loader is about to finish
      setIsUnlocked(true);
      controls.stop(); // Stop the circle rotation
    }
  }, [isLoading, controls]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative">
        {/* Lock/Unlock Icon */}
        {isUnlocked ? (
          <Unlock className="pt-3 p-2 w-14 h-12 text-primary transition-transform duration-500" />
        ) : (
          <Lock className="pt-3 p-2 w-14 h-12 text-primary" />
        )}

        {/* Rotating Circle */}
        <motion.div
          animate={
            isUnlocked
              ? { rotate: 0 } // Stop rotating
              : { rotate: 360 } // Rotate infinitely
          }
          transition={{
            duration: 1.5,
            repeat: isUnlocked ? 0 : Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 w-14 h-14"
        >
          <div className="relative w-full h-full rounded-full border-[4px] border-primary/30">
            <div className="absolute w-full h-full rounded-full border-[4px] border-transparent border-t-primary"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
