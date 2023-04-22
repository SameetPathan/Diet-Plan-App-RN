import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FoodList from './CalorieChart';
import TakeTestML from './TakeTestML';
import PersonalData from './PersonalData';
import ReportGenerated from './ReportGenerated';

const Tab = createMaterialBottomTabNavigator();



const Home = () => {
  return (
 

    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={PersonalData} />
      <Tab.Screen name="Report Generated" component={ReportGenerated} />
      <Tab.Screen name="Take AI Test" component={TakeTestML} />
      <Tab.Screen name="Calorie Chart" component={FoodList} />
    </Tab.Navigator>
   
  );
}

export default Home