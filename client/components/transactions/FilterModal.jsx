import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Checkbox,
  useTheme,
  Surface,
  Divider,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
// ...imports unchanged
export default function FilterModal({ visible, onClose, onApply }) {
  const theme = useTheme();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

 
  

  const [status, setStatus] = useState({
    success: false,
    failed: false,
  });

  const [paymentType, setPaymentType] = useState('');

const handleApply = () => {
  const query = [];

  if (startDate) query.push(`startDate=${startDate.toISOString()}`);
  if (endDate) query.push(`endDate=${endDate.toISOString()}`);

  if (status.success) query.push(`status=success`);
  if (status.failed) query.push(`status=failed`);

  if (paymentType.trim()) query.push(`method=${encodeURIComponent(paymentType.trim())}`);

  const fullURL = `http://192.168.10.2:5000/payments?${query.join('&')}`;

  onApply(fullURL);
  onClose();
};


  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setStatus({ success: false, failed: false });
    setPaymentType('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalBackground}
      >
        <Surface style={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text variant="titleMedium" style={styles.header}>Filter by:</Text>

            {/* Date Range */}
            <Text style={styles.label}>Date Range</Text>
            <View style={styles.row}>
              <Button mode="outlined" onPress={() => setShowStartPicker(true)} style={styles.dateBtn}>
                {startDate ? startDate.toDateString() : 'Start Date'}
              </Button>
              <Button mode="outlined" onPress={() => setShowEndPicker(true)} style={styles.dateBtn}>
                {endDate ? endDate.toDateString() : 'End Date'}
              </Button>
            </View>
            {showStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  setShowStartPicker(false);
                  if (date) setStartDate(date);
                }}
              />
            )}
            {showEndPicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  setShowEndPicker(false);
                  if (date) setEndDate(date);
                }}
              />
            )}

            <Divider style={styles.divider} />

            {/* Amount Range */}
       

            <Divider style={styles.divider} />

            {/* Status */}
            <Text style={styles.label}>Status</Text>
            <View style={styles.checkboxRow}>
              <Checkbox
                status={status.success ? 'checked' : 'unchecked'}
                onPress={() => setStatus(prev => ({ ...prev, success: !prev.success }))}
              />
              <Text>Success</Text>
              <Checkbox
                status={status.failed ? 'checked' : 'unchecked'}
                onPress={() => setStatus(prev => ({ ...prev, failed: !prev.failed }))}
              />
              <Text>Failed</Text>
            </View>

            <Divider style={styles.divider} />

            {/* Payment Type */}
            <TextInput
              label="Payment Type (e.g. UPI, Card)"
              value={paymentType}
              onChangeText={setPaymentType}
              mode="outlined"
              style={{ marginBottom: 16 }}
            />

            {/* Buttons */}
            <View style={[styles.buttonRow, { justifyContent: 'space-between' }]}>
              <Button mode="text" onPress={handleReset}>
                Reset
              </Button>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Button mode="outlined" onPress={onClose} style={styles.button}>
                  <Text>Cancel</Text>
                </Button>
                <Button mode="contained" onPress={handleApply} style={styles.button}>
                  <Text>Apply</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </Surface>
      </KeyboardAvoidingView>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    elevation: 6,
  },
  header: {
   
    marginBottom: 20,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 6,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  dateBtn: {
    flex: 1,
  },
  inputHalf: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
    opacity: 0.3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    minWidth: 100,
  },
});
