import Login from "@/components/auth/Login";
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import { useState } from "react";

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showLogin, setShowLogin] = useState(false);

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      // Navigate to login after onboarding
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    // TODO: Navigate to main app after successful login
    console.log("Login successful");
  };

  if (showLogin) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentStep === 1) {
    return <OnboardingStep1 onContinue={handleContinue} />;
  }

  if (currentStep === 2) {
    return <OnboardingStep2 onContinue={handleContinue} />;
  }

  return <OnboardingStep3 onContinue={handleContinue} />;
}
