import TakeQuiz from '@/components/quick-actions/take-quiz/TakeQuiz';
import WordCollections from '@/components/quick-actions/word-collections/WordCollections';
import WordDetails from '@/components/word-details/WordDetails';
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

interface HomeProps {
  onLogout?: () => void;
  userName?: string;
}

// Mock data - will be replaced with real data later
const todayWord = {
  word: 'Serendipity',
  type: '(n.)',
  definition: 'The occurrence of pleasant things that are not expected.',
  pronunciation: '/ˌserənˈdipitē/',
  category: 'general', // Word's own category
  level: 'B1', // Word's own level (if general)
};

const recentWords = [
  { word: 'Eloquent', type: '(adj.)', definition: 'Fluent or persuasive in speaking or writing.' },
  { word: 'Beautiful', type: '(adj.)', definition: 'Pleasing to the senses or mind aesthetically.' },
  { word: 'Resilient', type: '(adj.)', definition: 'Able to recover quickly from difficulties.' },
];

const stats = {
  wordsLearned: 42,
  currentStreak: 7,
  quizzesSolved: 23,
};

// Category names mapping
const categoryNames: Record<string, string> = {
  general: 'General',
  daily: 'Daily Conversation',
  travel: 'Travel & Tourism',
  food: 'Food & Dining',
  business: 'Business English',
  academic: 'Academic Words',
  technology: 'Technology',
  medical: 'Medical Terms',
  legal: 'Legal Terms',
  literature: 'Literature & Arts',
  science: 'Science & Nature',
  phrasal: 'Phrasal Verbs',
  idioms: 'Idioms',
};

// English levels mapping
const englishLevels: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficient',
};


export default function Home({ onLogout, userName = 'Kaan' }: HomeProps) {
  const [timeRemaining, setTimeRemaining] = useState(3 * 60 * 60); // 3 hours in seconds
  const [showWordCollections, setShowWordCollections] = useState(false);
  const [showTakeQuiz, setShowTakeQuiz] = useState(false);
  const [showWordDetails, setShowWordDetails] = useState(false);
  const [userLevel, setUserLevel] = useState<string>('B1'); // Default level (Intermediate)
  const [selectedCategory, setSelectedCategory] = useState<string>('general'); // Default category
  
  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  const wordCardOpacity = useSharedValue(0);
  const wordCardTranslateY = useSharedValue(20);
  const statsOpacity = useSharedValue(0);
  const statsTranslateY = useSharedValue(20);
  const recentWordsOpacity = useSharedValue(0);
  const recentWordsTranslateY = useSharedValue(20);

  useEffect(() => {
    // Update timer every second
    const timerInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          return 3 * 60 * 60; // Reset to 3 hours when it reaches 0
        }
        return prev - 1;
      });
    }, 1000);

    // Header animation - starts first
    headerOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    headerTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // Word card animation - starts after 200ms
    setTimeout(() => {
      wordCardOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      wordCardTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 200);

    // Stats animation - starts after 400ms
    setTimeout(() => {
      statsOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      statsTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 400);

    // Recent words animation - starts after 600ms
    setTimeout(() => {
      recentWordsOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
      recentWordsTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 600);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const wordCardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: wordCardOpacity.value,
    transform: [{ translateY: wordCardTranslateY.value }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
    transform: [{ translateY: statsTranslateY.value }],
  }));

  const recentWordsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: recentWordsOpacity.value,
    transform: [{ translateY: recentWordsTranslateY.value }],
  }));

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-pinvocab-bg">
      <View className="flex-1">
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
        {/* Header */}
        <Animated.View style={headerAnimatedStyle}>
          <View className="flex-row items-center justify-between px-8 pt-4 pb-6">
            <View>
              <Text 
                className="text-pinvocab-text text-2xl tracking-tight"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                Welcome {userName}!
              </Text>
              {/* Plan Section */}
              <View className="flex-row items-center gap-2 mt-1">
                <Text 
                  className="text-pinvocab-text text-xs opacity-60"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  Free Plan
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    // TODO: Navigate to upgrade
                    console.log('Upgrade');
                  }}
                >
                  <Text 
                    className="text-pinvocab-text text-xs opacity-70"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Upgrade
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Navigate to settings
                  console.log('Settings');
                }}
              >
                <Ionicons 
                  name="settings-outline" 
                  size={24} 
                  color="#222220" 
                  style={{ opacity: 0.7 }}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Navigate to profile
                  console.log('Profile');
                }}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: 'rgba(34, 34, 32, 0.1)' }}
                >
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color="#222220" 
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <View className="px-8">
          {/* Current Word Card */}
          <Animated.View style={wordCardAnimatedStyle}>
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text 
                  className="text-pinvocab-text text-sm opacity-70"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Current Word
                </Text>
                <Text 
                  className="text-pinvocab-text text-xs opacity-60"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  {formatTimer(timeRemaining)}
                </Text>
              </View>
              <View 
                className="px-6 py-6 rounded-sm"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.75)' }}
              >
                {/* Category Badge */}
                <View className="flex-row items-center mb-2">
                  <View 
                    className="px-1.5 py-0.5 rounded-sm self-start"
                    style={{ backgroundColor: 'rgba(222, 217, 209, 0.15)' }}
                  >
                    <Text 
                      className="text-pinvocab-bg"
                      style={{ fontFamily: 'Roboto-Medium', opacity: 0.8, fontSize: 10 }}
                    >
                      {todayWord.category === 'general' 
                        ? `${categoryNames[todayWord.category]} (${englishLevels[todayWord.level] || todayWord.level})`
                        : categoryNames[todayWord.category] || 'General'
                      }
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row items-baseline justify-between mb-3">
                  <View className="flex-row items-baseline flex-1">
                    <Text 
                      className="text-pinvocab-bg text-3xl tracking-tight mr-3"
                      style={{ fontFamily: 'Roboto-Bold' }}
                    >
                      {todayWord.word}
                    </Text>
                    <Text 
                      className="text-pinvocab-bg text-sm opacity-70"
                      style={{ fontFamily: 'Roboto-Regular' }}
                    >
                      {todayWord.type}
                    </Text>
                  </View>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Ionicons 
                      name="volume-high" 
                      size={22} 
                      color="#DED9D1" 
                      style={{ opacity: 0.9 }}
                    />
                  </TouchableOpacity>
                </View>
                
                <Text 
                  className="text-pinvocab-bg text-xs opacity-60 mb-3"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  {todayWord.pronunciation}
                </Text>
                
                <Text 
                  className="text-pinvocab-bg text-base leading-relaxed opacity-90"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  {todayWord.definition}
                </Text>

                {/* See More Details Button */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-row items-center self-end mt-3"
                  onPress={() => {
                    setShowWordDetails(true);
                  }}
                >
                  <Text 
                    className="text-pinvocab-bg text-xs opacity-70 mr-1"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    See More Details
                  </Text>
                  <Ionicons 
                    name="chevron-forward-outline" 
                    size={14} 
                    color="#DED9D1" 
                    style={{ opacity: 0.7 }} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* Selected Category Badge */}
          <Animated.View style={wordCardAnimatedStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowWordCollections(true)}
              className="mb-6 px-4 py-3 rounded-sm flex-row items-center justify-between"
              style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
            >
              <View className="flex-row items-center flex-1">
                <Ionicons 
                  name="library-outline" 
                  size={18} 
                  color="#222220" 
                  style={{ opacity: 0.7, marginRight: 10 }}
                />
                <View className="flex-1">
                  <Text 
                    className="text-pinvocab-text text-xs opacity-60 mb-0.5"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    Learning from
                  </Text>
                  <Text 
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    {selectedCategory === 'general' 
                      ? `${categoryNames[selectedCategory]} (${englishLevels[userLevel] || userLevel})`
                      : categoryNames[selectedCategory] || 'General'
                    }
                  </Text>
                </View>
              </View>
              <Ionicons 
                name="chevron-forward-outline" 
                size={18} 
                color="#222220" 
                style={{ opacity: 0.5 }}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View style={[{ marginBottom: 24 }, statsAnimatedStyle]}>
            <Text 
              className="text-pinvocab-text text-sm mb-3 opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Your Progress
            </Text>
            <View className="flex-row gap-3">
              {/* Words Learned */}
              <View 
                className="flex-1 px-4 py-4 rounded-sm"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
              >
                <View className="flex-row items-center mb-1">
                  <Ionicons 
                    name="book-outline" 
                    size={20} 
                    color="#222220" 
                    style={{ opacity: 0.8, marginRight: 4 }}
                  />
                  <Text 
                    className="text-pinvocab-text text-2xl"
                    style={{ fontFamily: 'Roboto-Bold' }}
                  >
                    {stats.wordsLearned}
                  </Text>
                </View>
                <Text 
                  className="text-pinvocab-text text-xs opacity-60"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  Words Learned
                </Text>
              </View>

              {/* Streak */}
              <View 
                className="flex-1 px-4 py-4 rounded-sm"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
              >
                <View className="flex-row items-center mb-1">
                  <Ionicons 
                    name="flame" 
                    size={20} 
                    color="#222220" 
                    style={{ opacity: 0.8, marginRight: 4 }}
                  />
                  <Text 
                    className="text-pinvocab-text text-2xl"
                    style={{ fontFamily: 'Roboto-Bold' }}
                  >
                    {stats.currentStreak}
                  </Text>
                </View>
                <Text 
                  className="text-pinvocab-text text-xs opacity-60"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  Day Streak
                </Text>
              </View>

              {/* Quizzes Solved */}
              <View 
                className="flex-1 px-4 py-4 rounded-sm"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
              >
                <View className="flex-row items-center mb-1">
                  <Ionicons 
                    name="document-text-outline" 
                    size={20} 
                    color="#222220" 
                    style={{ opacity: 0.8, marginRight: 4 }}
                  />
                  <Text 
                    className="text-pinvocab-text text-2xl"
                    style={{ fontFamily: 'Roboto-Bold' }}
                  >
                    {stats.quizzesSolved}
                  </Text>
                </View>
                <Text 
                  className="text-pinvocab-text text-xs opacity-60"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  Quiz Solved
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View style={[{ marginBottom: 24 }, statsAnimatedStyle]}>
            <Text 
              className="text-pinvocab-text text-sm mb-3 opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Quick Actions
            </Text>
            <View className="gap-3">
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-full px-4 py-4 rounded-sm flex-row items-center justify-center"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                onPress={() => {
                  setShowTakeQuiz(true);
                }}
              >
                <Ionicons 
                  name="help-circle-outline" 
                  size={20} 
                  color="#222220" 
                  style={{ opacity: 0.7, marginRight: 8 }}
                />
                <Text 
                  className="text-pinvocab-text text-sm"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Take A Quiz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-full px-4 py-4 rounded-sm flex-row items-center justify-center"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                onPress={() => {
                  setShowWordCollections(true);
                }}
              >
                <Ionicons 
                  name="library-outline" 
                  size={20} 
                  color="#222220" 
                  style={{ opacity: 0.7, marginRight: 8 }}
                />
                <Text 
                  className="text-pinvocab-text text-sm"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Word Collections
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

        </View>
      </ScrollView>

      {/* Recent Words - Fixed at bottom */}
      <View className="px-8 pb-8 pt-4" style={{ borderTopWidth: 1, borderTopColor: 'rgba(34, 34, 32, 0.1)' }}>
        <Animated.View style={recentWordsAnimatedStyle}>
          <View className="flex-row items-center justify-between mb-3">
            <Text 
              className="text-pinvocab-text text-sm opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Recent Words
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text 
                className="text-pinvocab-text text-xs opacity-60"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          <View className="gap-3">
            {recentWords.slice(0, 1).map((word, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                className="px-4 py-4 rounded-sm"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                onPress={() => {
                  // TODO: View word details
                  console.log('Word details:', word.word);
                }}
              >
                <View className="flex-row items-baseline justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-baseline mb-1">
                      <Text 
                        className="text-pinvocab-text text-lg mr-2"
                        style={{ fontFamily: 'Roboto-Bold' }}
                      >
                        {word.word}
                      </Text>
                      <Text 
                        className="text-pinvocab-text text-xs opacity-60"
                        style={{ fontFamily: 'Roboto-Regular' }}
                      >
                        {word.type}
                      </Text>
                    </View>
                    <Text 
                      className="text-pinvocab-text text-sm opacity-70"
                      style={{ fontFamily: 'Roboto-Regular' }}
                      numberOfLines={1}
                    >
                      {word.definition}
                    </Text>
                  </View>
                  <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color="#222220" 
                    style={{ opacity: 0.3, marginLeft: 8 }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
      </View>

      {/* Word Collections Modal */}
      <WordCollections
        visible={showWordCollections}
        onClose={() => setShowWordCollections(false)}
        initialLevel={userLevel}
        initialCategory={selectedCategory}
        onCategorySelect={(categoryId, level) => {
          setSelectedCategory(categoryId);
          if (level !== undefined) {
            setUserLevel(level || 'B1');
          }
        }}
      />

      {/* Take Quiz Modal */}
      <TakeQuiz
        visible={showTakeQuiz}
        onClose={() => setShowTakeQuiz(false)}
        selectedCategory={selectedCategory}
        userLevel={userLevel}
        onStartQuiz={(quizType, category) => {
          console.log('Starting quiz:', { quizType, category });
          // TODO: Navigate to quiz screen
        }}
      />

      {/* Word Details Modal */}
      <WordDetails
        visible={showWordDetails}
        onClose={() => setShowWordDetails(false)}
        word={todayWord}
      />
    </SafeAreaView>
  );
}
