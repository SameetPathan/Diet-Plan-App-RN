import React,{useState,useEffect} from 'react';
import { View, Text, FlatList, StyleSheet,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue } from 'firebase/database';


const ReportGenerated = () => {


  const [dietPlan, setDietPlan] = useState("");



  useEffect(()  => {
    const dbb = getDatabase();
    AsyncStorage.getItem('phone').then((phoneNumber) => {
        const userRef = ref(dbb, 'userReport/' + phoneNumber);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if(data){
              setDietPlan(data.plan)
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

  const renderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <FlatList
          data={item.foods}
          renderItem={({ item }) => (
            <View style={styles.foodItem}>
              <Text>{item.food}</Text>
              <Text>{item.calories} calories</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <ImageBackground
    source={require('../assets/b1.jpg')}
    style={styles.background}
  >
 
    <View style={styles.overlay} />
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.title}>Diet Plan (30 days)</Text>
    </View>

      <FlatList
        data={[
          { title: 'Breakfast', foods: dietPlan.breakfast },
          { title: 'Lunch', foods: dietPlan.lunch },
          { title: 'Snack', foods: dietPlan.snack },
          { title: 'Dinner', foods: dietPlan.dinner },
        ]}
        renderItem={renderCard}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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
    padding: 10,
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
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});

export default ReportGenerated;
