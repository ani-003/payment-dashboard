import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import useAuthStore from '../../../src/store/authStore';

import Graph from '../../../components/home/Graph';

import TopMenu from '../../../components/allScreens/TopMenu';


import StatsSection from '../../../components/home/StatsSection';

import AddPaymentButton from '../../../components/home/AddPaymentButton';


const img = require('../../../assets/images/react-logo.png');
export default function TabTwoScreen() {


  const { user, logout } = useAuthStore();
  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  // (Optional) You can handle the submitted task later
  const handleAddTask = (task) => {
    console.log('New task submitted:', task);
  };

  const displayName = user?.displayName || 'User';
  const firstName = displayName.split(' ')[0];

  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>





      <TopMenu onProfilePress={() => console.log('Profile pressed')} />

      <View style={{ width: '100%', paddingHorizontal: 10 }}>

        <Text style={[styles.title, { color: theme.colors.onSurface }]}>DASHBOARD</Text>
      </View>


      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        <StatsSection />
      </View>

      
      <View style={{ width: '100%', paddingHorizontal: 10 }}>

        <Text style={[styles.title, { color: theme.colors.onSurface }, {fontSize:18, fontFamily: 'Poppins_600SemiBold'}]}>Revenue over last 7 days</Text>
      </View>


      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        <Graph />
      </View>


      <AddPaymentButton />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    alignSelf: 'flex-start',

    marginLeft: 20,
    
    marginTop: 20,
    fontFamily: 'Poppins_700Bold',

  },
});


