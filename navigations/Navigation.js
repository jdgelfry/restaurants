import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FavoritesStack from '../navigations/FavoritesStack';
import RestaurantsStack from './RestaurantsStack';
import TopRestaurantsStack from './TopRestaurantsStack';
import SearchStack from '../navigations/SearchStack';
import AccountStack from '../navigations/AccountStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="restaurants"
                    component={RestaurantsStack}
                    options={{title:"Restaurantes"}}
                />
                <Tab.Screen
                    name="favorites"
                    component={FavoritesStack}
                    options={{title:"Favoritos"}}
                />
                <Tab.Screen
                    name="topRestaurants"
                    component={TopRestaurantsStack}
                    options={{title:"Top 5"}}
                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{title:"Buscar"}}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{title:"Cuenta"}}
                />
                
            </Tab.Navigator>
        </NavigationContainer>
    )
}
