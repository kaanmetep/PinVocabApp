import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WordDetailsProps {
  visible: boolean;
  onClose: () => void;
  word: {
    word: string;
    type: string;
    definition: string;
    pronunciation: string;
    category: string;
    level?: string;
  };
}

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

// Mock data - will be replaced with real data later
const getWordDetails = (word: string) => {
  // This will be replaced with actual API call
  const mockData: Record<string, any> = {
    Serendipity: {
      examples: [
        "Finding that rare book in the small shop was pure serendipity.",
        "Their meeting was a serendipity that changed both their lives.",
        "The discovery of penicillin was a serendipity that revolutionized medicine.",
      ],
      synonyms: ['fortune', 'luck', 'chance', 'coincidence', 'fluke'],
      antonyms: ['misfortune', 'bad luck'],
      wordForms: [
        { form: 'serendipitous', type: '(adj.)', meaning: 'occurring by chance in a happy way' },
        { form: 'serendipitously', type: '(adv.)', meaning: 'in a serendipitous manner' },
      ],
    },
  };

  return mockData[word] || {
    examples: [
      "Example sentence will be shown here.",
      "Another example sentence.",
    ],
    synonyms: ['synonym1', 'synonym2'],
    antonyms: [],
    wordForms: [],
  };
};

export default function WordDetails({ visible, onClose, word }: WordDetailsProps) {
  const [wordDetails, setWordDetails] = useState<any>(null);

  useEffect(() => {
    if (visible && word) {
      const details = getWordDetails(word.word);
      setWordDetails(details);
    }
  }, [visible, word]);

  const handlePlayPronunciation = () => {
    // TODO: Implement text-to-speech
    console.log('Playing pronunciation for:', word.word);
  };

  if (!wordDetails) return null;

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
              Word Details
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
            {/* Word Header Card */}
            <View 
              className="px-6 py-6 rounded-sm mb-6"
              style={{ backgroundColor: 'rgba(34, 34, 32, 0.75)' }}
            >
              {/* Category Badge */}
              <View className="flex-row items-center mb-3">
                <View 
                  className="px-1.5 py-0.5 rounded-sm self-start"
                  style={{ backgroundColor: 'rgba(222, 217, 209, 0.15)' }}
                >
                  <Text 
                    className="text-pinvocab-bg"
                    style={{ fontFamily: 'Roboto-Medium', opacity: 0.8, fontSize: 10 }}
                  >
                    {word.category === 'general' 
                      ? `${categoryNames[word.category]} (${englishLevels[word.level || 'B1'] || word.level})`
                      : categoryNames[word.category] || 'General'
                    }
                  </Text>
                </View>
              </View>

              {/* Word and Type */}
              <View className="flex-row items-baseline justify-between mb-2">
                <View className="flex-row items-baseline flex-1">
                  <Text 
                    className="text-pinvocab-bg text-4xl tracking-tight mr-3"
                    style={{ fontFamily: 'Roboto-Bold' }}
                  >
                    {word.word}
                  </Text>
                  <Text 
                    className="text-pinvocab-bg text-base opacity-70"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    {word.type}
                  </Text>
                </View>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={handlePlayPronunciation}
                >
                  <Ionicons 
                    name="volume-high" 
                    size={24} 
                    color="#DED9D1" 
                    style={{ opacity: 0.9 }}
                  />
                </TouchableOpacity>
              </View>

              {/* Pronunciation */}
              <Text 
                className="text-pinvocab-bg text-sm opacity-60 mb-3"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                {word.pronunciation}
              </Text>

              {/* Definition */}
              <Text 
                className="text-pinvocab-bg text-base leading-relaxed opacity-90"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                {word.definition}
              </Text>
            </View>

            {/* Example Sentences */}
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <Ionicons 
                  name="document-text-outline" 
                  size={18} 
                  color="#222220" 
                  style={{ opacity: 0.7, marginRight: 8 }}
                />
                <Text 
                  className="text-pinvocab-text text-sm opacity-70"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Example Sentences
                </Text>
              </View>
              <View className="gap-3">
                {wordDetails.examples.map((example: string, index: number) => {
                  // Split example by word to make the word bold
                  const wordRegex = new RegExp(`(${word.word})`, 'gi');
                  const parts = example.split(wordRegex);
                  
                  return (
                    <View
                      key={index}
                      className="px-4 py-3 rounded-sm"
                      style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                    >
                      <Text 
                        className="text-pinvocab-text text-sm leading-relaxed"
                        style={{ fontFamily: 'Roboto-Regular' }}
                      >
                        {parts.map((part, partIndex) => {
                          const isWord = part.toLowerCase() === word.word.toLowerCase();
                          return (
                            <Text 
                              key={partIndex}
                              style={isWord ? { fontFamily: 'Roboto-Bold' } : {}}
                            >
                              {part}
                            </Text>
                          );
                        })}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Synonyms */}
            {wordDetails.synonyms.length > 0 && (
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <Ionicons 
                    name="swap-horizontal-outline" 
                    size={18} 
                    color="#222220" 
                    style={{ opacity: 0.7, marginRight: 8 }}
                  />
                  <Text 
                    className="text-pinvocab-text text-sm opacity-70"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Synonyms
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {wordDetails.synonyms.map((synonym: string, index: number) => (
                    <View
                      key={index}
                      className="px-3 py-2 rounded-sm"
                      style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                    >
                      <Text 
                        className="text-pinvocab-text text-sm"
                        style={{ fontFamily: 'Roboto-Regular' }}
                      >
                        {synonym}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Antonyms */}
            {wordDetails.antonyms.length > 0 && (
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <Ionicons 
                    name="close-circle-outline" 
                    size={18} 
                    color="#222220" 
                    style={{ opacity: 0.7, marginRight: 8 }}
                  />
                  <Text 
                    className="text-pinvocab-text text-sm opacity-70"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Antonyms
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {wordDetails.antonyms.map((antonym: string, index: number) => (
                    <View
                      key={index}
                      className="px-3 py-2 rounded-sm"
                      style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                    >
                      <Text 
                        className="text-pinvocab-text text-sm"
                        style={{ fontFamily: 'Roboto-Regular' }}
                      >
                        {antonym}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Word Forms */}
            {wordDetails.wordForms.length > 0 && (
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <Ionicons 
                    name="layers-outline" 
                    size={18} 
                    color="#222220" 
                    style={{ opacity: 0.7, marginRight: 8 }}
                  />
                  <Text 
                    className="text-pinvocab-text text-sm opacity-70"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Word Forms
                  </Text>
                </View>
                <View className="gap-2">
                  {wordDetails.wordForms.map((form: any, index: number) => (
                    <View
                      key={index}
                      className="px-4 py-3 rounded-sm"
                      style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                    >
                      <View className="flex-row items-baseline mb-1">
                        <Text 
                          className="text-pinvocab-text text-base mr-2"
                          style={{ fontFamily: 'Roboto-Medium' }}
                        >
                          {form.form}
                        </Text>
                        <Text 
                          className="text-pinvocab-text text-xs opacity-60"
                          style={{ fontFamily: 'Roboto-Regular' }}
                        >
                          {form.type}
                        </Text>
                      </View>
                      <Text 
                        className="text-pinvocab-text text-sm opacity-70"
                        style={{ fontFamily: 'Roboto-Regular' }}
                      >
                        {form.meaning}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
