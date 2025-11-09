// pantallas/FavoritesScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { auth } from '../config/firebaseConfig';
import { obtenerFavoritos, eliminarDeFavoritos } from '../servicios/firebaseService';
import FoodCard from '../componentes/FoodCard';

const FavoritesScreen = ({ navigation }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    cargarFavoritos();
  }, []);

  // Recargar favoritos cuando la pantalla obtiene foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarFavoritos();
    });

    return unsubscribe;
  }, [navigation]);

  const cargarFavoritos = async () => {
    try {
      setLoading(true);
      const favoritosData = await obtenerFavoritos(user.uid);
      setFavoritos(favoritosData);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      Alert.alert('Error', 'No se pudieron cargar los favoritos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarFavoritos();
    setRefreshing(false);
  };

  const handleEliminarFavorito = (favorito) => {
    Alert.alert(
      'Eliminar Favorito',
      `¿Deseas eliminar "${favorito.nombre}" de tus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarDeFavoritos(favorito.id);
              setFavoritos(favoritos.filter(f => f.id !== favorito.id));
              Alert.alert('Éxito', 'Producto eliminado de favoritos');
            } catch (error) {
              console.error('Error al eliminar favorito:', error);
              Alert.alert('Error', 'No se pudo eliminar el favorito');
            }
          }
        }
      ]
    );
  };

  const renderFavorito = ({ item }) => (
    <View style={styles.favoritoContainer}>
      <View style={styles.foodCardContainer}>
        <FoodCard
          producto={{
            product_name: item.nombre,
            brands: item.marca,
            image_url: item.imagen,
            nutriments: item.nutrientes,
            code: item.productoId
          }}
          onPress={() => navigation.navigate('FoodDetail', {
            producto: {
              product_name: item.nombre,
              brands: item.marca,
              image_url: item.imagen,
              nutriments: item.nutrientes,
              code: item.productoId
            }
          })}
        />
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleEliminarFavorito(item)}
      >
        <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>❤️</Text>
      <Text style={styles.emptyTitle}>Sin Favoritos</Text>
      <Text style={styles.emptyText}>
        Aún no has agregado productos a tus favoritos
      </Text>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.searchButtonText}>Buscar Productos</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Mis Favoritos</Text>
      {favoritos.length > 0 && (
        <Text style={styles.headerSubtitle}>
          {favoritos.length} {favoritos.length === 1 ? 'producto' : 'productos'}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        renderItem={renderFavorito}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loading && renderEmpty}
        contentContainerStyle={[
          styles.listContainer,
          favoritos.length === 0 && styles.listContainerEmpty
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  listContainer: {
    paddingVertical: 8
  },
  listContainerEmpty: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  headerContainer: {
    padding: 16,
    paddingTop: 24
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d'
  },
  favoritoContainer: {
    marginBottom: 8
  },
  foodCardContainer: {
    position: 'relative'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    marginHorizontal: 16,
    marginTop: -4,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 16,
    opacity: 0.3
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24
  },
  searchButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  }
});

export default FavoritesScreen;