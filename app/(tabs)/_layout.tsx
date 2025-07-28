import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import customtabs from "../../components/customtabs";

const _layout = () => {
  return (
   <Tabs tabBar={customtabs}  screenOptions={{headerShown : false}}>
    <Tabs.Screen name = "index"/>
    <Tabs.Screen name = "statistics"/>
    <Tabs.Screen name = "wallet"/>
    <Tabs.Screen name = "profile"/>
   
   </Tabs>
     
  );
}

export default _layout

const styles = StyleSheet.create({})