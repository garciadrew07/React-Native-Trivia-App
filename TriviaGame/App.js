import React, {Component} from 'react';
import { StackNavigator } from "react-navigation";
import homeScreen from "./screens/homeScreen";
import triviaScreen from "./screens/triviaScreen";




export default (App = StackNavigator(
    {
         Home: { screen: homeScreen },
        Trivia: { screen: triviaScreen }
     },

));





