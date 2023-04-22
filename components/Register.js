import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View ,Text } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { register } from '../firebaseconfig';

const Register=({ navigation }) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
  
    const handleRegister = () => {
   
      if(name && phone && email && password ){
        register(name, phone, email,  password)
        navigation.navigate('Login');
      }else{
        alert("Please Enter Valid Information")
      }
      
      
    };

    const handleAlreadyRegistered = () => {
        navigation.navigate('Login');
      };
  
    return (
      <ImageBackground
        source={require('../assets/b1.jpg')}
        style={stylesregister.background}
      >
        <View style={stylesregister.overlay} />
        <View style={stylesregister.container}>
          <AntDesign name="adduser" size={100} color="white" style={stylesregister.logo} />
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={stylesregister.input}
          />
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={stylesregister.input}
            keyboardType="phone-pad"
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={stylesregister.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={stylesregister.input}
            secureTextEntry
          />
         
          <Button mode="contained" style={stylesregister.button} onPress={handleRegister}>
            Register
          </Button>

          <View style={stylesregister.signin}>
           
            <Button mode="text" style={stylesregister.signupText} onPress={handleAlreadyRegistered}>
            <MaterialIcons name="person" size={20} color="white" style={{paddingTop:20}} />      Sign in
            </Button>
        </View>

    

        </View>
      </ImageBackground>
    );
  };
  
  const stylesregister = StyleSheet.create({
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
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
  picker: {
    width: '80%',
    marginVertical: 10,
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
  },
  alreadyRegistered: {
    marginTop: 20,
},
alreadyRegisteredText: {
    color: 'white',
    fontSize: 16,
},
loginLink: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 5,
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

  export default Register;


  