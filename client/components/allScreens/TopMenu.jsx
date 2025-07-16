import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

import useProfileModalStore from '../../src/store/profileModalStore';

export default function TopMenu({ onProfilePress = () => { } }) {
    const navigation = useNavigation();
    const theme = useTheme();
    const { openModal } = useProfileModalStore();
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Ionicons name="menu" size={30} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={openModal}>
                <Ionicons name="person-circle-outline" size={30} color={theme.colors.primary} />
            </TouchableOpacity>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
   
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
      
    },
});
