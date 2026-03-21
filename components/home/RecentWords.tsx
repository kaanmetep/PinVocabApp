import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RecentWord {
  word: string;
  type: string;
  definition: string;
}

interface RecentWordsProps {
  visible: boolean;
  onClose: () => void;
  words: RecentWord[];
  onWordPress?: (word: RecentWord) => void;
}

export default function RecentWords({
  visible,
  onClose,
  words,
  onWordPress,
}: RecentWordsProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-pinvocab-bg">
        <View
          className="flex-row items-center justify-between px-8 pt-4 pb-6 border-b"
          style={{ borderBottomColor: 'rgba(34, 34, 32, 0.1)' }}
        >
          <View className="flex-row items-center gap-4">
            <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
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
              Recent Words
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
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
          <View className="px-8 pt-6 gap-3">
            {words.map((word, index) => (
              <TouchableOpacity
                key={`${word.word}-${index}`}
                activeOpacity={0.7}
                className="px-4 py-4 rounded-sm"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                onPress={() => {
                  onWordPress?.(word);
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
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
