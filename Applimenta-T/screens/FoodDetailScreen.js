// pantallas/FoodDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { auth } from '../config/firebaseConfig';
import { agregarAFavoritos, estaEnFavoritos } from '../services/firebaseService';
import NutritionInfo from '../components/NutritionInfo';

const FoodDetailScreen = ({ route, navigation }) => {
  const { producto } = route.params;
  const [esFavorito, setEsFavorito] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    verificarFavorito();
  }, []);

  const verificarFavorito = async () => {
    if (producto.code || producto.id) {
      const favorito = await estaEnFavoritos(user.uid, producto.code || producto.id);
      setEsFavorito(favorito);
    }
  };
  // Validar que el producto tenga información mínima requerida
  const validarProducto = (prod) => {
    return prod && (prod.product_name || prod.nombre || prod.brands || prod.marca);
  };

  if (!validarProducto(producto)) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Ingrese un item válido</Text>
        </View>
      </View>
    );
  }


  const toggleFavorito = async () => {
    setLoading(true);
    
    try {
      if (esFavorito) {
        Alert.alert('Información', 'Para eliminar de favoritos, ve a la pantalla de Favoritos');
      } else {
        await agregarAFavoritos(user.uid, producto);
        setEsFavorito(true);
        Alert.alert('¡Éxito!', 'Producto agregado a favoritos');
      }
    } catch (error) {
      console.error('Error al manejar favorito:', error);
      Alert.alert('Error', 'No se pudo agregar a favoritos');
    } finally {
      setLoading(false);
    }
  };

  // Extraer información del producto
  const nombre = producto.product_name || producto.nombre || 'Producto';
  const marca = producto.brands || producto.marca || 'Marca no disponible';
  const imagen = producto.image_url || producto.imagen || 'https://via.placeholder.com/300';
  const categorias = producto.categories_tags || producto.categorias || [];
  const nutrientes = producto.nutriments || producto.nutrientes || {};

  return (
    <ScrollView style={styles.container}>
      {/* Imagen del producto */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imagen }}
          style={styles.productImage}
          resizeMode="contain"
        />
        
        {/* Botón de favorito flotante */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorito}
          disabled={loading}
        >
          <Text style={styles.favoriteIcon}>
            {esFavorito ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Información básica */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{nombre}</Text>
        <Text style={styles.brandName}>{marca}</Text>

        {/* Categorías */}
        {categorias.length > 0 && (
          <View style={styles.categoriesContainer}>
            {categorias.slice(0, 3).map((categoria, index) => (
              <View key={index} style={styles.categoryChip}>
                <Text style={styles.categoryText}>
                  {categoria.replace('en:', '').replace(/-/g, ' ')}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Código de barras */}
        {producto.code && (
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Código de barras:</Text>
            <Text style={styles.codeValue}>{producto.code}</Text>
          </View>
        )}
      </View>

      {/* Información nutricional */}
      <View style={styles.nutritionContainer}>
        <NutritionInfo nutrientes={nutrientes} />
      </View>

      {/* Ingredientes */}
      {producto.ingredients_text && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          <Text style={styles.ingredientsText}>
            {producto.ingredients_text}
          </Text>
        </View>
      )}

      {/* Información adicional */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Adicional</Text>
        
        {producto.quantity && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cantidad:</Text>
            <Text style={styles.infoValue}>{producto.quantity}</Text>
          </View>
        )}

        {producto.serving_size && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Porción:</Text>
            <Text style={styles.infoValue}>{producto.serving_size}</Text>
          </View>
        )}

        {producto.countries_tags && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>País:</Text>
            <Text style={styles.infoValue}>
              {producto.countries_tags[0]?.replace('en:', '').toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Sellos nutricionales */}
      {(nutrientes['nutrition-score-fr'] || 
        nutrientes.salt_100g > 1 || 
        nutrientes.sugars_100g > 10) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advertencias Nutricionales</Text>
          
          {nutrientes.salt_100g > 1 && (
            <View style={[styles.warningChip, styles.warningHigh]}>
              <Text style={styles.warningText}>⚠️ Alto en sodio</Text>
            </View>
          )}
          
          {nutrientes.sugars_100g > 10 && (
            <View style={[styles.warningChip, styles.warningHigh]}>
              <Text style={styles.warningText}>⚠️ Alto en azúcares</Text>
            </View>
          )}
          
          {nutrientes.fat_100g > 20 && (
            <View style={[styles.warningChip, styles.warningMedium]}>
              <Text style={styles.warningText}>⚠️ Alto en grasas</Text>
            </View>
          )}
        </View>
      )}

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Funcionalidad', 'Próximamente podrás agregar este producto a tu plan')}
        >
          <Text style={styles.actionButtonText}>➕ Agregar al Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSecondary]}
          onPress={() => Alert.alert('Funcionalidad', 'Próximamente podrás compartir productos')}
        >
          <Text style={styles.actionButtonTextSecondary}>📤 Compartir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    emptyText: {
      fontSize: 18,
      color: '#e74c3c',
      fontWeight: '600',
      textAlign: 'center'
    },

  imageContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    position: 'relative'
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: 12
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  favoriteIcon: {
    fontSize: 28
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 2
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8
  },
  brandName: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 16
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  categoryChip: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8
  },
  categoryText: {
    color: '#27ae60',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  codeLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginRight: 8
  },
  codeValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
    fontFamily: 'monospace'
  },
  nutritionContainer: {
    paddingHorizontal: 16,
    marginTop: 2
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12
  },
  ingredientsText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1'
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d'
  },
  infoValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600'
  },
  warningChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8
  },
  warningHigh: {
    backgroundColor: '#ffe8e8'
  },
  warningMedium: {
    backgroundColor: '#fff4e6'
  },
  warningText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '600'
  },
  actionsContainer: {
    padding: 16,
    gap: 12
  },
  actionButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  actionButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#27ae60'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  actionButtonTextSecondary: {
    color: '#27ae60',
    fontSize: 16,
    fontWeight: '700'
  },
  bottomPadding: {
    height: 20
  }
});

export default FoodDetailScreen;