import React from 'react';
import { View, Text, FlatList, StyleSheet,ImageBackground } from 'react-native';


const DATA = {
  "foods": [
    {
      "food": "Eggs",
      "calories": 78,
      "description": "Eggs are a great source of protein and can be prepared in many different ways."
    },
    {
      "food": "Bacon",
      "calories": 43,
      "description": "Bacon is a popular breakfast food that is made from cured pork belly."
    },
    {
      "food": "Toast",
      "calories": 79,
      "description": "Toast is a common breakfast food made from sliced bread that has been toasted until crispy."
    },
    {
      "food": "Orange Juice",
      "calories": 112,
      "description": "Orange juice is a popular breakfast beverage that is made by squeezing fresh oranges."
    },
    {
      "food": "Coffee",
      "calories": 2,
      "description": "Coffee is a popular beverage made from roasted coffee beans."
    },
    {
      "food": "Oatmeal",
      "calories": 150,
      "description": "Oatmeal is a popular breakfast food made from oats that have been cooked with milk or water."
    },
    {
      "food": "Yogurt",
      "calories": 100,
      "description": "Yogurt is a dairy product that is made by fermenting milk with bacteria."
    },
    {
      "food": "Banana",
      "calories": 105,
      "description": "Bananas are a popular fruit that are high in potassium and other nutrients."
    },
    {
      "food": "Blueberries",
      "calories": 84,
      "description": "Blueberries are a small, sweet fruit that are high in antioxidants and other nutrients."
    },
    {
      "food": "Bagel",
      "calories": 245,
      "description": "A bagel is a round bread product that is typically sliced in half and toasted before being eaten."
    },
    {
      "food": "Cream Cheese",
      "calories": 50,
      "description": "Cream cheese is a soft, spreadable cheese that is often used as a topping for bagels and other breakfast foods."
    },
    {
      "food": "Peanut Butter",
      "calories": 190,
      "description": "Peanut butter is a spread made from ground peanuts that is high in protein and healthy fats."
    },
    {
      "food": "Jelly",
      "calories": 50,
      "description": "Jelly is a sweet spread made from fruit juice, sugar, and pectin."
    },
    {
      "food": "Granola",
      "calories": 120,
      "description": "Granola is a breakfast food made from rolled oats, nuts, and dried fruit that has been baked until crispy."
    },
    {
      "food": "Almonds",
      "calories": 160,
      "description": "Almonds are a type of nut that are high in protein, healthy fats, and other nutrients."
    },
    {
      "food": "Avocado",
      "calories": 234,
      "description": "Avocado is a fruit that is high in healthy fats and other nutrients. It is often used as a topping for toast and other breakfast foods."
    }
   
  ]
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  calorie: {
    fontSize: 16,
    color: '#888',
  },
  description: {
    fontSize: 18,
    color: '#333',
  },
});

const FoodList = () => {



  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.food}</Text>
      <Text style={styles.calorie}>{item.calories} calories</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <ImageBackground
        source={require('../assets/b1.jpg')}
        style={styles.background}
      >

        <View style={styles.overlay} />
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.title2}>Calorie Chart</Text>
    </View>
      <FlatList
        data={DATA.foods}
        renderItem={renderItem}
        keyExtractor={item => item.food}
        showsHorizontalScrollIndicator={false}
      />
    </View>
    </ImageBackground>
  );
}

export default FoodList;
