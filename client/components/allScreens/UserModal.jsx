import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Modal, Portal, Button, Text, useTheme } from 'react-native-paper';

import useAuthStore from '../../src/store/authStore';
import useProfileModalStore from '../../src/store/profileModalStore';
import { useRouter } from 'expo-router';

export default function UserModal() {
    const router = useRouter();
    const theme = useTheme();
    const { user, logout } = useAuthStore();
    const { visible, closeModal } = useProfileModalStore();

    const displayName = user?.displayName || 'User';
    const email = user?.email || 'no-email@example.com';

    return (
        <Portal>
            {visible && (
                <View style={styles.backdrop}>
                    <Modal
                        visible={visible}
                        onDismiss={closeModal}
                        dismissable={true}
                        contentContainerStyle={[
                            styles.modalContainer,
                            {
                                backgroundColor: theme.colors.surface,
                                alignSelf: 'center',
                            },
                        ]}
                    >
                        <Text style={[styles.name, { color: theme.colors.onSurface }]}>{displayName}</Text>
                        <Text style={[styles.email, { color: theme.colors.onSurface }]}>{email}</Text>

                        <Button
                            onPress={async () => {
                                await logout();
                                router.replace('/(auth)/signup');
                                closeModal();
                            }}
                            style={{ marginTop: 20 }}
                            mode="contained"
                        >
                            Logout
                        </Button>
                    </Modal>
                </View>
            )}
        </Portal>

    );
}

const styles = StyleSheet.create({

    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },


    modalContainer: {
        margin: 24,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },

    },
    name: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 8,
    },
    email: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 16,
    },
    closeBtn: {
        marginTop: 12,
        width: '100%',
    },
});
