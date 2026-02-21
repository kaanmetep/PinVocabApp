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

interface OnboardingStep2Props {
  onContinue?: () => void;
}

const englishLevels = [
  { level: 'Beginner', code: 'A1' },
  { level: 'Elementary', code: 'A2' },
  { level: 'Intermediate', code: 'B1' },
  { level: 'Upper Intermediate', code: 'B2' },
  { level: 'Advanced', code: 'C1' },
  { level: 'Proficient', code: 'C2' },
];

export default function OnboardingStep2({ onContinue }: OnboardingStep2Props) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleTranslateX = useSharedValue(-30);
  const boxesOpacity = useSharedValue(0);
  const boxesTranslateX = useSharedValue(-30);
  const imageOpacity = useSharedValue(0);
  const imageTranslateX = useSharedValue(50);

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

  return (
    <SafeAreaView className="flex-1 bg-pinvocab-bg">
      <View className="flex-1">
        {/* Main Content - Image Right, Text Left */}
        <View className="flex-1 flex-row relative">
          {/* Text Content - Left Side */}
          <View className="flex-1 justify-center pl-8 pr-4 z-10" style={{ maxWidth: '65%' }}>
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
                  Step 2/3
                </Text>
              </View>
            </Animated.View>

            {/* Title */}
            <Animated.View style={[{ marginBottom: 8, flexShrink: 1 }, titleAnimatedStyle]}>
              <Text 
                className="text-pinvocab-text text-[30px] text-left leading-tight tracking-tight"
                style={{ flexShrink: 1, fontFamily: 'Roboto-Regular' }}
              >
                What's your English level?
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

            {/* Level Boxes */}
            <Animated.View style={boxesAnimatedStyle}>
              <View className="gap-3">
                {englishLevels.map((item, index) => {
                  const isSelected = selectedLevel === item.code;
                  return (
                    <TouchableOpacity
                      key={item.code}
                      onPress={() => {
                        setSelectedLevel(item.code);
                        // Navigate to next step after a short delay for better UX
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
                      <View className="flex-row items-center justify-between">
                        <Text 
                          className="text-lg tracking-wide"
                          style={{ 
                            color: isSelected ? '#DED9D1' : '#222220',
                            fontFamily: 'Roboto-Regular',
                          }}
                        >
                          {item.level}
                        </Text>
                        <Text 
                          className="text-base tracking-wide opacity-60"
                          style={{ 
                            color: isSelected ? '#DED9D1' : '#222220',
                            fontFamily: 'Roboto-Regular',
                          }}
                        >
                          ({item.code})
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          </View>

          {/* Image - Right Side (30% visible, 70% outside) */}
          <View 
            className="absolute right-0 top-0 bottom-0 justify-center items-end"
            style={{ 
              width: '100%',
              overflow: 'visible',
            }}
          >
            <Animated.View 
              style={[{ 
                width: '70%',
                height: '100%',
                marginRight: '-33%',
              }, imageAnimatedStyle]}
            >
              <Image
                source={require('@/assets/images/OnboardingStep2Man.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
