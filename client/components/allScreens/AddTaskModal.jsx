import React, { useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from 'react-native';
import {
    TextInput,
    Button,
    RadioButton,
    Text,
    useTheme,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskModal = ({ visible, onClose, onSubmit }) => {
    const theme = useTheme();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');


    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'dismissed') return;
        setShowDatePicker(false);
        setDueDate(selectedDate || dueDate);
    };

    const handleSubmit = () => {
        onSubmit({
            title,
            description,
            priority,
            due: dueDate.toISOString().split('T')[0],
        });
        onClose();
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate(new Date());
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.modalWrapper}
            >
                <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 16,
                            }}
                        >
                            <Text style={[styles.heading, { flex: 1 }]}>Add Task</Text>

                            <Button
                                mode="contained"
                                onPress={handleSubmit}
                                disabled={!title.trim()}
                                style={[styles.submit, { backgroundColor: theme.colors.primary }]}
                                labelStyle={{ color: theme.colors.onPrimary, fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}
                            >
                                Add Task
                            </Button>
                        </View>


                        <TextInput
                            label="Title"
                            value={title}
                            onChangeText={setTitle}
                            mode="outlined"
                            style={styles.input}
                        />
                        <TextInput
                            label="Description"
                            value={description}
                            onChangeText={setDescription}
                            mode="outlined"
                            multiline
                            numberOfLines={3}
                            style={styles.input}
                        />

                        <Text style={styles.label}>Priority</Text>
                        <RadioButton.Group onValueChange={setPriority} value={priority}>
                            <View style={styles.radioRow}>
                                <RadioButton.Item label="Low" value="low" />
                                <RadioButton.Item label="Medium" value="medium" />
                                <RadioButton.Item label="High" value="high" />
                            </View>
                        </RadioButton.Group>

                        <Button
                            mode="outlined"
                            onPress={() => setShowDatePicker(true)}
                            style={styles.input}
                        >
                            Due: {dueDate.toDateString()}
                        </Button>

                        {showDatePicker && (
                            <DateTimePicker
                                value={dueDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    
    },
    modalContent: {
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 8,
    },
    scroll: {
        paddingBottom: 40,
  
    },
    heading: {
        fontSize: 20,
        marginBottom: 12,
        fontFamily: 'Poppins_500Medium',
    },
    input: {
        marginBottom: 12,
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontWeight: '500',
        fontSize: 16,
    },
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    submit: {
        marginTop: 20,

    },
});

export default AddTaskModal;
