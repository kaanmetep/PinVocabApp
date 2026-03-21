import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UpgradeProps {
  onClose?: () => void;
  onUpgradeSuccess?: () => void;
}

export default function Upgrade({ onClose, onUpgradeSuccess }: UpgradeProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(-20);
  const plansOpacity = useSharedValue(0);
  const plansTranslateY = useSharedValue(20);
  const featuresOpacity = useSharedValue(0);
  const featuresTranslateY = useSharedValue(20);

  useEffect(() => {
    // Header animation - starts first
    headerOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    headerTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // Title animation - starts after 200ms
    setTimeout(() => {
      titleOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      titleTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 200);

    // Plans animation - starts after 400ms
    setTimeout(() => {
      plansOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      plansTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 400);

    // Features animation - starts after 600ms
    setTimeout(() => {
      featuresOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      featuresTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 600);
  }, []);

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const plansAnimatedStyle = useAnimatedStyle(() => ({
    opacity: plansOpacity.value,
    transform: [{ translateY: plansTranslateY.value }],
  }));

  const featuresAnimatedStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
    transform: [{ translateY: featuresTranslateY.value }],
  }));

  const handleUpgrade = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onUpgradeSuccess?.();
    }, 1500);
  };

  const premiumFeatures = [
    {
      icon: 'infinite-outline',
      title: 'Unlimited Words',
      description: 'Access to all word collections and categories',
    },
    {
      icon: 'flash-outline',
      title: 'Advanced Quizzes',
      description: 'Unlimited quizzes with detailed progress tracking',
    },
    {
      icon: 'stats-chart-outline',
      title: 'Detailed Analytics',
      description: 'Track your learning progress with comprehensive insights',
    },
    {
      icon: 'book-outline',
      title: 'All Categories',
      description: 'Unlock all specialized categories including Business, Medical, Legal, and more',
    },
    {
      icon: 'time-outline',
      title: 'Custom Word Frequency',
      description: 'Set your own word notification frequency',
    },
    {
      icon: 'cloud-download-outline',
      title: 'Offline Access',
      description: 'Download words and study offline',
    },
    {
      icon: 'star-outline',
      title: 'Priority Support',
      description: 'Get priority customer support',
    },
    {
      icon: 'remove-circle-outline',
      title: 'Ad-Free Experience',
      description: 'Enjoy learning without interruptions',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-pinvocab-bg">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <Animated.View style={headerAnimatedStyle}>
          <View className="flex-row items-center justify-between px-8 pt-4 pb-6">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              className="flex-row items-center"
            >
              <Ionicons 
                name="arrow-back-outline" 
                size={24} 
                color="#222220" 
                style={{ opacity: 0.7, marginRight: 8 }}
              />
              <Text 
                className="text-pinvocab-text text-base"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View className="px-8">
          {/* Title Section */}
          <Animated.View style={titleAnimatedStyle}>
            <View className="mb-8">
              <Text 
                className="text-pinvocab-text text-4xl text-left leading-tight tracking-tight mb-3"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                Upgrade to Premium
              </Text>
              <Text 
                className="text-pinvocab-text text-lg text-left leading-relaxed opacity-70"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Unlock all features and accelerate your vocabulary learning
              </Text>
            </View>
          </Animated.View>

          {/* Plan Selection */}
          <Animated.View style={plansAnimatedStyle}>
            <View className="mb-2">
              <Text 
                className="text-pinvocab-text text-sm mb-4 opacity-70"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                Choose Your Plan
              </Text>
              
              <View className="mb-6">
                {/* Monthly Plan */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedPlan('monthly')}
                  className="mb-3"
                >
                  <View 
                    className="px-4 py-5 rounded-sm"
                    style={{ 
                      backgroundColor: selectedPlan === 'monthly' 
                        ? 'rgba(34, 34, 32, 0.75)' 
                        : 'rgba(34, 34, 32, 0.05)',
                      borderWidth: selectedPlan === 'monthly' ? 2 : 1,
                      borderColor: selectedPlan === 'monthly' 
                        ? '#222220' 
                        : 'rgba(34, 34, 32, 0.15)',
                    }}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <View className="flex-row items-center mb-2">
                          <Ionicons 
                            name="calendar-outline" 
                            size={20} 
                            color={selectedPlan === 'monthly' ? '#DED9D1' : '#222220'} 
                            style={{ opacity: selectedPlan === 'monthly' ? 0.9 : 0.7, marginRight: 8 }}
                          />
                          <Text 
                            className={selectedPlan === 'monthly' ? 'text-pinvocab-bg' : 'text-pinvocab-text'}
                            style={{ 
                              fontFamily: 'Roboto-Medium',
                              fontSize: 14,
                            }}
                          >
                            Monthly Plan
                          </Text>
                        </View>
                        <View className="flex-row items-baseline mb-1">
                          <Text 
                            className={selectedPlan === 'monthly' ? 'text-pinvocab-bg' : 'text-pinvocab-text'}
                            style={{ 
                              fontFamily: 'Roboto-Bold',
                              fontSize: 24,
                              marginRight: 4,
                            }}
                          >
                            $2.99
                          </Text>
                          <Text 
                            className={selectedPlan === 'monthly' ? 'text-pinvocab-bg opacity-80' : 'text-pinvocab-text opacity-60'}
                            style={{ 
                              fontFamily: 'Roboto-Regular',
                              fontSize: 14,
                            }}
                          >
                            /month
                          </Text>
                        </View>
                        <Text 
                          className={selectedPlan === 'monthly' ? 'text-pinvocab-bg opacity-70' : 'text-pinvocab-text opacity-50'}
                          style={{ 
                            fontFamily: 'Roboto-Regular',
                            fontSize: 11,
                          }}
                        >
                          Billed monthly
                        </Text>
                      </View>
                      {selectedPlan === 'monthly' && (
                        <View 
                          className="px-2.5 py-1.5 rounded-sm ml-3"
                          style={{ backgroundColor: 'rgba(222, 217, 209, 0.2)' }}
                        >
                          <Ionicons 
                            name="checkmark-circle" 
                            size={18} 
                            color="#DED9D1" 
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Yearly Plan */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedPlan('yearly')}
                >
                  <View 
                    className="px-4 py-5 rounded-sm relative"
                    style={{ 
                      backgroundColor: selectedPlan === 'yearly' 
                        ? 'rgba(34, 34, 32, 0.75)' 
                        : 'rgba(34, 34, 32, 0.05)',
                      borderWidth: selectedPlan === 'yearly' ? 2 : 1,
                      borderColor: selectedPlan === 'yearly' 
                        ? '#222220' 
                        : 'rgba(34, 34, 32, 0.15)',
                    }}
                  >
                    {/* Popular Badge */}
                    <View 
                      className="absolute -top-2 right-2 px-2.5 py-1 rounded-sm flex-row items-center"
                      style={{ backgroundColor: '#222220' }}
                    >
                      <Ionicons 
                        name="star" 
                        size={10} 
                        color="#DED9D1" 
                        style={{ marginRight: 4 }}
                      />
                      <Text 
                        className="text-pinvocab-bg"
                        style={{ 
                          fontFamily: 'Roboto-Medium',
                          fontSize: 9,
                        }}
                      >
                        Best Value
                      </Text>
                    </View>
                    
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <View className="flex-row items-center mb-2">
                          <Ionicons 
                            name="trophy-outline" 
                            size={20} 
                            color={selectedPlan === 'yearly' ? '#DED9D1' : '#222220'} 
                            style={{ opacity: selectedPlan === 'yearly' ? 0.9 : 0.7, marginRight: 8 }}
                          />
                          <Text 
                            className={selectedPlan === 'yearly' ? 'text-pinvocab-bg' : 'text-pinvocab-text'}
                            style={{ 
                              fontFamily: 'Roboto-Medium',
                              fontSize: 14,
                            }}
                          >
                            Yearly Plan
                          </Text>
                        </View>
                        <View className="flex-row items-baseline mb-1">
                          <Text 
                            className={selectedPlan === 'yearly' ? 'text-pinvocab-bg' : 'text-pinvocab-text'}
                            style={{ 
                              fontFamily: 'Roboto-Bold',
                              fontSize: 24,
                              marginRight: 4,
                            }}
                          >
                            $16.99
                          </Text>
                          <Text 
                            className={selectedPlan === 'yearly' ? 'text-pinvocab-bg opacity-80' : 'text-pinvocab-text opacity-60'}
                            style={{ 
                              fontFamily: 'Roboto-Regular',
                              fontSize: 14,
                            }}
                          >
                            /year
                          </Text>
                        </View>
                        <View className="flex-row items-center mb-1">
                          <Text 
                            className={selectedPlan === 'yearly' ? 'text-pinvocab-bg opacity-70' : 'text-pinvocab-text opacity-50'}
                            style={{ 
                              fontFamily: 'Roboto-Regular',
                              fontSize: 11,
                              marginRight: 6,
                            }}
                          >
                            Just $1.42/month
                          </Text>
                          <View 
                            className="px-1.5 py-0.5 rounded-sm"
                            style={{ backgroundColor: selectedPlan === 'yearly' ? 'rgba(222, 217, 209, 0.15)' : 'rgba(34, 34, 32, 0.1)' }}
                          >
                            <Text 
                              className={selectedPlan === 'yearly' ? 'text-pinvocab-bg' : 'text-pinvocab-text'}
                              style={{ 
                                fontFamily: 'Roboto-Medium',
                                fontSize: 9,
                              }}
                            >
                              Save $18.89
                            </Text>
                          </View>
                        </View>
                        <Text 
                          className={selectedPlan === 'yearly' ? 'text-pinvocab-bg opacity-60' : 'text-pinvocab-text opacity-40'}
                          style={{ 
                            fontFamily: 'Roboto-Regular',
                            fontSize: 10,
                          }}
                        >
                          Billed annually
                        </Text>
                      </View>
                      {selectedPlan === 'yearly' && (
                        <View 
                          className="px-2.5 py-1.5 rounded-sm ml-3"
                          style={{ backgroundColor: 'rgba(222, 217, 209, 0.2)' }}
                        >
                          <Ionicons 
                            name="checkmark-circle" 
                            size={18} 
                            color="#DED9D1" 
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* Upgrade Button */}
          <Animated.View style={plansAnimatedStyle}>
            <TouchableOpacity
              onPress={handleUpgrade}
              disabled={isLoading}
              className="px-8 py-4 rounded-sm shadow-md items-center justify-center mb-4"
              style={{ 
                backgroundColor: '#222220',
              }}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <Text 
                  className="text-pinvocab-bg text-base tracking-wide"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Processing...
                </Text>
              ) : (
                <Text 
                  className="text-pinvocab-bg text-base tracking-wide"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Upgrade Now
                </Text>
              )}
            </TouchableOpacity>

            {/* Terms */}
            <View className="items-center mb-6">
              <View className="flex-row flex-wrap justify-center items-center">
                <Text 
                  className="text-pinvocab-text text-xs opacity-50 text-center"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  By upgrading, you agree to our{' '}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    // TODO: Navigate to Terms of Service
                    console.log('Terms of Service');
                  }}
                >
                  <Text 
                    className="text-pinvocab-text text-xs opacity-50 text-center"
                    style={{ 
                      fontFamily: 'Roboto-Regular',
                      textDecorationLine: 'underline',
                    }}
                  >
                    Terms of Service
                  </Text>
                </TouchableOpacity>
                <Text 
                  className="text-pinvocab-text text-xs opacity-50 text-center"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  {' '}and{' '}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    // TODO: Navigate to Privacy Policy
                    console.log('Privacy Policy');
                  }}
                >
                  <Text 
                    className="text-pinvocab-text text-xs opacity-50 text-center"
                    style={{ 
                      fontFamily: 'Roboto-Regular',
                      textDecorationLine: 'underline',
                    }}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
                <Text 
                  className="text-pinvocab-text text-xs opacity-50 text-center"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  .
                </Text>
              </View>
              <Text 
                className="text-pinvocab-text text-xs opacity-50 text-center mt-1"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Cancel anytime from your account settings.
              </Text>
            </View>
          </Animated.View>

          {/* Premium Features */}
          <Animated.View style={featuresAnimatedStyle}>
            <Text 
              className="text-pinvocab-text text-sm mb-4 opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Premium Advantages
            </Text>
            
            <View className="flex-row flex-wrap mb-6" style={{ gap: 12 }}>
              {premiumFeatures.map((feature, index) => (
                <View
                  key={index}
                  className="px-4 py-4 rounded-sm"
                  style={{ 
                    backgroundColor: 'rgba(34, 34, 32, 0.05)',
                    flex: 1,
                    minWidth: '48%',
                    maxWidth: '48%',
                  }}
                >
                  <View 
                    className="w-10 h-10 rounded-sm items-center justify-center mb-3"
                    style={{ backgroundColor: 'rgba(34, 34, 32, 0.1)' }}
                  >
                    <Ionicons 
                      name={feature.icon as any} 
                      size={20} 
                      color="#222220" 
                      style={{ opacity: 0.8 }}
                    />
                  </View>
                  <Text 
                    className="text-pinvocab-text text-sm mb-1"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    {feature.title}
                  </Text>
                  <Text 
                    className="text-pinvocab-text text-xs opacity-60"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    {feature.description}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
