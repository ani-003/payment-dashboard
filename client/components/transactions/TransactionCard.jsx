import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export default function TransactionCard({ data }) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  // ✅ Guard clause
  if (!data || typeof data !== 'object') return null;

  const {
    amount = 0,
    receiver = 'N/A',
    status = 'unknown',
    method = 'N/A',
    createdAt = new Date().toISOString(),
    _id = 'unknown',
  } = data;

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.amount, { color: theme.colors.onSurface }]}>
            ₹{amount}
          </Text>
          <Text style={[styles.desc, { color: theme.colors.onSurface }]}>
            {receiver}
          </Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={[styles.due, { color: theme.colors.onSurface }]}>
            {new Date(createdAt).toDateString()}
          </Text>
        </View>
      </Pressable>

      {/* MODAL */}
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setVisible(false)}>
          <View style={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.modalTitle, {color: theme.colors.onSurface}]}>Transaction Details</Text>
            <Text style={[styles.modalItem, {color: theme.colors.onSurface}]}>Amount: ₹{amount}</Text>
            <Text style={[styles.modalItem, {color: theme.colors.onSurface}]}>Receiver: {receiver}</Text>
            <Text style={[styles.modalItem, {color: theme.colors.onSurface}]}>Date: {new Date(createdAt).toDateString()}</Text>
            <Text style={[styles.modalItem, {color: theme.colors.onSurface}]}>Method: {method}</Text>
            <Text style={[styles.modalItem, {color: theme.colors.onSurface}]}>Status: {status}</Text>
       
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 90,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSection: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  amount: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  due: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: CARD_WIDTH,
    padding: 20,
    borderRadius: 16,
    elevation: 8,

  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 16,
  },
  modalItem: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 8,
  },
});
