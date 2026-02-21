import { Ionicons } from '@expo/vector-icons';
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

interface OnboardingStep1Props {
  onContinue?: () => void;
}

const exampleCards = [
  {
    word: 'Beautiful',
    type: '(adj.)',
    definition: 'Pleasing to the senses or mind aesthetically.',
  },
  {
    word: 'Serendipity',
    type: '(n.)',
    definition: 'The occurrence of pleasant things that are not expected.',
  },
  {
    word: 'Eloquent',
    type: '(adj.)',
    definition: 'Fluent or persuasive in speaking or writing.',
  },
];

export default function OnboardingStep1({ onContinue }: OnboardingStep1Props) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleTranslateX = useSharedValue(-30);
  const textOpacity = useSharedValue(0);
  const textTranslateX = useSharedValue(-30);
  const imageOpacity = useSharedValue(0);
  const imageTranslateY = useSharedValue(-20);
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(30);
  
  // Icon animation values
  const icon1Opacity = useSharedValue(0);
  const icon1Scale = useSharedValue(0.5);
  const icon2Opacity = useSharedValue(0);
  const icon2Scale = useSharedValue(0.5);
  const icon3Opacity = useSharedValue(0);
  const icon3Scale = useSharedValue(0.5);
  const icon4Opacity = useSharedValue(0);
  const icon4Scale = useSharedValue(0.5);
  const icon5Opacity = useSharedValue(0);
  const icon5Scale = useSharedValue(0.5);
  const icon6Opacity = useSharedValue(0);
  const icon6Scale = useSharedValue(0.5);
  const icon7Opacity = useSharedValue(0);
  const icon7Scale = useSharedValue(0.5);
  const icon8Opacity = useSharedValue(0);
  const icon8Scale = useSharedValue(0.5);

  useEffect(() => {
    // Image animation - starts first
    imageOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    imageTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // Title animation - starts after 200ms
    setTimeout(() => {
      titleOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      titleTranslateX.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 200);

    // Text animation - starts after 400ms
    setTimeout(() => {
      textOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      textTranslateX.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 400);

    // Card animation - starts after 600ms
    setTimeout(() => {
      cardOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      cardTranslateX.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 600);

    // Button animation - starts after 800ms
    setTimeout(() => {
      buttonOpacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      buttonTranslateY.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
    }, 800);

    // Icons animation - starts after 1000ms (en son)
    setTimeout(() => {
      // Icon 1 (book-outline) - left top
      icon1Opacity.value = withTiming(0.12, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      icon1Scale.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      });
    }, 1000);

    setTimeout(() => {
      // Icon 2 (language-outline) - left middle
      icon2Opacity.value = withTiming(0.10, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      icon2Scale.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      });
    }, 1100);

    setTimeout(() => {
      // Icon 3 (library-outline) - left bottom
      icon3Opacity.value = withTiming(0.11, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      icon3Scale.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      });
    }, 1200);

    setTimeout(() => {
      // Icon 4 (bookmark-outline) - right top
      icon4Opacity.value = withTiming(0.10, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      icon4Scale.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      });
    }, 1300);

    setTimeout(() => {
      // Icon 5 (bulb-outline) - right middle
      icon5Opacity.value = withTiming(0.12, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      icon5Scale.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      });
    }, 1400);

    setTimeout(() => {
      // Icon 6 (school-outline) - right bottom
      icon6Opacity.value = withTiming(0.11, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      icon6Scale.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      });
    }, 1500);

    setTimeout(() => {
      // Icon 7 (lock-closed) - top left
      icon7Opacity.value = withTiming(0.12, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      icon7Scale.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      });
    }, 1600);

    setTimeout(() => {
      // Icon 8 (pin) - top right
      icon8Opacity.value = withTiming(0.10, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      icon8Scale.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      });
    }, 1700);

    // Auto-rotate cards every 3 seconds
    const cardInterval = setInterval(() => {
      // Animate out current card
      cardOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
      cardTranslateX.value = withTiming(-20, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
      
      // Change card and animate in after fade out
      setTimeout(() => {
        setCurrentCardIndex((prev) => (prev + 1) % exampleCards.length);
        cardTranslateX.value = 20;
        cardOpacity.value = withTiming(1, {
          duration: 400,
          easing: Easing.out(Easing.ease),
        });
        cardTranslateX.value = withTiming(0, {
          duration: 400,
          easing: Easing.out(Easing.ease),
        });
      }, 300);
    }, 3000);

    return () => clearInterval(cardInterval);

  }, []);

  // Animated styles
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateX: titleTranslateX.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateX: textTranslateX.value }],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
      transform: [{ translateY: imageTranslateY.value }],
    };
  });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  // Icon animated styles
  const icon1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon1Opacity.value,
    transform: [{ scale: icon1Scale.value }],
  }));

  const icon2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon2Opacity.value,
    transform: [{ scale: icon2Scale.value }],
  }));

  const icon3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon3Opacity.value,
    transform: [{ scale: icon3Scale.value }],
  }));

  const icon4AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon4Opacity.value,
    transform: [{ scale: icon4Scale.value }],
  }));

  const icon5AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon5Opacity.value,
    transform: [{ scale: icon5Scale.value }],
  }));

  const icon6AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon6Opacity.value,
    transform: [{ scale: icon6Scale.value }],
  }));

  const icon7AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon7Opacity.value,
    transform: [{ scale: icon7Scale.value }],
  }));

  const icon8AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon8Opacity.value,
    transform: [{ scale: icon8Scale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-pinvocab-bg">
      <View className="flex-1">
        {/* Image - Top Center */}
        <View className="items-center justify-center pt-8 pb-6">
          <View style={{ position: 'relative', width: '75%', maxWidth: 360, aspectRatio: 1 }}>
            <Animated.View 
              style={[{ 
                width: '100%',
                height: '100%',
              }, imageAnimatedStyle]}
            >
              <Image
                source={require('@/assets/images/OnboardingStep1Man.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </Animated.View>
            
            {/* Decorative Icons Around Image */}
            {/* Top Icons */}
            <Animated.View 
              style={[
                { 
                  position: 'absolute', 
                  left: '15%', 
                  top: -20,
                },
                icon7AnimatedStyle
              ]}
            >
              <Ionicons 
                name="lock-closed-outline" 
                size={26} 
                color="#222220" 
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                { 
                  position: 'absolute', 
                  right: '15%', 
                  top: -18,
                },
                icon8AnimatedStyle
              ]}
            >
              <Ionicons 
                name="pin-outline" 
                size={24} 
                color="#222220" 
              />
            </Animated.View>
            
            {/* Left Side Icons */}
            <Animated.View 
              style={[
                { 
                  position: 'absolute', 
                  left: -20, 
                  top: '15%',
                },
                icon1AnimatedStyle
              ]}
            >
              <Ionicons 
                name="book-outline" 
                size={28} 
                color="#222220" 
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                { 
                  position: 'absolute', 
                  left: -18, 
                  top: '45%',
                },
                icon2AnimatedStyle
              ]}
            >
              <Ionicons 
                name="language-outline" 
                size={24} 
                color="#222220" 
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                { 
                  position: 'absolute', 
                  left: -20, 
                  top: '75%',
                },
                icon3AnimatedStyle
              ]}
            >
              <Ionicons 
                name="library-outline" 
                size={26} 
                color="#222220" 
              />
            </Animated.View>
            
            {/* Right Side Icons */}
            <Animated.View 
              style={[
                { 
                  position: 'absolute', 
                  right: -18, 
                  top: '20%',
                },
                icon4AnimatedStyle
              ]}
            >
              <Ionicons 
                name="bookmark-outline" 
                size={24} 
                color="#222220" 
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                { 
                  position: 'absolute', 
                  right: -20, 
                  top: '50%',
                },
                icon5AnimatedStyle
              ]}
            >
              <Ionicons 
                name="bulb-outline" 
                size={28} 
                color="#222220" 
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                { 
                  position: 'absolute', 
                  right: -18, 
                  top: '78%',
                },
                icon6AnimatedStyle
              ]}
            >
              <Ionicons 
                name="school-outline" 
                size={26} 
                color="#222220" 
              />
            </Animated.View>
          </View>
        </View>

        {/* Text Content - Below Image, Left Aligned */}
        <View className="flex-1 px-8">
          {/* Welcome Title */}
          <Animated.View style={[{ marginBottom: 18 }, titleAnimatedStyle]}>
            <Text 
              className="text-pinvocab-text text-3xl text-left leading-tight tracking-tight"
              style={{ fontFamily: 'Roboto-Bold' }}
            >
              Welcome to{' '}
              <Text 
                className="text-3xl tracking-tighter"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                PinVocab.
              </Text>
            </Text>
          </Animated.View>

          {/* Description Text */}
          <Animated.View style={[{ marginBottom: 16 }, textAnimatedStyle]}>
            <Text 
              className="text-pinvocab-text text-lg text-left leading-relaxed opacity-80"
              style={{ fontFamily: 'Roboto-Regular' }}
            >
              PinVocab helps you learn English words by{' '}
              <Text 
                className="text-pinvocab-text text-lg leading-relaxed"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                pinning them to your phone's lock screen.
              </Text>
            </Text>
          </Animated.View>
          <Animated.View style={textAnimatedStyle}>
            <Text 
              className="text-pinvocab-text text-lg text-left leading-relaxed opacity-80"
              style={{ fontFamily: 'Roboto-Regular' }}
            >
              Every time you unlock your device,{' '}
              <Text 
                className="text-pinvocab-text text-lg leading-relaxed"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                discover a new word
              </Text>
              {' '}and expand your vocabulary effortlessly.
            </Text>
          </Animated.View>

          {/* Example Cards */}
          <Animated.View style={[{ marginTop: 24, alignSelf: 'center', minWidth: 320, maxWidth: '90%' }, cardAnimatedStyle]}>
            <View 
              className="px-6 py-5 rounded-sm"
              style={{ backgroundColor: 'rgba(34, 34, 32, 0.75)', height: 140 }}
            >
              {/* Word and Type */}
              <View className="flex-row items-baseline justify-between mb-3">
                <View className="flex-row items-baseline flex-1">
                  <Text 
                    className="text-pinvocab-bg text-2xl tracking-tight mr-3"
                    style={{ fontFamily: 'Roboto-Bold' }}
                  >
                    {exampleCards[currentCardIndex].word}
                  </Text>
                  <Text 
                    className="text-pinvocab-bg text-sm opacity-70"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    {exampleCards[currentCardIndex].type}
                  </Text>
                </View>
                <Ionicons 
                  name="volume-high" 
                  size={20} 
                  color="#DED9D1" 
                  style={{ opacity: 0.8 }}
                />
              </View>
              
              {/* Definition */}
              <Text 
                className="text-pinvocab-bg text-base leading-relaxed opacity-90"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                {exampleCards[currentCardIndex].definition}
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Continue Button - Bottom Right */}
        <View className="pb-8 pr-8 items-end">
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              onPress={onContinue}
              className="px-8 py-3 bg-pinvocab-text rounded-sm shadow-md"
              activeOpacity={0.8}
            >
              <Text 
                className="text-pinvocab-bg text-base tracking-wide"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}
