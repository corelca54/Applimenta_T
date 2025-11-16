// screens/RecipeDetailScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Linking 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Componente para un solo ingrediente
const IngredientItem = ({ text }) => (
  <View style={styles.ingredientContainer}>
    <Ionicons name="ellipse-outline" size={14} color="#27ae60" style={styles.ingredientIcon} />
    <Text style={styles.ingredientText}>{text}</Text>
  </View>
);

export default function RecipeDetailScreen({ route, navigation }) {
  // Recibimos la receta completa que pasamos desde la pantalla anterior
  const { recipe } = route.params;

  const openRecipeUrl = () => {
    // Abre la URL original de la receta (en Edamam, etc.) en el navegador
    Linking.openURL(recipe.url).catch(err => console.error("No se pudo abrir la URL:", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.label}</Text>
        <Text style={styles.source}>Receta de: {recipe.source}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoValue}>{Math.round(recipe.calories)}</Text>
          <Text style={styles.infoLabel}>Calorías</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoValue}>{recipe.ingredientLines.length}</Text>
          <Text style={styles.infoLabel}>Ingredientes</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoValue}>{recipe.yield}</Text>
          <Text style={styles.infoLabel}>Porciones</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        {recipe.ingredientLines.map((ingredient, index) => (
          <IngredientItem key={index} text={ingredient} />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={openRecipeUrl}>
        <Text style={styles.buttonText}>Ver Instrucciones Completas</Text>
        <Ionicons name="open-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
  },
  infoBox: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#27ae60',
  },
  infoLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 16,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ingredientIcon: {
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1, // Para que el texto se ajuste si es largo
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
});