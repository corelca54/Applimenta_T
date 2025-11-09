// componentes/NutritionInfo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NutritionInfo = ({ nutrientes, porcion = 100 }) => {
  const calorias = nutrientes['energy-kcal_100g'] || nutrientes.calorias || 0;
  const proteinas = nutrientes.proteins_100g || nutrientes.proteinas || 0;
  const carbohidratos = nutrientes.carbohydrates_100g || nutrientes.carbohidratos || 0;
  const grasas = nutrientes.fat_100g || nutrientes.grasas || 0;
  const fibra = nutrientes.fiber_100g || nutrientes.fibra || 0;
  const azucares = nutrientes.sugars_100g || nutrientes.azucares || 0;
  const sodio = nutrientes.sodium_100g || nutrientes.sodio || 0;
  const sal = nutrientes.salt_100g || nutrientes.sal || 0;

  // Calcular porcentaje del valor diario recomendado
  const calcularPorcentajeVD = (valor, valorDiario) => {
    return Math.round((valor / valorDiario) * 100);
  };

  const NutrienteRow = ({ nombre, valor, unidad, porcentajeVD }) => (
    <View style={styles.nutrienteRow}>
      <Text style={styles.nutrienteNombre}>{nombre}</Text>
      <View style={styles.nutrienteValores}>
        <Text style={styles.nutrienteValor}>
          {Math.round(valor * 10) / 10}{unidad}
        </Text>
        {porcentajeVD && (
          <Text style={styles.porcentajeVD}>{porcentajeVD}% VD</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>InformaciÃģn Nutricional</Text>
        <Text style={styles.porcion}>Por {porcion}g</Text>
      </View>

      <View style={styles.divider} />

      {/* CalorÃ­as - Destacado */}
      <View style={styles.caloriasContainer}>
        <Text style={styles.caloriasLabel}>CalorÃ­as</Text>
        <Text style={styles.caloriasValor}>{Math.round(calorias)}</Text>
      </View>

      <View style={styles.divider} />

      {/* Macronutrientes principales */}
      <Text style={styles.subtitulo}>Macronutrientes</Text>
      
      <NutrienteRow 
        nombre="Grasas Totales" 
        valor={grasas} 
        unidad="g"
        porcentajeVD={calcularPorcentajeVD(grasas, 70)}
      />
      
      <NutrienteRow 
        nombre="Carbohidratos" 
        valor={carbohidratos} 
        unidad="g"
        porcentajeVD={calcularPorcentajeVD(carbohidratos, 275)}
      />
      
      {azucares > 0 && (
        <View style={styles.subNutriente}>
          <NutrienteRow 
            nombre="  AzÃšcares" 
            valor={azucares} 
            unidad="g"
          />
        </View>
      )}
      
      <NutrienteRow 
        nombre="ProteÃ­nas" 
        valor={proteinas} 
        unidad="g"
        porcentajeVD={calcularPorcentajeVD(proteinas, 50)}
      />

      {fibra > 0 && (
        <>
          <View style={styles.divider} />
          <Text style={styles.subtitulo}>Otros Nutrientes</Text>
          
          <NutrienteRow 
            nombre="Fibra DietÃĐtica" 
            valor={fibra} 
            unidad="g"
            porcentajeVD={calcularPorcentajeVD(fibra, 25)}
          />
        </>
      )}

      {(sodio > 0 || sal > 0) && (
        <NutrienteRow 
          nombre="Sodio" 
          valor={sodio > 0 ? sodio : sal * 0.4} 
          unidad="g"
          porcentajeVD={calcularPorcentajeVD(sodio > 0 ? sodio : sal * 0.4, 2.3)}
        />
      )}

      <View style={styles.divider} />
      
      <Text style={styles.notaVD}>
        * Porcentaje del Valor Diario (VD) basado en una dieta de 2000 calorÃ­as
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  header: {
    marginBottom: 12
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4
  },
  porcion: {
    fontSize: 14,
    color: '#7f8c8d'
  },
  divider: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginVertical: 12
  },
  caloriasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  caloriasLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50'
  },
  caloriasValor: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e74c3c'
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    marginTop: 4
  },
  nutrienteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  nutrienteNombre: {
    fontSize: 15,
    color: '#2c3e50',
    flex: 1
  },
  nutrienteValores: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nutrienteValor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 12
  },
  porcentajeVD: {
    fontSize: 13,
    color: '#7f8c8d',
    minWidth: 50,
    textAlign: 'right'
  },
  subNutriente: {
    marginLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#ecf0f1',
    paddingLeft: 12
  },
  notaVD: {
    fontSize: 11,
    color: '#95a5a6',
    fontStyle: 'italic',
    marginTop: 4
  }
});

export default NutritionInfo;