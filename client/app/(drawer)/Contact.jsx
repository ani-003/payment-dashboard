import { View, StyleSheet, Linking } from 'react-native'
import { Card, Text, Button, useTheme, Avatar } from 'react-native-paper';
import React from 'react'
import TopMenu from '../../components/allScreens/TopMenu'


const Contact = () => {

  const theme = useTheme();

  const openLink = (url) => Linking.openURL(url);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
    <TopMenu onProfilePress={() => console.log('Profile pressed')} />

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={3}>
      <Card.Title
        title="Anirban Das"
        titleStyle={styles.title}
        left={() => <Avatar.Text label="AD" size={40} />}
      />
      <Card.Content>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.link} onPress={() => openLink('mailto:anirban.d.2003@gmail.com')}>
            anirban.d.2003@gmail.com
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>LinkedIn:</Text>
          <Text
            style={styles.link}
            onPress={() =>
              openLink('https://www.linkedin.com/in/anirban-das-727440246/')
            }
          >
            linkedin.com/in/anirban-das
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>GitHub:</Text>
          <Text
            style={styles.link}
            onPress={() => openLink('https://github.com/ani-003')}
          >
            github.com/ani-003
          </Text>
        </View>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => openLink('mailto:anirban.d.2003@gmail.com')}
        >
          Email Me
        </Button>
      </Card.Actions>
    </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    borderRadius: 12,
    width: '80%',
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoRow: {
    marginVertical: 8,
  },
  label: {
    fontWeight: '600',
    color: '#444',
  },
  link: {
    color: '#1e88e5',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});



export default Contact