import React, { useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { userreport } from '../firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from "react-native-elements";

const TakeTestML = () => {
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snacks, setSnacks] = useState('');
  const [steps, setSteps] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [calorieIntake, setCalorieIntake] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [workoutTime, setWorkoutTime] = useState('');
  const [age, setage] = useState('');

  const handleLogout = () => {
    navigation.navigate("Login");
    };
  
  const calculateCalories = () => {
    // calculate the total daily calorie intake based on the user's inputs
    const basalMetabolicRate = 10 * weight + 6.25 * height - 5 * age + 5;
    const activityCalories = (steps / 1000) * workoutTime * 30;
    const sleepCalories = sleepTime * 1.08;
    const workoutCalories = workoutTime * 5.4;
    const totalCalories =
      basalMetabolicRate +
      activityCalories +
      sleepCalories +
      workoutCalories -
      calorieIntake;

    return totalCalories;
  };

  const generateMealPlan = async () => {

    const totalCalories = calculateCalories();
    const phone = await AsyncStorage.getItem('phone');

    // calculate the number of calories for each meal and snack
    const breakfastCalories = Math.round(totalCalories * 0.25);
    const lunchCalories = Math.round(totalCalories * 0.35);
    const snackCalories = Math.round(totalCalories * 0.1);
    const dinnerCalories = Math.round(totalCalories * 0.3);

    // create the meal plan JSON object
    const mealPlan = {
      breakfast: [
        { food: 'Oatmeal', calories: Math.round(breakfastCalories * 0.4) },
        { food: 'Banana', calories: Math.round(breakfastCalories * 0.2) },
        { food: 'Greek Yogurt', calories: Math.round(breakfastCalories * 0.2) },
        { food: 'Almonds', calories: Math.round(breakfastCalories * 0.1) },
        { food: 'Milk', calories: Math.round(breakfastCalories * 0.1) }
      ],
      lunch: [
        { food: 'Grilled Chicken', calories: Math.round(lunchCalories * 0.4) },
        { food: 'Brown Rice', calories: Math.round(lunchCalories * 0.3) },
        { food: 'Broccoli', calories: Math.round(lunchCalories * 0.2) },
        { food: 'Hummus', calories: Math.round(lunchCalories * 0.1) }
      ],
      snack: [
        { food: 'Apple', calories: Math.round(snackCalories * 0.4) },
        { food: 'Carrots', calories: Math.round(snackCalories * 0.3) },
        { food: 'Hummus', calories: Math.round(snackCalories * 0.2) },
        { food: 'Almonds', calories: Math.round(snackCalories * 0.1) }
      ],
      dinner: [
        { food: 'Salmon', calories: Math.round(dinnerCalories * 0.4) },
        { food: 'Sweet Potato', calories: Math.round(dinnerCalories * 0.3) },
        { food: 'Green Beans', calories: Math.round(dinnerCalories * 0.2) },
        { food: 'Mixed Berries', calories: Math.round(dinnerCalories * 0.1) }
      ]
    };

    userreport(phone,mealPlan);
  };

  return (
    <ImageBackground
    source={require('../assets/b1.jpg')}
    style={styles.background}
  >
       <Header
leftComponent={{ icon: "logout", color: "#fff", onPress: handleLogout }}

backgroundColor="green"
/>

   <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.overlay} />
    <View style={styles.container}>
      <Text style={styles.heading}>Give Daily Diet Test</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breakfast</Text>
        <TextInput
          style={styles.input}
          onChangeText={setBreakfast}
          value={breakfast}
          placeholder="What did you eat for breakfast?"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lunch</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLunch}
          value={lunch}
          placeholder="What did you eat for lunch?"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dinner</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDinner}
          value={dinner}
          placeholder="What did you eat for dinner?"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Snacks</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSnacks}
          value={snacks}
          placeholder="What did you eat for snacks?"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Steps</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSteps}
          value={steps}
          keyboardType="numeric"
          placeholder="How many steps did you take today?"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>age </Text>
        <TextInput
          style={styles.input}
          onChangeText={setage}
          value={age}
          placeholder="Enter your age"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (in kg)</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Enter your weight"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (in cm)</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Enter your height"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Daily Calorie Intake</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCalorieIntake}
          value={calorieIntake}
          placeholder="Enter your daily calorie intake"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sleep Time (in hours)</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSleepTime}
          value={sleepTime}
          placeholder="Enter your daily sleep time"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Workout Time (in minutes)</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWorkoutTime}
          value={workoutTime}
          placeholder="Enter your daily workout time"
          placeholderTextColor="#9FA5C0"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={generateMealPlan}>
        <Text style={styles.buttonText}>Analyze and Generate Plan</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </ImageBackground>

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
  
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'white'
  },
  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'yellow'
  },
  input: {
    borderWidth: 1,
    borderColor: '#9FA5C0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: 'white'
    },
    button: {
    backgroundColor: '#5E60CE',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24
    },
    buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
    }
    });
    
    export default TakeTestML;
