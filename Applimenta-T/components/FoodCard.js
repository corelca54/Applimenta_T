// componentes/FoodCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FoodCard = ({ producto, onPress }) => {
  // Obtener información básica del producto
  const nombre = producto.product_name || producto.nombre || 'Sin nombre';
  const marca = producto.brands || producto.marca || 'Sin marca';
  const imagen = producto.image_url || producto.imagen || 'https://via.placeholder.com/150';
  
  // Obtener información nutricional
  const nutrientes = producto.nutriments || producto.nutrientes || {};
  const calorias = nutrientes['energy-kcal_100g'] || nutrientes.calorias || 0;
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: imagen }} 
        style={styles.imagen}
        resizeMode="cover"
      />
      
      <View style={styles.contenido}>
        <Text style={styles.nombre} numberOfLines={2}>
          {nombre}
        </Text>
        
        <Text style={styles.marca} numberOfLines={1}>
          {marca}
        </Text>
        
        <View style={styles.infoNutricional}>
          <View style={styles.caloriasBadge}>
            <Text style={styles.caloriasTexto}>{Math.round(calorias)} kcal</Text>
          </View>
          
          {nutrientes.proteins_100g && (
            <Text style={styles.nutrienteInfo}>
              Proteínas: {Math.round(nutrientes.proteins_100g)}g
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  imagen: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0'
  },
  contenido: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between'
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4
  },
  marca: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 8
  },
  infoNutricional: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  caloriasBadge: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8
  },
  caloriasTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  nutrienteInfo: {
    fontSize: 11,
    color: '#7f8c8d'
  }
});

export default FoodCard;