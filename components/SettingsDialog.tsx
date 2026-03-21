import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface SettingsDialogProps {
  visible: boolean;
  onClose: () => void;
  onPrivacyPolicy?: () => void;
  onTermsOfService?: () => void;
  onContactUs?: () => void;
}

export default function SettingsDialog({
  visible,
  onClose,
  onPrivacyPolicy,
  onTermsOfService,
  onContactUs,
}: SettingsDialogProps) {
  const settingsItems = [
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy Policy',
      onPress: () => {
        onClose();
        onPrivacyPolicy?.();
      },
    },
    {
      icon: 'document-text-outline',
      title: 'Terms of Service',
      onPress: () => {
        onClose();
        onTermsOfService?.();
      },
    },
    {
      icon: 'mail-outline',
      title: 'Contact Us',
      onPress: () => {
        onClose();
        onContactUs?.();
      },
    },
  ];

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
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text 
              className="text-pinvocab-text text-lg tracking-tight"
              style={{ fontFamily: 'Roboto-Bold' }}
            >
              Settings
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

          {/* Settings Items */}
          <View className="gap-3 mb-6">
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                activeOpacity={0.7}
                style={{
                  backgroundColor: 'rgba(34, 34, 32, 0.05)',
                  borderWidth: 1,
                  borderColor: 'rgba(34, 34, 32, 0.15)',
                }}
                className="px-6 py-4 rounded-sm flex-row items-center"
              >
                <View 
                  style={{ 
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: 'rgba(34, 34, 32, 0.08)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Ionicons 
                    name={item.icon as any} 
                    size={20} 
                    color="#222220" 
                    style={{ opacity: 0.8 }}
                  />
                </View>
                <Text 
                  className="text-pinvocab-text text-base tracking-wide flex-1"
                  style={{ 
                    fontFamily: 'Roboto-Regular',
                  }}
                >
                  {item.title}
                </Text>
                <Ionicons 
                  name="chevron-forward-outline" 
                  size={20} 
                  color="#222220" 
                  style={{ opacity: 0.4 }}
                />
              </TouchableOpacity>
            ))}
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}
