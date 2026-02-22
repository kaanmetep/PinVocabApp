import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoginProps {
  onLoginSuccess?: () => void;
  onNavigateToSignUp?: () => void;
}

export default function Login({ onLoginSuccess, onNavigateToSignUp }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(-20);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(-20);
  const socialButtonsOpacity = useSharedValue(0);
  const socialButtonsTranslateY = useSharedValue(20);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(20);

  useEffect(() => {
    // Title animation - starts first
    titleOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    titleTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // Subtitle animation - starts after 200ms
    setTimeout(() => {
      subtitleOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      subtitleTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 200);

    // Social buttons animation - starts after 300ms
    setTimeout(() => {
      socialButtonsOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      socialButtonsTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 300);

    // Form animation - starts after 500ms
    setTimeout(() => {
      formOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      formTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 500);

    // Button animation - starts after 700ms
    setTimeout(() => {
      buttonOpacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      buttonTranslateY.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
    }, 700);
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess?.();
    }, 1500);
  };

  const handleAppleLogin = async () => {
    // TODO: Implement Apple Sign In
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess?.();
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    // TODO: Implement Google Sign In
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess?.();
    }, 1500);
  };

  // Animated styles
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const socialButtonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: socialButtonsOpacity.value,
    transform: [{ translateY: socialButtonsTranslateY.value }],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-pinvocab-bg">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-8 pt-8">
          {/* Header */}
          <View className="mb-12">
            <Animated.View style={titleAnimatedStyle}>
              <Text 
                className="text-pinvocab-text text-4xl text-left leading-tight tracking-tight mb-3"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                Welcome back
              </Text>
            </Animated.View>
            
            <Animated.View style={subtitleAnimatedStyle}>
              <Text 
                className="text-pinvocab-text text-lg text-left leading-relaxed opacity-70"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Sign in to continue your vocabulary journey
              </Text>
            </Animated.View>
          </View>

          {/* Social Login Buttons */}
          <Animated.View style={[{ marginBottom: 24 }, socialButtonsAnimatedStyle]}>
            <View className="gap-3">
              {/* Apple Sign In */}
              <TouchableOpacity
                onPress={handleAppleLogin}
                disabled={isLoading}
                className="px-6 py-4 rounded-sm flex-row items-center justify-center"
                style={{ 
                  backgroundColor: '#000000',
                }}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name="logo-apple" 
                  size={20} 
                  color="#FFFFFF" 
                  style={{ marginRight: 12 }}
                />
                <Text 
                  className="text-white text-base tracking-wide"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Continue with Apple
                </Text>
              </TouchableOpacity>

              {/* Google Sign In */}
              <TouchableOpacity
                onPress={handleGoogleLogin}
                disabled={isLoading}
                className="px-6 py-4 rounded-sm flex-row items-center justify-center"
                style={{ 
                  backgroundColor: 'rgba(34, 34, 32, 0.05)',
                  borderWidth: 1,
                  borderColor: 'rgba(34, 34, 32, 0.15)',
                }}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name="logo-google" 
                  size={20} 
                  color="#222220" 
                  style={{ marginRight: 12 }}
                />
                <Text 
                  className="text-pinvocab-text text-base tracking-wide"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View 
                className="flex-1"
                style={{ 
                  height: 1,
                  backgroundColor: 'rgba(34, 34, 32, 0.15)',
                }}
              />
              <Text 
                className="mx-4 text-pinvocab-text text-sm opacity-50"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                or
              </Text>
              <View 
                className="flex-1"
                style={{ 
                  height: 1,
                  backgroundColor: 'rgba(34, 34, 32, 0.15)',
                }}
              />
            </View>
          </Animated.View>

          {/* Form */}
          <Animated.View style={formAnimatedStyle} className="flex-1">
            <View className="mb-6">
              <Text 
                className="text-pinvocab-text text-sm mb-2 opacity-70"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                Email
              </Text>
              <View 
                className="px-4 py-4 rounded-sm flex-row items-center"
                style={{ 
                  backgroundColor: 'rgba(34, 34, 32, 0.05)',
                  borderWidth: 1,
                  borderColor: 'rgba(34, 34, 32, 0.15)',
                }}
              >
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color="#222220" 
                  style={{ opacity: 0.5, marginRight: 12 }}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(34, 34, 32, 0.4)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="flex-1 text-pinvocab-text text-base"
                  style={{ fontFamily: 'Roboto-Regular' }}
                />
              </View>
            </View>

            <View className="mb-8">
              <Text 
                className="text-pinvocab-text text-sm mb-2 opacity-70"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                Password
              </Text>
              <View 
                className="px-4 py-4 rounded-sm flex-row items-center"
                style={{ 
                  backgroundColor: 'rgba(34, 34, 32, 0.05)',
                  borderWidth: 1,
                  borderColor: 'rgba(34, 34, 32, 0.15)',
                }}
              >
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color="#222220" 
                  style={{ opacity: 0.5, marginRight: 12 }}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(34, 34, 32, 0.4)"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="flex-1 text-pinvocab-text text-base"
                  style={{ fontFamily: 'Roboto-Regular' }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#222220" 
                    style={{ opacity: 0.5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
              activeOpacity={0.7}
              className="self-end mb-8"
            >
              <Text 
                className="text-pinvocab-text text-sm opacity-70"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login Button */}
          <View className="pb-8">
            <Animated.View style={buttonAnimatedStyle}>
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading || !email.trim() || !password.trim()}
                className="px-8 py-4 rounded-sm shadow-md items-center justify-center"
                style={{ 
                  backgroundColor: email.trim() && password.trim() ? '#222220' : 'rgba(34, 34, 32, 0.3)',
                }}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <Text 
                    className="text-pinvocab-bg text-base tracking-wide"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Signing in...
                  </Text>
                ) : (
                  <Text 
                    className="text-pinvocab-bg text-base tracking-wide"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Sign in
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Sign Up Link */}
            <Animated.View style={[{ marginTop: 16 }, buttonAnimatedStyle]}>
              <View className="flex-row justify-center items-center">
                <Text 
                  className="text-pinvocab-text text-sm opacity-70"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={onNavigateToSignUp}
                >
                  <Text 
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Bold' }}
                  >
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </View>

        {/* Footer - Terms, Privacy, Contact & Version - Bottom of Screen */}
        <View className="px-8 pb-4">
          <Animated.View style={buttonAnimatedStyle}>
            <View className="items-center gap-3">
              {/* Terms & Privacy */}
              <View className="flex-row items-center gap-2 flex-wrap justify-center">
                <Text 
                  className="text-pinvocab-text text-xs opacity-50"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  By continuing, you agree to our
                </Text>
              </View>
              <View className="flex-row items-center gap-2 flex-wrap justify-center">
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => {
                    // TODO: Open Terms of Service
                    console.log('Terms of Service');
                  }}
                >
                  <Text 
                    className="text-pinvocab-text text-xs opacity-70 underline"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    Terms of Service
                  </Text>
                </TouchableOpacity>
                <Text 
                  className="text-pinvocab-text text-xs opacity-50"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  and
                </Text>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => {
                    // TODO: Open Privacy Policy
                    console.log('Privacy Policy');
                  }}
                >
                  <Text 
                    className="text-pinvocab-text text-xs opacity-70 underline"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Contact Us */}
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Open contact/support
                  console.log('Contact Us');
                }}
                className="mt-1"
              >
                <View className="flex-row items-center gap-1.5">
                  <Ionicons 
                    name="mail-outline" 
                    size={14} 
                    color="#222220" 
                    style={{ opacity: 0.5 }}
                  />
                  <Text 
                    className="text-pinvocab-text text-xs opacity-60"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    Contact Us
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Version Info */}
              <Text 
                className="text-pinvocab-text text-[10px] opacity-40 mt-1"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                PinVocab v{Constants.expoConfig?.version || '1.0.0'}
              </Text>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
