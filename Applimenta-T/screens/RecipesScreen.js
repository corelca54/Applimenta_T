// screens/RecipesScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { buscarRecetas } from '../services/edamamApi';

// Un componente de tarjeta para mostrar la receta
const RecipeCard =React.memo(({ recipe, onPress }) => {
  const { label, image, source, calories, ingredientLines } = recipe;
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{label}</Text>
        <Text style={styles.cardSource} numberOfLines={1}>Por: {source}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardCalories}>{Math.round(calories)} kcal</Text>
          <Text style={styles.cardIngredients}>{ingredientLines.length} ingredientes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function RecipesScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    
    Keyboard.dismiss();
    setLoading(true);
    setSearched(true);
    setRecipes([]);

    try {
      const results = await buscarRecetas(query);
      // Mapeamos los resultados para quedarnos solo con lo que necesitamos
      const formattedResults = results.map(hit => hit.recipe);
      setRecipes(formattedResults);
    } catch (error) {
      console.error("Error al buscar recetas:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#27ae60" />
      ) : (
        <Text style={styles.emptyText}>
          {searched ? 'No se encontraron recetas.' : 'Busca recetas por ingrediente o nombre (ej. "pollo" o "sopa saludable")'}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra de Búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar recetas saludables..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Lista de Resultados */}
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => item.uri || index.toString()}
        renderItem={({ item }) => (
          <RecipeCard 
            recipe={item} 
            onPress={() => {
              // --- ¡CAMBIO APLICADO! ---
              // Ahora esto navega a la pantalla de detalle
              navigation.navigate('RecipeDetail', { recipe: item });
            }} 
          />
        )}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  cardSource: {
    fontSize: 12,
    color: '#95a5a6',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c',
  },
  cardIngredients: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  }
});