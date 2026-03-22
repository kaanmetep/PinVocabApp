import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
  onWordFrequency?: () => void;
  onChangeLearningArea?: () => void;
  onRateApp?: () => void;
  onPrivacyPolicy?: () => void;
  onTermsOfService?: () => void;
  onContactUs?: () => void;
  notificationsEnabled?: boolean;
  onNotificationsToggle?: (enabled: boolean) => void;
}

export default function Settings({
  visible,
  onClose,
  onWordFrequency,
  onChangeLearningArea,
  onRateApp,
  onPrivacyPolicy,
  onTermsOfService,
  onContactUs,
  notificationsEnabled = true,
  onNotificationsToggle,
}: SettingsProps) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(notificationsEnabled);

  useEffect(() => {
    setIsNotificationsEnabled(notificationsEnabled);
  }, [notificationsEnabled]);

  const handleNotificationsToggle = (enabled: boolean) => {
    setIsNotificationsEnabled(enabled);
    onNotificationsToggle?.(enabled);
  };

  const settingsItems = [
    {
      icon: 'mail-outline',
      title: 'Contact Us',
      description: 'Get in touch for feedback, questions or support.',
      onPress: () => {
        onClose();
        onContactUs?.();
      },
    },
    {
      icon: 'time-outline',
      title: 'Word Frequency',
      description: 'Change how often you want to receive new words.',
      onPress: () => {
        onClose();
        onWordFrequency?.();
      },
    },
    {
      icon: 'library-outline',
      title: 'Learning Area',
      description: 'Update your category and level preference.',
      onPress: () => {
        onClose();
        onChangeLearningArea?.();
      },
    },
    {
      icon: 'star-outline',
      title: 'Rate App',
      description: 'Rate Pinvocab and share your feedback.',
      onPress: () => {
        onClose();
        onRateApp?.();
      },
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy Policy',
      description: 'How we handle your data and keep your account safe.',
      onPress: () => {
        onClose();
        onPrivacyPolicy?.();
      },
    },
    {
      icon: 'document-text-outline',
      title: 'Terms of Service',
      description: 'The rules for using Pinvocab and your responsibilities.',
      onPress: () => {
        onClose();
        onTermsOfService?.();
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-pinvocab-bg">
        {/* Header - same kurgu as WordCollections / TakeQuiz */}
        <View
          className="flex-row items-center justify-between px-8 pt-4 pb-6 border-b"
          style={{ borderBottomColor: 'rgba(34, 34, 32, 0.1)' }}
        >
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
            <View>
              <Text
                className="text-pinvocab-text text-xl tracking-tight"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                Settings
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="px-8 pt-6">
            <Text
              className="text-pinvocab-text text-sm mb-3 opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Notifications
            </Text>

            <View
              className="px-4 py-3 rounded-sm mb-5 flex-row items-center justify-between"
              style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
            >
              <View className="flex-row items-center flex-1 mr-3">
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color="#222220"
                  style={{ opacity: 0.7, marginRight: 10 }}
                />
                <View className="flex-1">
                  <Text
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Notifications
                  </Text>
                  <Text
                    className="text-pinvocab-text text-xs opacity-60"
                    style={{ fontFamily: 'Roboto-Regular' }}
                  >
                    Receive reminders for words and quizzes.
                  </Text>
                </View>
              </View>
              <Switch
                value={isNotificationsEnabled}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: 'rgba(34, 34, 32, 0.2)', true: '#222220' }}
                thumbColor="#fff"
              />
            </View>

            {/* Section title */}
            <Text
              className="text-pinvocab-text text-sm mb-3 opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              General
            </Text>

            {/* Settings items */}
            <View className="gap-2 mb-8">
              {settingsItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                  className="px-4 py-3 rounded-sm flex-row items-center justify-between"
                  style={{
                    backgroundColor: 'rgba(34, 34, 32, 0.05)',
                  }}
                >
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name={item.icon as any}
                      size={18}
                      color="#222220"
                      style={{ opacity: 0.7, marginRight: 10 }}
                    />
                    <View className="flex-1">
                      <Text
                        className="text-pinvocab-text text-sm"
                        style={{ fontFamily: 'Roboto-Medium' }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        className="text-pinvocab-text text-xs opacity-60"
                        style={{ fontFamily: 'Roboto-Regular' }}
                      >
                        {item.description}
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
              ))}
            </View>

            {/* App info section */}
            <Text
              className="text-pinvocab-text text-sm mb-3 opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              App
            </Text>
            <View
              className="px-4 py-4 rounded-sm mb-4"
              style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
            >
              <Text
                className="text-pinvocab-text text-sm"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                PinVocab
              </Text>
              <Text
                className="text-pinvocab-text text-xs opacity-60 mt-1"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Version 1.0.0
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

