import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: 100, transition: { duration: 0.25, ease: "circIn" } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "circOut" } },
  exit: { opacity: 0, y: -100, transition: { duration: 0.25, ease: "circOut" } },
};

const AnimatedVerticalPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animations}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedVerticalPage