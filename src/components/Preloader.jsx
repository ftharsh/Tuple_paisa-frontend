import { useEffect } from "react";
import loadingGif from "../media/images/preloader.gif";

const Preloader = ({ onComplete }) => {
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    gif: {
      width: "20rem",
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={styles.overlay}>
      <img src={loadingGif} alt="Loading..." style={styles.gif} />
    </div>
  );
};

export default Preloader;
