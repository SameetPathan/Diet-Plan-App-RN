import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, ref, get} from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

const  Login = ({ navigation })  => {

    
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    
    const handleRegisterFirst=()=>{
        navigation.navigate('Register');
    }

    const handleLogin = async () => {
      const db = getDatabase();
      const userRef = ref(db, "users/" + phone);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();

      if (phone && password) {
        if (!userData) {
          alert("Login Failed");
        } else {
          if (userData.password === password) {
            await AsyncStorage.setItem("phone", phone);
            navigation.navigate("Home");
          } else {
            alert("Login Failed");
          }
        }
      } else {
        alert("Please Enter All Feilds");
      }
    };

    return (
      <ImageBackground
        source={require('../assets/b1.jpg')}
        style={styleslogin.background}
      >
        <View style={styleslogin.overlay} />
        <View style={styleslogin.container}>
          <AntDesign name="login" size={100} color="white" style={styleslogin.logo} />
          <TextInput label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styleslogin.input} />
          <TextInput label="Password"  value={password}
            onChangeText={setPassword} secureTextEntry style={styleslogin.input}  />
          <Button mode="contained" style={styleslogin.button} onPress={handleLogin}>
            Login
          </Button>

          
          <View style={styleslogin.signup}>
            <MaterialIcons name="person-add" size={20} color="white" />
            <Button mode="text" style={styleslogin.signupText} onPress={handleRegisterFirst}>
              Sign up
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  };
  
  const styleslogin = StyleSheet.create({
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      marginBottom: 50,
    },
    input: {
      width: '80%',
      marginVertical: 10,
    },
    button: {
      width: '80%',
      marginVertical: 10,
    },
    signup: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    signupText: {
      color: 'white',
      marginLeft: 5,
    },
  });

  export default Login


