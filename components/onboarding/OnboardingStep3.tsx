import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingStep3Props {
  onContinue?: () => void;
}

const wordChangeFrequencies = [
  { label: 'every 1 hour', value: '1' },
  { label: 'every 3 hours', value: '3' },
  { label: 'every 6 hours', value: '6' },
  { label: 'every 12 hours', value: '12' },
];

export default function OnboardingStep3({ onContinue }: OnboardingStep3Props) {
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleTranslateX = useSharedValue(30);
  const boxesOpacity = useSharedValue(0);
  const boxesTranslateX = useSharedValue(30);
  const imageOpacity = useSharedValue(0);
  const imageTranslateX = useSharedValue(-50);
  const messageOpacity = useSharedValue(0);
  const messageTranslateX = useSharedValue(30);

  useEffect(() => {
    // Title animation - starts first
    titleOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    titleTranslateX.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // Boxes animation - starts after 200ms
    setTimeout(() => {
      boxesOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      boxesTranslateX.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 200);

    // Image animation - starts after 400ms
    setTimeout(() => {
      imageOpacity.value = withTiming(0.70, {
        duration: 1000,
        easing: Easing.out(Easing.ease),
      });
      imageTranslateX.value = withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.ease),
      });
    }, 400);

    // Message animation - starts after 600ms
    setTimeout(() => {
      messageOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      messageTranslateX.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 600);
  }, []);

  // Animated styles
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateX: titleTranslateX.value }],
  }));

  const boxesAnimatedStyle = useAnimatedStyle(() => ({
    opacity: boxesOpacity.value,
    transform: [{ translateX: boxesTranslateX.value }],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
      transform: [{ translateX: imageTranslateX.value }],
    };
  });

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateX: messageTranslateX.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-pinvocab-bg">
      <View className="flex-1">
        {/* Main Content - Image Left, Text Right */}
        <View className="flex-1 flex-row relative">
          {/* Image - Left Side (30% visible, 70% outside) */}
          <View 
            className="absolute left-0 top-0 bottom-0 justify-center items-start"
            style={{ 
              width: '100%',
              overflow: 'visible',
            }}
          >
            <Animated.View 
              style={[{ 
                width: '70%',
                height: '100%',
                marginLeft: '-33%',
              }, imageAnimatedStyle]}
            >
              <Image
                source={require('@/assets/images/OnboardingStep3Girl.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </Animated.View>
          </View>

          {/* Text Content - Right Side */}
          <View className="flex-1 justify-center pl-4 pr-8 z-10" style={{ maxWidth: '65%', marginLeft: 'auto' }}>
            {/* Step Indicator */}
            <Animated.View style={[{ marginBottom: 16 }, titleAnimatedStyle]}>
              <View 
                className="px-3 py-1.5 rounded-sm self-start"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.08)' }}
              >
                <Text 
                  className="text-pinvocab-text text-xs tracking-wide opacity-70"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  Step 3/3
                </Text>
              </View>
            </Animated.View>

            {/* Title */}
            <Animated.View style={[{ marginBottom: 8, flexShrink: 1 }, titleAnimatedStyle]}>
              <Text 
                className="text-pinvocab-text text-[30px] text-left leading-tight tracking-tight"
                style={{ flexShrink: 1, fontFamily: 'Roboto-Regular' }}
              >
                How often should words change?
              </Text>
            </Animated.View>
            
            {/* Subtitle */}
            <Animated.View style={[{ marginBottom: 24 }, titleAnimatedStyle]}>
              <Text 
                className="text-pinvocab-text text-sm text-left leading-relaxed opacity-50"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Don't worry. You can change it later.
              </Text>
            </Animated.View>

            {/* Frequency Boxes */}
            <Animated.View style={boxesAnimatedStyle}>
              <View className="gap-3">
                {wordChangeFrequencies.map((item, index) => {
                  const isSelected = selectedFrequency === item.value;
                  return (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => {
                        setSelectedFrequency(item.value);
                        // Navigate to login after a short delay for visual feedback
                        setTimeout(() => {
                          onContinue?.();
                        }, 300);
                      }}
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: isSelected ? '#222220' : 'rgba(34, 34, 32, 0.05)',
                        borderWidth: isSelected ? 0 : 1,
                        borderColor: 'rgba(34, 34, 32, 0.15)',
                      }}
                      className="px-6 py-4 rounded-sm"
                    >
                      <Text 
                        className="text-lg tracking-wide"
                        style={{ 
                          color: isSelected ? '#DED9D1' : '#222220',
                          fontFamily: 'Roboto-Regular',
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>

            {/* Message at the end */}
            <Animated.View style={[{ marginTop: 24 }, messageAnimatedStyle]}>
              <Text 
                className="text-pinvocab-text text-sm text-left leading-relaxed opacity-60"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Seeing a word more frequently helps you remember it better. Instead of trying to see more words, focusing on fewer words and never forgetting them can be more beneficial for your learning journey.
              </Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
