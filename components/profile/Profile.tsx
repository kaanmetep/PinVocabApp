import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileProps {
  visible: boolean;
  onClose: () => void;
  userName?: string;
  userLevel?: string;
  currentCategoryName?: string;
  currentPlan?: string;
  premiumStartedAt?: string;
  premiumRenewsAt?: string;
  onManageSubscription?: () => void;
  onCancelPremium?: () => void;
}

export default function Profile({
  visible,
  onClose,
  userName = 'Kaan',
  userLevel = 'B1',
  currentCategoryName = 'General',
  currentPlan = 'Premium',
  premiumStartedAt = '2026-03-01',
  premiumRenewsAt = '2027-03-01',
  onManageSubscription,
  onCancelPremium,
}: ProfileProps) {
  const [currentName, setCurrentName] = useState(userName);
  const [showNameModal, setShowNameModal] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isPremium = !currentPlan.toLowerCase().includes('free');
  const startedDate = new Date(premiumStartedAt);
  const renewsDate = new Date(premiumRenewsAt);
  const daysRemaining = Math.max(
    0,
    Math.ceil((renewsDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );
  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  useEffect(() => {
    if (visible) {
      setCurrentName(userName);
      setEditedName(userName);
    }
  }, [userName, visible]);

  const handleSaveName = () => {
    const nextName = editedName.trim();
    if (!nextName) {
      return;
    }
    setCurrentName(nextName);
    setShowNameModal(false);
  };

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all fields.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setPasswordError('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(false);
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
                Profile
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
            {/* Avatar & basic info */}
            <View className="items-center mb-8">
              <View
                className="w-16 h-16 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.1)' }}
              >
                <Ionicons
                  name="person-outline"
                  size={28}
                  color="#222220"
                  style={{ opacity: 0.8 }}
                />
              </View>
              <Text
                className="text-pinvocab-text text-base"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                {currentName}
              </Text>
              <Text
                className="text-pinvocab-text text-xs opacity-60 mt-1"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                Learning {currentCategoryName} · Level {userLevel}
              </Text>
            </View>

            {/* Account section */}
            <Text
              className="text-pinvocab-text text-sm mb-3 opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Account
            </Text>
            <View
              className="px-4 py-4 rounded-sm mb-8"
              style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name="at-outline"
                    size={18}
                    color="#222220"
                    style={{ opacity: 0.7, marginRight: 10 }}
                  />
                  <View className="flex-1">
                    <Text
                      className="text-pinvocab-text text-xs opacity-60 mb-0.5"
                      style={{ fontFamily: 'Roboto-Regular' }}
                    >
                      Email
                    </Text>
                    <Text
                      className="text-pinvocab-text text-sm"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      your.email@example.com
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(34, 34, 32, 0.08)',
                  marginVertical: 10,
                }}
              />
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color="#222220"
                    style={{ opacity: 0.7, marginRight: 10 }}
                  />
                  <View className="flex-1">
                    <Text
                      className="text-pinvocab-text text-xs opacity-60 mb-0.5"
                      style={{ fontFamily: 'Roboto-Regular' }}
                    >
                      Name
                    </Text>
                    <Text
                      className="text-pinvocab-text text-sm"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      {currentName}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setShowNameModal(true)}>
                  <Text
                    className="text-pinvocab-text text-xs opacity-70"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(34, 34, 32, 0.08)',
                  marginVertical: 10,
                }}
              />
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name="key-outline"
                    size={18}
                    color="#222220"
                    style={{ opacity: 0.7, marginRight: 10 }}
                  />
                  <View className="flex-1">
                    <Text
                      className="text-pinvocab-text text-xs opacity-60 mb-0.5"
                      style={{ fontFamily: 'Roboto-Regular' }}
                    >
                      Password
                    </Text>
                    <Text
                      className="text-pinvocab-text text-sm"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      ••••••••
                    </Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPasswordModal(true)}>
                  <Text
                    className="text-pinvocab-text text-xs opacity-70"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              className="text-pinvocab-text text-sm mb-3 opacity-70"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Account Status
            </Text>
            <View
              className="px-4 py-4 rounded-sm mb-8"
              style={{ backgroundColor: 'rgba(34, 34, 32, 0.05)' }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  {currentPlan.toLowerCase().includes('free') ? (
                    <Ionicons
                      name="lock-open-outline"
                      size={18}
                      color="#222220"
                      style={{ opacity: 0.7, marginRight: 10 }}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="crown-outline"
                      size={18}
                      color="#222220"
                      style={{ opacity: 0.7, marginRight: 10 }}
                    />
                  )}
                  <View className="flex-1">
                    <Text
                      className="text-pinvocab-text text-xs opacity-60 mb-0.5"
                      style={{ fontFamily: 'Roboto-Regular' }}
                    >
                      Plan
                    </Text>
                    <Text
                      className="text-pinvocab-text text-sm"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      {currentPlan}
                    </Text>
                  </View>
                </View>
              </View>
              {isPremium && (
                <>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: 'rgba(34, 34, 32, 0.08)',
                      marginVertical: 10,
                    }}
                  />
                  <View className="flex-row items-center justify-between mb-2">
                    <Text
                      className="text-pinvocab-text text-xs opacity-60"
                      style={{ fontFamily: 'Roboto-Regular' }}
                    >
                      Started on
                    </Text>
                    <Text
                      className="text-pinvocab-text text-sm"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      {formatDate(startedDate)}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between mb-2">
                    <Text
                      className="text-pinvocab-text text-xs opacity-60"
                      style={{ fontFamily: 'Roboto-Regular' }}
                    >
                      Renews on
                    </Text>
                    <Text
                      className="text-pinvocab-text text-sm"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      {formatDate(renewsDate)}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between mb-4">
                    <Text
                      className="text-pinvocab-text text-xs opacity-60"
                      style={{ fontFamily: 'Roboto-Regular' }}
                    >
                      Remaining
                    </Text>
                    <Text
                      className="text-pinvocab-text text-sm"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      {daysRemaining} days
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="px-4 py-3 rounded-sm mb-2 items-center justify-center"
                    style={{ backgroundColor: 'rgba(34, 34, 32, 0.1)' }}
                    onPress={() => {
                      onManageSubscription?.();
                    }}
                  >
                    <Text
                      className="text-pinvocab-text text-sm"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      Manage Premium
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="px-4 py-3 rounded-sm items-center justify-center"
                    style={{ backgroundColor: 'rgba(34, 34, 32, 0.06)' }}
                    onPress={() => {
                      onCancelPremium?.();
                    }}
                  >
                    <Text
                      className="text-pinvocab-text text-sm opacity-80"
                      style={{ fontFamily: 'Roboto-Medium' }}
                    >
                      Cancel Premium
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

          </View>
        </ScrollView>

        <Modal
          visible={showNameModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowNameModal(false)}
        >
          <Pressable
            className="flex-1 items-center justify-center px-8"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
            onPress={() => setShowNameModal(false)}
          >
            <Pressable
              className="w-full px-5 py-5 rounded-sm"
              style={{ backgroundColor: '#DED9D1' }}
              onPress={(e) => e.stopPropagation()}
            >
              <Text
                className="text-pinvocab-text text-base mb-4"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                Change Name
              </Text>
              <TextInput
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Enter your name"
                placeholderTextColor="rgba(34, 34, 32, 0.45)"
                underlineColorAndroid="transparent"
                className="px-4 py-3 rounded-sm text-pinvocab-text mb-4"
                style={{
                  backgroundColor: 'rgba(34, 34, 32, 0.06)',
                  fontFamily: 'Roboto-Regular',
                  outlineStyle: 'none' as any,
                  outlineWidth: 0 as any,
                  outlineColor: 'transparent' as any,
                }}
              />
              <View className="flex-row gap-2">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-1 px-4 py-3 rounded-sm items-center justify-center"
                  style={{ backgroundColor: 'rgba(34, 34, 32, 0.08)' }}
                  onPress={() => setShowNameModal(false)}
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
                  className="flex-1 px-4 py-3 rounded-sm items-center justify-center"
                  style={{ backgroundColor: 'rgba(34, 34, 32, 0.16)' }}
                  onPress={handleSaveName}
                >
                  <Text
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>

        <Modal
          visible={showPasswordModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPasswordModal(false)}
        >
          <Pressable
            className="flex-1 items-center justify-center px-8"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
            onPress={() => setShowPasswordModal(false)}
          >
            <Pressable
              className="w-full px-5 py-5 rounded-sm"
              style={{ backgroundColor: '#DED9D1' }}
              onPress={(e) => e.stopPropagation()}
            >
              <Text
                className="text-pinvocab-text text-base mb-4"
                style={{ fontFamily: 'Roboto-Bold' }}
              >
                Change Password
              </Text>
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Current password"
                placeholderTextColor="rgba(34, 34, 32, 0.45)"
                secureTextEntry
                underlineColorAndroid="transparent"
                className="px-4 py-3 rounded-sm text-pinvocab-text mb-2"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.06)', fontFamily: 'Roboto-Regular', outlineStyle: 'none' as any, outlineWidth: 0 as any, outlineColor: 'transparent' as any }}
              />
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New password"
                placeholderTextColor="rgba(34, 34, 32, 0.45)"
                secureTextEntry
                underlineColorAndroid="transparent"
                className="px-4 py-3 rounded-sm text-pinvocab-text mb-2"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.06)', fontFamily: 'Roboto-Regular', outlineStyle: 'none' as any, outlineWidth: 0 as any, outlineColor: 'transparent' as any }}
              />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor="rgba(34, 34, 32, 0.45)"
                secureTextEntry
                underlineColorAndroid="transparent"
                className="px-4 py-3 rounded-sm text-pinvocab-text"
                style={{ backgroundColor: 'rgba(34, 34, 32, 0.06)', fontFamily: 'Roboto-Regular', outlineStyle: 'none' as any, outlineWidth: 0 as any, outlineColor: 'transparent' as any }}
              />
              {passwordError ? (
                <Text
                  className="text-xs mt-2"
                  style={{ color: '#B3261E', fontFamily: 'Roboto-Regular' }}
                >
                  {passwordError}
                </Text>
              ) : null}
              <View className="flex-row gap-2 mt-4">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-1 px-4 py-3 rounded-sm items-center justify-center"
                  style={{ backgroundColor: 'rgba(34, 34, 32, 0.08)' }}
                  onPress={() => {
                    setShowPasswordModal(false);
                    setPasswordError('');
                  }}
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
                  className="flex-1 px-4 py-3 rounded-sm items-center justify-center"
                  style={{ backgroundColor: 'rgba(34, 34, 32, 0.16)' }}
                  onPress={handleSavePassword}
                >
                  <Text
                    className="text-pinvocab-text text-sm"
                    style={{ fontFamily: 'Roboto-Medium' }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
}

