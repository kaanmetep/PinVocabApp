import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TakeQuizProps {
  visible: boolean;
  onClose: () => void;
  selectedCategory?: string;
  userLevel?: string;
  onStartQuiz?: (quizType: 'learned' | 'all', category: string) => void;
}

// All categories
const allCategories = [
  { id: 'general', name: 'General', icon: 'language-outline' },
  { id: 'daily', name: 'Daily Conversation', icon: 'chatbubbles-outline' },
  { id: 'travel', name: 'Travel & Tourism', icon: 'airplane-outline' },
  { id: 'food', name: 'Food & Dining', icon: 'restaurant-outline' },
  { id: 'business', name: 'Business English', icon: 'briefcase-outline' },
  { id: 'academic', name: 'Academic Words', icon: 'school-outline' },
  { id: 'technology', name: 'Technology', icon: 'hardware-chip-outline' },
  { id: 'medical', name: 'Medical Terms', icon: 'medical-outline' },
  { id: 'legal', name: 'Legal Terms', icon: 'document-text-outline' },
  { id: 'literature', name: 'Literature & Arts', icon: 'library-outline' },
  { id: 'science', name: 'Science & Nature', icon: 'flask-outline' },
  { id: 'phrasal', name: 'Phrasal Verbs', icon: 'arrow-forward-outline' },
  { id: 'idioms', name: 'Idioms', icon: 'bulb-outline' },
];

// English levels from OnboardingStep2
const englishLevels = [
  { level: 'Beginner', code: 'A1' },
  { level: 'Elementary', code: 'A2' },
  { level: 'Intermediate', code: 'B1' },
  { level: 'Upper Intermediate', code: 'B2' },
  { level: 'Advanced', code: 'C1' },
  { level: 'Proficient', code: 'C2' },
];

// General category word counts by level
const generalCountsByLevel: Record<string, number> = {
  A1: 450,
  A2: 550,
  B1: 600,
  B2: 700,
  C1: 800,
  C2: 900,
};

export default function TakeQuiz({
  visible,
  onClose,
  selectedCategory = 'general',
  userLevel = 'B1',
  onStartQuiz,
}: TakeQuizProps) {
  // Static check: if user has seen at least 10 words (will be dynamic later)
  const hasSeenEnoughWords = false; // TODO: Replace with actual logic
  
  const [step, setStep] = useState<1 | 2>(1);
  const [quizType, setQuizType] = useState<'learned' | 'all' | null>(
    hasSeenEnoughWords ? 'learned' : 'all'
  );
  const [category, setCategory] = useState<string>(selectedCategory);
  const [currentLevel, setCurrentLevel] = useState<string | null>(selectedCategory === 'general' ? userLevel : null);
  const [showLevelSelection, setShowLevelSelection] = useState(false);

  const handleNext = () => {
    if (step === 1 && quizType) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onClose();
    }
  };

  const handleStartQuiz = () => {
    if (quizType && onStartQuiz) {
      onStartQuiz(quizType, category);
    }
    // TODO: Navigate to quiz screen
    console.log('Starting quiz:', { quizType, category });
  };

  const getCategoryDisplayName = (catId: string) => {
    const cat = allCategories.find(c => c.id === catId);
    if (catId === 'general') {
      if (currentLevel) {
        const levelName = englishLevels.find(l => l.code === currentLevel)?.level || currentLevel;
        return `${cat?.name || 'General'} (${levelName})`;
      }
      return cat?.name || 'General';
    }
    return cat?.name || 'General';
  };

  const handleCategorySelect = (catId: string) => {
    if (catId === 'general') {
      // Show level selection for General
      setShowLevelSelection(true);
    } else {
      // Reset level to null when selecting non-general category
      setCurrentLevel(null);
      setCategory(catId);
    }
  };

  const handleLevelSelect = (levelCode: string) => {
    setCurrentLevel(levelCode);
    setShowLevelSelection(false);
    setCategory('general');
  };

  // Reset step when modal opens
  useEffect(() => {
    if (visible) {
      setStep(1);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-pinvocab-bg">
        {/* Header */}
        <View className="flex-row items-center justify-between px-8 pt-4 pb-6 border-b" style={{ borderBottomColor: 'rgba(34, 34, 32, 0.1)' }}>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
            >
              <Ionicons 
                name="arrow-back-outline" 
                size={24} 
                color="#222220" 
                style={{ opacity: 0.7 }}
              />
            </TouchableOpacity>
            <View>
              <Text 
                className="text-pinvocab-text text-xl tracking-tight"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                Take A Quiz
              </Text>
              <Text 
                className="text-pinvocab-text text-xs opacity-60 mt-1"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Step {step}/2
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
          >
            <Ionicons 
              name="close-outline" 
              size={24} 
              color="#222220" 
              style={{ opacity: 0.7 }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="px-8 pt-6">
            {step === 1 ? (
              /* Step 1: Quiz Type Selection */
              <>
                <View className="mb-6">
                  <Text 
                    className="text-pinvocab-text text-sm mb-3 opacity-70"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Quiz Type
                  </Text>
                  <View className="gap-2">
                    <TouchableOpacity
                      activeOpacity={hasSeenEnoughWords ? 0.7 : 1}
                      className="px-4 py-4 rounded-sm flex-row items-center justify-between"
                      style={{ 
                        backgroundColor: quizType === 'learned' 
                          ? 'rgba(34, 34, 32, 0.1)' 
                          : 'rgba(34, 34, 32, 0.05)',
                        opacity: hasSeenEnoughWords ? 1 : 0.5
                      }}
                      onPress={() => {
                        if (hasSeenEnoughWords) {
                          setQuizType('learned');
                        }
                      }}
                      disabled={!hasSeenEnoughWords}
                    >
                      <View className="flex-row items-center flex-1">
                        <Ionicons 
                          name="checkmark-circle-outline" 
                          size={20} 
                          color="#222220" 
                          style={{ opacity: 0.7, marginRight: 10 }}
                        />
                        <View className="flex-1">
                          <Text 
                            className="text-pinvocab-text text-sm"
                            style={{ fontFamily: 'Roboto-Medium' }}
                          >
                            Words I've Seen So Far
                          </Text>
                          <Text 
                            className="text-pinvocab-text text-xs opacity-60"
                            style={{ fontFamily: 'Roboto-Regular' }}
                          >
                            Quiz from words you've seen so far
                          </Text>
                        </View>
                      </View>
                      {quizType === 'learned' && (
                        <Ionicons 
                          name="checkmark-circle" 
                          size={20} 
                          color="#222220" 
                          style={{ opacity: 0.7 }}
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="px-4 py-4 rounded-sm flex-row items-center justify-between"
                      style={{ 
                        backgroundColor: quizType === 'all' 
                          ? 'rgba(34, 34, 32, 0.1)' 
                          : 'rgba(34, 34, 32, 0.05)' 
                      }}
                      onPress={() => setQuizType('all')}
                    >
                      <View className="flex-row items-center flex-1">
                        <Ionicons 
                          name="library-outline" 
                          size={20} 
                          color="#222220" 
                          style={{ opacity: 0.7, marginRight: 10 }}
                        />
                        <View className="flex-1">
                          <Text 
                            className="text-pinvocab-text text-sm"
                            style={{ fontFamily: 'Roboto-Medium' }}
                          >
                            All Words
                          </Text>
                          <Text 
                            className="text-pinvocab-text text-xs opacity-60"
                            style={{ fontFamily: 'Roboto-Regular' }}
                          >
                            Quiz from all words in this category
                          </Text>
                        </View>
                      </View>
                      {quizType === 'all' && (
                        <Ionicons 
                          name="checkmark-circle" 
                          size={20} 
                          color="#222220" 
                          style={{ opacity: 0.7 }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  
                  {/* Info message when user hasn't seen enough words */}
                  {!hasSeenEnoughWords && (
                    <View className="flex-row items-start gap-2 mt-3">
                      <Ionicons 
                        name="information-circle-outline" 
                        size={18} 
                        color="#222220" 
                        style={{ opacity: 0.6, marginTop: 2 }}
                      />
                      <View className="flex-1">
                        <Text 
                          className="text-pinvocab-text text-xs leading-relaxed"
                          style={{ fontFamily: 'Roboto-Regular', opacity: 0.7 }}
                        >
                          Since you haven't seen at least 10 words yet, you can only take a quiz with "All Words". The "Words I've Learned" option will become available as you learn more words.
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* Next Button */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="px-4 py-4 rounded-sm flex-row items-center justify-center"
                  style={{ 
                    backgroundColor: quizType ? 'rgba(34, 34, 32, 0.15)' : 'rgba(34, 34, 32, 0.05)',
                    opacity: quizType ? 1 : 0.5
                  }}
                  onPress={handleNext}
                  disabled={!quizType}
                >
                  <Text 
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Next
                  </Text>
                  <Ionicons 
                    name="chevron-forward-outline" 
                    size={18} 
                    color="#222220" 
                    style={{ opacity: 0.7, marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </>
            ) : (
              /* Step 2: Category Selection */
              <>
                <View className="mb-6">
                  <Text 
                    className="text-pinvocab-text text-sm mb-3 opacity-70"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Category
                  </Text>
                  <View className="gap-2">
                    {allCategories.map((cat) => {
                      const isSelected = category === cat.id;
                      const isGeneral = cat.id === 'general';
                      
                      return (
                        <TouchableOpacity
                          key={cat.id}
                          activeOpacity={0.7}
                          className="px-4 py-3 rounded-sm flex-row items-center justify-between"
                          style={{ 
                            backgroundColor: isSelected 
                              ? 'rgba(34, 34, 32, 0.1)' 
                              : 'rgba(34, 34, 32, 0.05)' 
                          }}
                          onPress={() => handleCategorySelect(cat.id)}
                        >
                          <View className="flex-row items-center flex-1">
                            <Ionicons 
                              name={cat.icon as any} 
                              size={18} 
                              color="#222220" 
                              style={{ opacity: 0.7, marginRight: 10 }}
                            />
                            <View className="flex-1">
                              <Text 
                                className="text-pinvocab-text text-sm"
                                style={{ fontFamily: 'Roboto-Medium' }}
                              >
                                {isGeneral ? getCategoryDisplayName(cat.id) : cat.name}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-row items-center gap-2">
                            {isSelected && (
                              <Ionicons 
                                name="checkmark-circle" 
                                size={20} 
                                color="#222220" 
                                style={{ opacity: 0.7 }}
                              />
                            )}
                            {isGeneral && (
                              <Ionicons 
                                name="chevron-forward-outline" 
                                size={18} 
                                color="#222220" 
                                style={{ opacity: 0.5 }}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Start Quiz Button */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="px-4 py-4 rounded-sm flex-row items-center justify-center"
                  style={{ 
                    backgroundColor: 'rgba(34, 34, 32, 0.15)'
                  }}
                  onPress={handleStartQuiz}
                >
                  <Ionicons 
                    name="play-circle-outline" 
                    size={22} 
                    color="#222220" 
                    style={{ opacity: 0.7, marginRight: 8 }}
                  />
                  <Text 
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Start Quiz
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>

        {/* Level Selection Modal for General */}
        {showLevelSelection && (
          <Pressable
            className="absolute inset-0 bg-black/50 items-center justify-center"
            style={{ zIndex: 1000 }}
            onPress={() => setShowLevelSelection(false)}
          >
            <Pressable
              className="bg-pinvocab-bg rounded-sm p-6 mx-8 max-h-[80%]"
              style={{ width: '85%' }}
              onPress={(e) => e.stopPropagation()}
            >
              <Text 
                className="text-pinvocab-text text-lg mb-4"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                Select Level for General
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="gap-3">
                  {englishLevels.map((levelItem) => {
                    const isSelected = currentLevel === levelItem.code;
                    return (
                      <TouchableOpacity
                        key={levelItem.code}
                        activeOpacity={0.7}
                        className="px-6 py-4 rounded-sm"
                        style={{ 
                          backgroundColor: isSelected 
                            ? 'rgba(34, 34, 32, 0.15)' 
                            : 'rgba(34, 34, 32, 0.05)',
                          borderWidth: isSelected ? 0 : 1,
                          borderColor: 'rgba(34, 34, 32, 0.15)',
                        }}
                        onPress={() => handleLevelSelect(levelItem.code)}
                      >
                        <View className="flex-row items-center justify-between">
                          <Text 
                            className="text-pinvocab-text text-lg tracking-wide"
                            style={{ 
                              fontFamily: 'Roboto-Regular',
                              color: isSelected ? '#222220' : '#222220',
                            }}
                          >
                            {levelItem.level}
                          </Text>
                          <View className="flex-row items-center gap-2">
                            <Text 
                              className="text-pinvocab-text text-base tracking-wide opacity-60"
                              style={{ 
                                fontFamily: 'Roboto-Regular',
                                color: isSelected ? '#222220' : '#222220',
                              }}
                            >
                              ({levelItem.code})
                            </Text>
                            {isSelected && (
                              <Ionicons 
                                name="checkmark-circle" 
                                size={20} 
                                color="#222220" 
                                style={{ opacity: 0.7 }}
                              />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
              <TouchableOpacity
                activeOpacity={0.7}
                className="mt-4 pt-4 border-t items-center"
                style={{ borderTopColor: 'rgba(34, 34, 32, 0.1)' }}
                onPress={() => setShowLevelSelection(false)}
              >
                <Text 
                  className="text-pinvocab-text text-sm opacity-70"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        )}
      </SafeAreaView>
    </Modal>
  );
}
