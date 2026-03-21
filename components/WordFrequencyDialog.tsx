import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface WordFrequencyDialogProps {
  visible: boolean;
  onClose: () => void;
  currentFrequency: string; // in hours, e.g., '3'
  onConfirm: (frequency: string) => void;
  showWarning?: boolean;
  pendingFrequency?: string | null;
  onWarningConfirm?: () => void;
  onWarningCancel?: () => void;
}

const wordChangeFrequencies = [
  { label: 'every 1 hour', value: '1' },
  { label: 'every 3 hours', value: '3' },
  { label: 'every 6 hours', value: '6' },
  { label: 'every 12 hours', value: '12' },
];

export default function WordFrequencyDialog({
  visible,
  onClose,
  currentFrequency,
  onConfirm,
  showWarning = false,
  pendingFrequency = null,
  onWarningConfirm,
  onWarningCancel,
}: WordFrequencyDialogProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<string>(currentFrequency);

  // Reset selected frequency when dialog opens
  useEffect(() => {
    if (visible) {
      setSelectedFrequency(currentFrequency);
    }
  }, [visible, currentFrequency]);

  const handleFrequencySelect = (frequency: string) => {
    setSelectedFrequency(frequency);
    if (frequency !== currentFrequency) {
      // Show warning if changing frequency
      onConfirm(frequency);
    } else {
      // Same frequency, just close
      onClose();
    }
  };


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/50 items-center justify-center"
        onPress={onClose}
      >
        <Pressable
          className="bg-pinvocab-bg rounded-sm p-6 mx-8"
          style={{ width: '85%' }}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Warning Dialog */}
          {showWarning ? (
            <>
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
                  Change Word Frequency?
                </Text>
                <Text 
                  className="text-pinvocab-text text-sm text-center leading-relaxed"
                  style={{ fontFamily: 'Roboto-Regular', opacity: 0.7 }}
                >
                  After your current word, the word change frequency will be updated to{' '}
                  <Text style={{ fontFamily: 'Roboto-Medium' }}>
                    {wordChangeFrequencies.find(f => f.value === pendingFrequency)?.label || pendingFrequency}
                  </Text>
                  .
                </Text>
              </View>
              
              <View className="flex-row gap-3 mt-4">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-1 px-4 py-3 rounded-sm items-center"
                  style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
                  onPress={onWarningCancel}
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
                  onPress={onWarningConfirm}
                >
                  <Text 
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {/* Header */}
              <View className="flex-row items-center justify-between mb-6">
                <Text 
                  className="text-pinvocab-text text-lg tracking-tight"
                  style={{ fontFamily: 'Roboto-Bold' }}
                >
                  Word Change Frequency
                </Text>
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

              {/* Frequency Options */}
              <View className="gap-3 mb-6">
                {wordChangeFrequencies.map((item) => {
                  const isSelected = selectedFrequency === item.value;
                  return (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => handleFrequencySelect(item.value)}
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

              {/* Info Message */}
              <View className="mb-6">
                <Text 
                  className="text-pinvocab-text text-sm text-left leading-relaxed opacity-60"
                  style={{ fontFamily: 'Roboto-Regular' }}
                >
                  Seeing a word more frequently helps you remember it better. Instead of trying to see more words, focusing on fewer words and never forgetting them can be more beneficial for your learning journey.
                </Text>
              </View>

              {/* Close Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="px-4 py-3 rounded-sm items-center"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.15)' }}
                onPress={onClose}
              >
                <Text 
                  className="text-pinvocab-text text-sm"
                  style={{ fontFamily: 'Roboto-Medium' }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
