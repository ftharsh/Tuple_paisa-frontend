import { useEffect, useRef, useState } from "react";

const TextMorph = () => {
  const elementRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const [frameRequest, setFrameRequest] = useState(null);
  const [queue, setQueue] = useState([]);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const phrases = [
    "It's not a WALLET , It's a NEX-GEN WALLET",
    "Carry one thing. Everything.",
    "Simple , Fast & Secure",
    "Crafted for the CREDITWORTHY",
    "MINI but MIGHTY",
  ];

  const [counter, setCounter] = useState(0);

  const randomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const setText = (newText) => {
    const oldText = elementRef.current?.innerText || "";
    const length = Math.max(oldText.length, newText.length);
    const newQueue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      newQueue.push({ from, to, start, end });
    }

    if (frameRequest) {
      cancelAnimationFrame(frameRequest);
    }

    setQueue(newQueue);
    setFrame(0);
  };

  const update = () => {
    let output = ""; //! what are these for
    let complete = 0;

    for (let i = 0; i < queue.length; i++) {
      const { from, to, start, end } = queue[i];

      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (Math.random() < 0.28) {
          //!here
          output += `<span class="text-white">${randomChar()}</span>`;
        } else {
          output += `<span class="text-white">${
            //!here
            queue[i].char || randomChar()
          }</span>`;
        }
      } else {
        output += from;
      }
    }

    if (elementRef.current) {
      elementRef.current.innerHTML = output;
    }

    if (complete === queue.length) {
      setTimeout(() => {
        setCounter((prev) => (prev + 1) % phrases.length);
      }, 2000);
    } else {
      const newRequest = requestAnimationFrame(() => {
        setFrame(frame + 1);
      });
      setFrameRequest(newRequest);
    }
  };

  useEffect(() => {
    setText(phrases[counter]);
  }, [counter]);

  useEffect(() => {
    if (queue.length > 0) {
      update();
    }
  }, [frame, queue]);

  useEffect(() => {
    return () => {
      if (frameRequest) {
        cancelAnimationFrame(frameRequest);
      }
    };
  }, [frameRequest]);

  // return (
  //   <div className=" flex items-center justify-center">
  //     <div
  //       ref={elementRef}
  //       role="presentation"
  //       data-testid="morphing-text"
  //       className="font-mono text-3xl font-bold text-white"
  //     />
  //   </div>
  // );
  return (
    <div className="flex items-center justify-center px-4 sm:px-8">
      <div
        ref={elementRef}
        role="presentation"
        data-testid="morphing-text"
        className="font-mono text-xl sm:text-3xl font-bold text-white"
      />
    </div>
  );
};

export default TextMorph;
