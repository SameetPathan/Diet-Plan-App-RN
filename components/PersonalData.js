import React, { useState ,useEffect } from 'react';
import { StyleSheet, View, Text,ImageBackground } from 'react-native';
import { Button, TextInput, Card, IconButton } from 'react-native-paper';
import {  userdetails } from '../firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue } from 'firebase/database';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();

const UserProfile = () => {

  
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [healthIssue, setHealthIssue] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');



 

  const handleUpdate = async ()  => {
    const phone = await AsyncStorage.getItem('phone');
    userdetails(phone,name,bloodGroup,location,healthIssue,age,dob)
    
  };

 
  
  useEffect(()  => {
    const dbb = getDatabase();
    AsyncStorage.getItem('phone').then((phoneNumber) => {
        const userRef = ref(dbb, 'Userdetails/' + phoneNumber);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if(data){
            setName(data.name);
            setAge(data.age);
            setBloodGroup(data.bloodgroup);
            setLocation(data.location);
            setHealthIssue(data.healthIssue);
            setDob(data.dob);
            }
          });
      })
      .catch((error) => {
        alert(error);
    });
    
    return () => {
        unsubscribe();
      };
  }, []);

  return (
    <ImageBackground
    source={require('../assets/b1.jpg')}
    style={styles.background}
  >
  
    <View style={styles.overlay} />
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
   
      <Card style={styles.card}>
        <Card.Title title="User Information" />
        <Card.Content>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Blood Group"
            value={bloodGroup}
            onChangeText={setBloodGroup}
            style={styles.input}
          />
          <TextInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <TextInput
            label="Health Issue"
            value={healthIssue}
            onChangeText={setHealthIssue}
            style={styles.input}
          />
          <TextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
          />
          <TextInput
            label="Date of Birth"
            value={dob}
            onChangeText={setDob}
            style={styles.input}
          />
        </Card.Content>
      </Card>
      <Button style={styles.button} mode="contained" onPress={handleUpdate}>
        Update Profile
      </Button>
    </View>
    </ScrollView>
   
    </ImageBackground>
  );
};


const UserDashboard = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [healthIssue, setHealthIssue] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');


  useEffect(()  => {
    const dbb = getDatabase();
    AsyncStorage.getItem('phone').then((phoneNumber) => {
        const userRef = ref(dbb, 'Userdetails/' + phoneNumber);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if(data){
            setName(data.name);
            setAge(data.age);
            setBloodGroup(data.bloodgroup);
            setLocation(data.location);
            setHealthIssue(data.healthIssue);
            setDob(data.dob);
            }
          });
      })
      .catch((error) => {
        alert(error);
    });
    
    return () => {
        unsubscribe();
      };
  }, []);


  return (
    <ImageBackground
    source={require('../assets/b1.jpg')}
    style={stylesd.background}
  > 
    <View style={stylesd.overlay} />
   
    <View style={stylesd.container}>
  
      <View style={stylesd.header}>
        <Text style={stylesd.title}>User Dashboard</Text>
        <IconButton
          icon="pencil"
          size={20}
          onPress={() => navigation.navigate('User Info')}
        />
      </View>
      <Card style={stylesd.card}>
        <Card.Title title={name} subtitle={`Age: ${age}`} />
        <Card.Content>
          <View style={stylesd.field}>
            <Text style={stylesd.label}>Blood Group:</Text>
            <Text>{bloodGroup}</Text>
          </View>
          <View style={stylesd.field}>
            <Text style={stylesd.label}>Location:</Text>
            <Text>{location}</Text>
          </View>
          <View style={stylesd.field}>
            <Text style={stylesd.label}>Health Issue:</Text>
            <Text>{healthIssue}</Text>
          </View>
          <View style={stylesd.field}>
            <Text style={stylesd.label}>Date of Birth:</Text>
            <Text>{dob}</Text>
          </View>
        </Card.Content>
      </Card>
    
    </View>
    </ImageBackground>
  );
};

const stylesd = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
  container: {
    flex: 1,
    padding: 20,
    marginTop:20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
  card: {
    marginBottom: 20,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    marginTop: 20,
  },
});




const PersonalData = () => {

 
  

  return (
    <Tab.Navigator >
      <Tab.Screen name="User Dashboard"  component={UserDashboard}  />
      <Tab.Screen name="User Info"  component={UserProfile}  />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop:20,
  },
  card: {
    marginVertical: 20,
  },
  input: {
    marginVertical: 10,
  },
  iconButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  button: {
    marginTop: 20,
  },
});

export default PersonalData;
