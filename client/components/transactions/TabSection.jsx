import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const tabs = ['My Tasks', 'In-progress', 'Completed'];

export default function TabsSection({ onTabChange }) {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabPress = (index) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(tabs[index]);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = index === activeTab;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabPress(index)}
            style={[styles.tabButton, {borderColor: theme.colors.outline, backgroundColor: isActive ? theme.colors.primary : theme.colors.surface}]} 
          >
            <Text style={[
              styles.tabText,
              { 
                fontFamily: isActive ? 'Poppins_600SemiBold' : 'Poppins_500Medium',
                color: isActive ? theme.colors.onPrimary : theme.colors.onSurface
              }
            ]}>
              {tab}
            </Text>
            {isActive && <View style={[styles.indicator, { backgroundColor: theme.colors.primary }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
    width: '100%',
    paddingHorizontal: 20,
    
  },
  tabButton: {
    alignItems: 'center',
 
    padding: 12,
    borderRadius: 20,
    
  },
  tabText: {
    fontSize: 12,
  },

});
