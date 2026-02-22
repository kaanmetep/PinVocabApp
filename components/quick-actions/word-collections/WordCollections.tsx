import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WordCollectionsProps {
  visible: boolean;
  onClose: () => void;
  initialLevel?: string; // Level code like 'A1', 'B1', etc.
  initialCategory?: string;
  onCategorySelect?: (categoryId: string, level?: string | null) => void;
}

// All categories - General will show level selection, others are direct
const allCategories = [
  { id: 'general', name: 'General', icon: 'language-outline', isLevelBased: true },
  { id: 'daily', name: 'Daily Conversation', count: 320, icon: 'chatbubbles-outline' },
  { id: 'travel', name: 'Travel & Tourism', count: 280, icon: 'airplane-outline' },
  { id: 'food', name: 'Food & Dining', count: 200, icon: 'restaurant-outline' },
  { id: 'business', name: 'Business English', count: 320, icon: 'briefcase-outline' },
  { id: 'academic', name: 'Academic Words', count: 515, icon: 'school-outline' },
  { id: 'technology', name: 'Technology', count: 200, icon: 'hardware-chip-outline' },
  { id: 'medical', name: 'Medical Terms', count: 350, icon: 'medical-outline' },
  { id: 'legal', name: 'Legal Terms', count: 300, icon: 'document-text-outline' },
  { id: 'literature', name: 'Literature & Arts', count: 380, icon: 'library-outline' },
  { id: 'science', name: 'Science & Nature', count: 400, icon: 'flask-outline' },
  { id: 'phrasal', name: 'Phrasal Verbs', count: 250, icon: 'arrow-forward-outline' },
  { id: 'idioms', name: 'Idioms', count: 300, icon: 'bulb-outline' },
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

// Calculate total words for General (sum of all levels)
const generalTotalWords = Object.values(generalCountsByLevel).reduce((sum, count) => sum + count, 0);

export default function WordCollections({
  visible,
  onClose,
  initialLevel = 'B1',
  initialCategory = 'general',
  onCategorySelect,
}: WordCollectionsProps) {
  const [userLevel, setUserLevel] = useState<string | null>(initialCategory === 'general' ? initialLevel : null);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  const [pendingLevel, setPendingLevel] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === 'general') {
      // Show level selection for General
      setShowLevelSelection(true);
    } else if (categoryId !== selectedCategory) {
      // Show confirmation dialog when changing to a different category
      setPendingCategory(categoryId);
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmCategoryChange = () => {
    if (pendingCategory) {
      if (pendingLevel) {
        // General category with level selected
        setUserLevel(pendingLevel);
        setSelectedCategory('general');
        if (onCategorySelect) {
          onCategorySelect('general', pendingLevel);
        }
      } else {
        // Non-general category selected
        setUserLevel(null);
        setSelectedCategory(pendingCategory);
        if (onCategorySelect) {
          onCategorySelect(pendingCategory, null);
        }
      }
      setShowConfirmDialog(false);
      setPendingCategory(null);
      setPendingLevel(null);
      // Close Word Collections and return to home
      onClose();
    }
  };

  const handleCancelCategoryChange = () => {
    setShowConfirmDialog(false);
    setPendingCategory(null);
    setPendingLevel(null);
  };

  const handleLevelSelect = (levelCode: string) => {
    // Check if level is different from current or if category is not general
    if (levelCode !== userLevel || selectedCategory !== 'general') {
      // Show confirmation dialog
      setPendingCategory('general');
      setPendingLevel(levelCode);
      setShowLevelSelection(false);
      setShowConfirmDialog(true);
    } else {
      // Same level selected, just close the modal
      setShowLevelSelection(false);
    }
  };

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
              onPress={onClose}
            >
              <Ionicons 
                name="arrow-back-outline" 
                size={24} 
                color="#222220" 
                style={{ opacity: 0.7 }}
              />
            </TouchableOpacity>
            <Text 
              className="text-pinvocab-text text-xl tracking-tight"
              style={{ fontFamily: 'Roboto-Bold' }}
            >
              Word Collections
            </Text>
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
            {/* All Categories */}
            <View>
              <Text 
                className="text-pinvocab-text text-sm mb-3 opacity-70"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                Word Collections
              </Text>
              <View className="gap-2">
                {allCategories.map((category) => {
                  const isGeneral = category.id === 'general';
                  let displayCount: number;
                  if (isGeneral) {
                    // If level is selected, show that level's count, otherwise show total
                    displayCount = userLevel ? generalCountsByLevel[userLevel] : generalTotalWords;
                  } else {
                    displayCount = category.count || 0;
                  }
                  
                  return (
                    <TouchableOpacity
                      key={category.id}
                      activeOpacity={0.7}
                      className="px-4 py-3 rounded-sm flex-row items-center justify-between"
                      style={{ 
                        backgroundColor: selectedCategory === category.id 
                          ? 'rgba(34, 34, 32, 0.1)' 
                          : 'rgba(34, 34, 32, 0.05)' 
                      }}
                      onPress={() => handleCategorySelect(category.id)}
                    >
                      <View className="flex-row items-center flex-1">
                        <Ionicons 
                          name={category.icon as any} 
                          size={18} 
                          color="#222220" 
                          style={{ opacity: 0.7, marginRight: 10 }}
                        />
                        <View className="flex-1">
                          <Text 
                            className="text-pinvocab-text text-sm"
                            style={{ fontFamily: 'Roboto-Medium' }}
                          >
                            {category.name}
                          </Text>
                          <Text 
                            className="text-pinvocab-text text-xs opacity-60"
                            style={{ fontFamily: 'Roboto-Regular' }}
                          >
                            {displayCount} words
                            {isGeneral && userLevel && ` (${englishLevels.find(l => l.code === userLevel)?.level || userLevel})`}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row items-center gap-2">
                        {selectedCategory === category.id && (
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
                    const isSelected = userLevel === levelItem.code;
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
                            <Text 
                              className="text-pinvocab-text text-xs opacity-60"
                              style={{ fontFamily: 'Roboto-Regular' }}
                            >
                              {generalCountsByLevel[levelItem.code]} words
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

        {/* Category Change Confirmation Dialog */}
        {showConfirmDialog && pendingCategory && (
          <Pressable
            className="absolute inset-0 bg-black/50 items-center justify-center"
            style={{ zIndex: 1000 }}
            onPress={handleCancelCategoryChange}
          >
            <Pressable
              className="bg-pinvocab-bg rounded-sm p-6 mx-8"
              style={{ width: '85%' }}
              onPress={(e) => e.stopPropagation()}
            >
              <View className="items-center mb-4">
                <Ionicons 
                  name="information-circle-outline" 
                  size={48} 
                  color="#222220" 
                  style={{ opacity: 0.7, marginBottom: 12 }}
                />
                <Text 
                  className="text-pinvocab-text text-lg text-center mb-2"
                  style={{ fontFamily: 'Roboto-Bold' }}
                >
                  Change Category?
                </Text>
                <Text 
                  className="text-pinvocab-text text-sm text-center leading-relaxed"
                  style={{ fontFamily: 'Roboto-Regular', opacity: 0.7 }}
                >
                  After your current word, you will start seeing words from the{' '}
                  <Text style={{ fontFamily: 'Roboto-Medium' }}>
                    {pendingLevel 
                      ? `${allCategories.find(c => c.id === pendingCategory)?.name || pendingCategory} (${englishLevels.find(l => l.code === pendingLevel)?.level || pendingLevel})`
                      : allCategories.find(c => c.id === pendingCategory)?.name || pendingCategory
                    }
                  </Text>
                  {' '}category.
                </Text>
              </View>
              
              <View className="flex-row gap-3 mt-4">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-1 px-4 py-3 rounded-sm items-center"
                  style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                  onPress={handleCancelCategoryChange}
                >
                  <Text 
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-1 px-4 py-3 rounded-sm items-center"
                  style={{ backgroundColor: 'rgba(34, 34, 32, 0.15)' }}
                  onPress={handleConfirmCategoryChange}
                >
                  <Text 
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        )}
      </SafeAreaView>
    </Modal>
  );
}
