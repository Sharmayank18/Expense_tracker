import { AuthProvider } from '@/contexts/authcontexts';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const StackLayout = () => {
  return (
   
   <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen 
        name = "(modals)/profileModal"
        options={{
            presentation : "modal",
        }
        }
        />
        <Stack.Screen 
        name = "(modals)/walletModal"
        options={{
            presentation : "modal",
        }
        }
        />
        <Stack.Screen 
        name = "(modals)/TransactionalModal"
        options={{
            presentation : "modal",
        }
        }
        />
    </Stack>


  )
};

export default function RootLayout(){
    return(
        <AuthProvider>
            <StackLayout/>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({})