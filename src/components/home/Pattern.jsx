import { useEffect } from "react";
import TextMorph from "./MorphingText";
import { useNavigate } from "react-router-dom";

const PatternBackground = () => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/authpage");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 600,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
          },
        },
        retina_detect: true,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // return (
  //   <div className="relative w-full h-[600px]">
  //     <div
  //       id="particles-js"
  //       className="absolute inset-0 bg-gradient-radial from-blue-900 to-black to-70%"
  //     />
  //     <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
  //       <h1
  //         className="futuristic-font text-9xl font-extrabold text-white mb-4 mt-3"
  //         style={{ fontFamily: "Space Mono, sans-serif" }}
  //       >
  //         TUPLE PAISA
  //       </h1>
  //       <h2 className="text-2xl font-medium text-gray-300 p-8">
  //         <TextMorph />
  //       </h2>
  //       <div className="flex gap-8 pointer-events-auto">
  //         <button
  //           className="group flex items-center border-none bg-transparent cursor-pointer transition-all duration-300 relative top-11"
  //           onClick={handleSignInClick}
  //         >
  //           <span className="relative uppercase text-white text-lg tracking-[4px] pr-4 pb-5 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:bottom-0 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:origin-left group-hover:after:scale-x-100">
  //             Sign Up
  //           </span>
  //           <svg
  //             className="transform -translate-x-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0 active:scale-90"
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="30"
  //             height="10"
  //             viewBox="0 0 46 16"
  //             fill="white"
  //           >
  //             <path
  //               d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
  //               transform="translate(30)"
  //             />
  //           </svg>
  //         </button>

  //         <button
  //           className="group flex items-center border-none bg-transparent cursor-pointer transition-all duration-300 relative top-11"
  //           onClick={handleSignInClick}
  //         >
  //           <span className="relative uppercase text-white text-lg tracking-[4px] pr-4 pb-5 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:bottom-0 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:origin-left group-hover:after:scale-x-100">
  //             Register
  //           </span>
  //           <svg
  //             className="transform -translate-x-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0 active:scale-90"
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="30"
  //             height="10"
  //             viewBox="0 0 46 16"
  //             fill="white"
  //           >
  //             <path
  //               d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
  //               transform="translate(30)"
  //             />
  //           </svg>
  //         </button>
  //       </div>
  //     </div>
  //     <div className="absolute top-12 left-0 bg-[#000022] w-20 text-[#13E8E9] text-sm text-left pl-1 leading-loose font-bold font-sans"></div>
  //   </div>
  // );
  return (
    <div className="relative w-full h-[80vh] sm:h-[600px]">
      <div
        id="particles-js"
        className="absolute inset-0 bg-gradient-radial from-blue-900 to-black to-70%"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4 sm:px-8">
        <h1
          className="futuristic-font  lg:text-9xl font-extrabold text-white mb-4 mt-3 sm:mt-6 md:text-7xl"
          style={{ fontFamily: "Space Mono, sans-serif" }}
        >
          TUPLE PAISA
        </h1>

        <h2 className="text-lg sm:text-2xl font-medium text-gray-300 px-4 py-4">
          <TextMorph />
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pointer-events-auto mt-4">
          <button
            className="group flex items-center border-none bg-transparent cursor-pointer transition-all duration-300"
            onClick={handleSignInClick}
          >
            <span className="relative uppercase text-white text-base sm:text-lg tracking-[2px] sm:tracking-[4px] pr-2 sm:pr-4 pb-3 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:bottom-0 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:origin-left group-hover:after:scale-x-100">
              Sign Up
            </span>
            <svg
              className="transform -translate-x-1 sm:-translate-x-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0 active:scale-90"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="8"
              viewBox="0 0 46 16"
              fill="white"
            >
              <path
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
              />
            </svg>
          </button>

          <button
            className="group flex items-center border-none bg-transparent cursor-pointer transition-all duration-300"
            onClick={handleSignInClick}
          >
            <span className="relative uppercase text-white text-base sm:text-lg tracking-[2px] sm:tracking-[4px] pr-2 sm:pr-4 pb-3 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:bottom-0 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:origin-left group-hover:after:scale-x-100">
              Register
            </span>
            <svg
              className="transform -translate-x-1 sm:-translate-x-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0 active:scale-90"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="8"
              viewBox="0 0 46 16"
              fill="white"
            >
              <path
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute top-6 left-2 sm:top-12 sm:left-0 bg-[#000022] w-14 sm:w-20 text-[#13E8E9] text-xs sm:text-sm text-left pl-1 leading-loose font-bold font-sans"></div>
    </div>
  );
};

export default PatternBackground;
