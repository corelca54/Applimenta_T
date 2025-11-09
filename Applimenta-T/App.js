// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Importar pantallas
import LoginScreen from './pantallas/LoginScreen';
import RegisterScreen from './pantallas/RegisterScreen';
import HomeScreen from './pantallas/HomeScreen';
import SearchScreen from './pantallas/SearchScreen';
import ScanScreen from './pantallas/ScanScreen';
import FoodDetailScreen from './pantallas/FoodDetailScreen';
import FavoritesScreen from './pantallas/FavoritesScreen';
import ProfileScreen from './pantallas/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación principal con tabs
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#27ae60',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIcon}>
              <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <View style={styles.iconText}>
                  <View style={[styles.iconCircle, { backgroundColor: color }]} />
                </View>
              </View>
            </View>
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#27ae60',
            elevation: 0,
            shadowOpacity: 0
          },
          headerTintColor: '#fff',
          headerTitle: 'Applimenta-T'
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIcon}>
              <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <View style={styles.iconText}>
                  <View style={[styles.iconCircle, { backgroundColor: color }]} />
                </View>
              </View>
            </View>
          ),
          headerShown: true,
          headerTitle: 'Buscar Alimentos',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0
          }
        }}
      />

      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Escanear',
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.scanButton, { backgroundColor: color }]}>
              <View style={styles.scanIcon}>
                <View style={styles.scanInner} />
              </View>
            </View>
          ),
          headerShown: true,
          headerTitle: 'Escanear Código',
          headerStyle: {
            backgroundColor: '#fff'
          }
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIcon}>
              <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <View style={styles.iconText}>
                  <View style={[styles.iconCircle, { backgroundColor: color }]} />
                </View>
              </View>
            </View>
          ),
          headerShown: true,
          headerTitle: 'Mis Favoritos',
          headerStyle: {
            backgroundColor: '#fff'
          }
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIcon}>
              <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <View style={styles.iconText}>
                  <View style={[styles.iconCircle, { backgroundColor: color }]} />
                </View>
              </View>
            </View>
          ),
          headerShown: true,
          headerTitle: 'Mi Perfil',
          headerStyle: {
            backgroundColor: '#fff'
          }
        }}
      />
    </Tab.Navigator>
  );
}

// Navegación de autenticación
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Navegación principal
function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{
          headerTitle: 'Detalle del Producto',
          headerStyle: {
            backgroundColor: '#fff'
          },
          headerTintColor: '#2c3e50'
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconCircle: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  scanButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  scanIcon: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanInner: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2
  }
});