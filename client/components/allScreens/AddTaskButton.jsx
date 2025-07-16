import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

const AddTaskButton = ({ onPress }) => {
  const theme = useTheme();

  return (
    <FAB
      icon="plus"
      style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      onPress={onPress}
      color="white"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1E88E5', // Customize your color
  },
});

export default AddTaskButton;
