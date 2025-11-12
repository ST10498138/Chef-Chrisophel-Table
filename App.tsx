import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import AddDishScreen from './src/screens/AddDishScreen';
import FilterScreen from './src/screens/FilterScreen';


 
// The structure of a dish in the list

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageIndex?: number;
  ingredients?: string[];
}



const Stack = createNativeStackNavigator();



export default function App() {

  // Creating the centralized state for the list of dishes

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);



  // Function to add a new dish to the list

  const addDish = (dish: MenuItem) => {

    // Adds the new dish to the existing table

    setMenuItems(prevItems => [...prevItems, dish]);

  };

  const deleteDish = (id: string) => {
  setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
  };



  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">

       

        {/* HOME screen: receives the list to display */}

        <Stack.Screen

          name="Home"

          options={{ title: "AT CHEF CHRISTOPHEL'S TABLE" }}

        >

          {/* using a function to pass the navigation props AND our data */}

          {props => (
            <HomeScreen
              {...props}
              menuItems={menuItems}
              deleteDish={deleteDish}
            />
          )}

        </Stack.Screen>



        {/* ADD DISH screen: receives the add function */}

        <Stack.Screen

          name="AddDish"

          options={{ title: "Add Dish" }}

        >



          {/* Using a function to pass the navigation props AND the addDish function */}

          {props => <AddDishScreen {...props} addDish={addDish} />}

        </Stack.Screen>


        <Stack.Screen
          name="Filter"
          
        >
          {props => (
            <FilterScreen
              {...props}
              menuItems={menuItems}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>

    </NavigationContainer>

  );

}