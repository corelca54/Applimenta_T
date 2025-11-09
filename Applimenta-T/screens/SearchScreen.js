// pantallas/SearchScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { buscarProductos } from '../services/openFoodFactsApi';
import FoodCard from '../components/FoodCard';

const SearchScreen = ({ navigation }) => {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);

  const realizarBusqueda = async () => {
    if (!busqueda.trim()) {
      Alert.alert('Error', 'Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    setBuscado(true);

    try {
      const resultados = await buscarProductos(busqueda);
      setProductos(resultados);

      if (resultados.length === 0) {
        Alert.alert(
          'Sin resultados',
          'No se encontraron productos para tu búsqueda'
        );
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      Alert.alert('Error', 'No se pudo realizar la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda('');
    setProductos([]);
    setBuscado(false);
  };

  const renderProducto = ({ item }) => (
    <FoodCard
      producto={item}
      onPress={() => navigation.navigate('FoodDetail', { producto: item })}
    />
  );

  const renderHeader = () => (
    <View>
      {/* Búsquedas sugeridas */}
      {!buscado && (
        <View style={styles.sugerenciasContainer}>
          <Text style={styles.sugerenciasTitulo}>Búsquedas Populares</Text>
          <View style={styles.sugerenciasGrid}>
            <TouchableOpacity
              style={styles.sugerenciaChip}
              onPress={() => {
                setBusqueda('arepas');
                setTimeout(() => realizarBusqueda(), 100);
              }}
            >
              <Text style={styles.sugerenciaTexto}>🫓 Arepas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sugerenciaChip}
              onPress={() => {
                setBusqueda('aguacate');
                setTimeout(() => realizarBusqueda(), 100);
              }}
            >
              <Text style={styles.sugerenciaTexto}>🥑 Aguacate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sugerenciaChip}
              onPress={() => {
                setBusqueda('chocolate');
                setTimeout(() => realizarBusqueda(), 100);
              }}
            >
              <Text style={styles.sugerenciaTexto}>🍫 Chocolate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sugerenciaChip}
              onPress={() => {
                setBusqueda('café');
                setTimeout(() => realizarBusqueda(), 100);
              }}
            >
              <Text style={styles.sugerenciaTexto}>☕ Café</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sugerenciaChip}
              onPress={() => {
                setBusqueda('frijoles');
                setTimeout(() => realizarBusqueda(), 100);
              }}
            >
              <Text style={styles.sugerenciaTexto}>🫘 Frijoles</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sugerenciaChip}
              onPress={() => {
                setBusqueda('maíz');
                setTimeout(() => realizarBusqueda(), 100);
              }}
            >
              <Text style={styles.sugerenciaTexto}>🌽 Maíz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Resultados de búsqueda */}
      {buscado && productos.length > 0 && (
        <View style={styles.resultadosHeader}>
          <Text style={styles.resultadosTexto}>
            {productos.length} productos encontrados
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alimentos..."
            value={busqueda}
            onChangeText={setBusqueda}
            onSubmitEditing={realizarBusqueda}
            returnKeyType="search"
          />
          {busqueda.length > 0 && (
            <TouchableOpacity onPress={limpiarBusqueda}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={realizarBusqueda}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.searchButtonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Lista de productos */}
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item, index) => item.code || item.id || index.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          buscado && !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No se encontraron productos</Text>
              <Text style={styles.emptySubtext}>
                Intenta con otros términos de búsqueda
              </Text>
            </View>
          ) : null
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
  searchBar: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 8
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#2c3e50'
  },
  clearIcon: {
    fontSize: 20,
    color: '#95a5a6',
    paddingHorizontal: 8
  },
  searchButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12
  },
  searchButtonDisabled: {
    backgroundColor: '#95a5a6'
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  listContainer: {
    paddingVertical: 8
  },
  sugerenciasContainer: {
    padding: 16
  },
  sugerenciasTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16
  },
  sugerenciasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  sugerenciaChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  sugerenciaTexto: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600'
  },
  resultadosHeader: {
    padding: 16,
    paddingBottom: 8
  },
  resultadosTexto: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '600'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center'
  }
});

export default SearchScreen;