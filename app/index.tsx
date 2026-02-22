import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import Home from "@/components/home/Home";
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import { useState } from "react";

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showHome, setShowHome] = useState(true); // Temporarily set to true to see Home component

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
    // Navigate to home after successful login
    setShowHome(true);
  };

  const handleSignUpSuccess = () => {
    // Navigate to home after successful sign up
    setShowHome(true);
  };

  if (showHome) {
    return (
      <Home 
        onLogout={() => {
          setShowHome(false);
          setShowLogin(true);
        }}
      />
    );
  }

  if (showSignUp) {
    return (
      <SignUp 
        onSignUpSuccess={handleSignUpSuccess}
        onNavigateToLogin={() => {
          setShowSignUp(false);
          setShowLogin(true);
        }}
      />
    );
  }

  if (showLogin) {
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess}
        onNavigateToSignUp={() => {
          setShowLogin(false);
          setShowSignUp(true);
        }}
      />
    );
  }

  if (currentStep === 1) {
    return <OnboardingStep1 onContinue={handleContinue} />;
  }

  if (currentStep === 2) {
    return <OnboardingStep2 onContinue={handleContinue} />;
  }

  return <OnboardingStep3 onContinue={handleContinue} />;
}
