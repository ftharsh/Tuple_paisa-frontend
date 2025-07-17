import { useState, useEffect } from "react";
import Scene3D from "./scene/Scene3D.jsx";
import Button from "./common/Button.jsx";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "./common/ParticleBackground.jsx";

const WalletTutorial = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tutorials = [
    {
      title: "100% Wallet",
      description:
        "Explore your digital wallet! Click and drag to transfer, click to see Money Magic.",
      type: "wallet",
    },
    {
      title: "Real-time Transfers",
      description:
        "Watch your money move at the speed of light with animated transfers.",
      type: "send",
    },
    {
      title: "Advanced Security",
      description:
        "Your assets are protected by state-of-the-art encryption visualized Digitally.",
      type: "security",
    },
    {
      title: "Investment Tracking",
      description:
        "Watch your investments grow with interactive with Real time Charts .",
      type: "invest",
    },
    {
      title: "Smart Settings",
      description:
        "Customize every aspect of your wallet with intuitive Secured controls.",
      type: "settings",
    },
  ];

  const handleInteraction = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  const renderTutorialStep = () => {
    const { title, description, type } = tutorials[currentStep];

    return (
      <div className="space-y-8">
        <div
          className="h-80 relative overflow-hidden rounded-xl cursor-pointer bg-blue-400"
          onClick={handleInteraction}
        >
          <Scene3D type={type} isAnimating={isAnimating} />
        </div>
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-700 text-lg max-w-md mx-auto">
            {description}
          </p>
        </div>
      </div>
    );
  };

  const renderProgressBar = () => (
    <div className="flex space-x-2 mb-12">
      {tutorials.map((_, index) => (
        <div
          key={index}
          className="flex-1 h-2 rounded-full overflow-hidden bg-sky-200 cursor-pointer"
          onClick={() => setCurrentStep(index)}
        >
          <div
            className={`h-full bg-gradient-to-r from-blue-500 to-pink-400 
              transition-all duration-500 ${
                index <= currentStep ? "w-full" : "w-0"
              }`}
          />
        </div>
      ))}
    </div>
  );

  const renderNavigationButtons = () => (
    <div className="flex justify-between mt-12">
      <Button
        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        disabled={currentStep === 0}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Previous
      </Button>
      <Button
        onClick={() =>
          setCurrentStep(Math.min(tutorials.length - 1, currentStep + 1))
        }
        disabled={currentStep === tutorials.length - 1}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Continue
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 p-8">
      <ParticleBackground />

      <div className="absolute top-4 left-4">
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Back to Home
        </Button>
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white/80 border border-sky-300 backdrop-blur-xl rounded-lg shadow-md">
        <div className="p-8">
          {renderProgressBar()}
          {renderTutorialStep()}
          {renderNavigationButtons()}
        </div>
      </div>
    </div>
  );
};

export default WalletTutorial;
