// pantallas/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import { auth } from '../config/firebaseConfig';
import { 
  obtenerPlanDelDia, 
  crearPlanAlimentacion,
  obtenerPerfilUsuario 
} from '../services/firebaseService';
import { buscarProductosColombianos } from '../services/openFoodFactsApi';
import { obtenerRecomendacionesDiarias } from '../services/edamamApi';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [plan, setPlan] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Cargar perfil del usuario
      const perfilData = await obtenerPerfilUsuario(user.uid);
      setPerfil(perfilData);

      // Obtener recomendaciones nutricionales
      if (perfilData) {
        const recs = obtenerRecomendacionesDiarias(
          perfilData.edad,
          perfilData.genero,
          perfilData.nivelActividad
        );
        setRecomendaciones(recs);
      }

      // Obtener plan del día
      const fechaHoy = new Date().toISOString().split('T')[0];
      const planData = await obtenerPlanDelDia(user.uid, fechaHoy);
      setPlan(planData);

    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarDatos();
    setRefreshing(false);
  };

  const generarPlanDiario = async () => {
    Alert.alert(
      'Generar Plan',
      '¿Deseas generar un plan de alimentación con productos colombianos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Generar',
          onPress: async () => {
            try {
              setLoading(true);
              
              // Buscar productos colombianos
              const productosColombianos = await buscarProductosColombianos();
              
              if (productosColombianos.length === 0) {
                Alert.alert('Sin productos', 'No se encontraron productos colombianos');
                return;
              }

              // Distribuir productos por comidas
              const desayuno = productosColombianos.slice(0, 2);
              const almuerzo = productosColombianos.slice(2, 5);
              const cena = productosColombianos.slice(5, 7);
              const meriendas = productosColombianos.slice(7, 9);

              // Calcular totales nutricionales
              const calcularTotales = (productos) => {
                return productos.reduce((acc, prod) => {
                  const nutrientes = prod.nutriments || {};
                  return {
                    calorias: acc.calorias + (nutrientes['energy-kcal_100g'] || 0),
                    proteinas: acc.proteinas + (nutrientes.proteins_100g || 0),
                    carbohidratos: acc.carbohidratos + (nutrientes.carbohydrates_100g || 0),
                    grasas: acc.grasas + (nutrientes.fat_100g || 0)
                  };
                }, { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });
              };

              const totalesDesayuno = calcularTotales(desayuno);
              const totalesAlmuerzo = calcularTotales(almuerzo);
              const totalesCena = calcularTotales(cena);
              const totalesMeriendas = calcularTotales(meriendas);

              const totalesGenerales = {
                calorias: totalesDesayuno.calorias + totalesAlmuerzo.calorias + totalesCena.calorias + totalesMeriendas.calorias,
                proteinas: totalesDesayuno.proteinas + totalesAlmuerzo.proteinas + totalesCena.proteinas + totalesMeriendas.proteinas,
                carbohidratos: totalesDesayuno.carbohidratos + totalesAlmuerzo.carbohidratos + totalesCena.carbohidratos + totalesMeriendas.carbohidratos,
                grasas: totalesDesayuno.grasas + totalesAlmuerzo.grasas + totalesCena.grasas + totalesMeriendas.grasas
              };

              // Crear plan
              const fechaHoy = new Date().toISOString().split('T')[0];
              await crearPlanAlimentacion(user.uid, {
                fecha: fechaHoy,
                desayuno: desayuno.map(p => ({
                  id: p.code,
                  nombre: p.product_name,
                  marca: p.brands,
                  imagen: p.image_url,
                  calorias: p.nutriments?.['energy-kcal_100g'] || 0
                })),
                almuerzo: almuerzo.map(p => ({
                  id: p.code,
                  nombre: p.product_name,
                  marca: p.brands,
                  imagen: p.image_url,
                  calorias: p.nutriments?.['energy-kcal_100g'] || 0
                })),
                cena: cena.map(p => ({
                  id: p.code,
                  nombre: p.product_name,
                  marca: p.brands,
                  imagen: p.image_url,
                  calorias: p.nutriments?.['energy-kcal_100g'] || 0
                })),
                meriendas: meriendas.map(p => ({
                  id: p.code,
                  nombre: p.product_name,
                  marca: p.brands,
                  imagen: p.image_url,
                  calorias: p.nutriments?.['energy-kcal_100g'] || 0
                })),
                totalCalorias: Math.round(totalesGenerales.calorias),
                totalProteinas: Math.round(totalesGenerales.proteinas),
                totalCarbohidratos: Math.round(totalesGenerales.carbohidratos),
                totalGrasas: Math.round(totalesGenerales.grasas)
              });

              Alert.alert('¡Éxito!', 'Plan de alimentación generado');
              await cargarDatos();
              
            } catch (error) {
              console.error('Error al generar plan:', error);
              Alert.alert('Error', 'No se pudo generar el plan');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const ComidaCard = ({ titulo, productos, icono }) => (
    <View style={styles.comidaCard}>
      <View style={styles.comidaHeader}>
        <Text style={styles.comidaIcono}>{icono}</Text>
        <Text style={styles.comidaTitulo}>{titulo}</Text>
      </View>
      {productos && productos.length > 0 ? (
        productos.map((producto, index) => (
          <View key={index} style={styles.productoItem}>
            <Text style={styles.productoNombre}>{producto.nombre}</Text>
            <Text style={styles.productoCalorias}>{Math.round(producto.calorias)} kcal</Text>
          </View>
        ))
      ) : (
        <Text style={styles.sinProductos}>Sin productos asignados</Text>
      )}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.header}>
        <Text style={styles.greeting}>
          ¡Hola, {user?.displayName || 'Usuario'}!
        </Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Resumen nutricional */}
        {plan && (
          <View style={styles.resumenCard}>
            <Text style={styles.resumenTitulo}>Resumen del Día</Text>
            <View style={styles.resumenGrid}>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenValor}>{plan.totalCalorias}</Text>
                <Text style={styles.resumenLabel}>Calorías</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenValor}>{plan.totalProteinas}g</Text>
                <Text style={styles.resumenLabel}>Proteínas</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenValor}>{plan.totalCarbohidratos}g</Text>
                <Text style={styles.resumenLabel}>Carbohidratos</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenValor}>{plan.totalGrasas}g</Text>
                <Text style={styles.resumenLabel}>Grasas</Text>
              </View>
            </View>
          </View>
        )}

        {/* Plan de alimentación */}
        <View style={styles.planSection}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitulo}>Plan de Alimentación</Text>
            <TouchableOpacity
              style={styles.generarButton}
              onPress={generarPlanDiario}
              disabled={loading}
            >
              <Text style={styles.generarButtonText}>
                {plan ? 'Regenerar' : 'Generar Plan'}
              </Text>
            </TouchableOpacity>
          </View>

          {plan ? (
            <>
              <ComidaCard titulo="Desayuno" productos={plan.desayuno} icono="🌅" />
              <ComidaCard titulo="Almuerzo" productos={plan.almuerzo} icono="🍽️" />
              <ComidaCard titulo="Cena" productos={plan.cena} icono="🌙" />
              <ComidaCard titulo="Meriendas" productos={plan.meriendas} icono="🍎" />
            </>
          ) : (
            <View style={styles.sinPlanContainer}>
              <Text style={styles.sinPlanTexto}>
                No tienes un plan para hoy. Genera uno con productos colombianos.
              </Text>
            </View>
          )}
        </View>

        {/* Accesos rápidos */}
        <View style={styles.accionesRapidas}>
          <TouchableOpacity
            style={styles.accionButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.accionIcono}>🔍</Text>
            <Text style={styles.accionTexto}>Buscar Alimentos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.accionButton}
            onPress={() => navigation.navigate('Scan')}
          >
            <Text style={styles.accionIcono}>📷</Text>
            <Text style={styles.accionTexto}>Escanear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.accionButton}
            onPress={() => navigation.navigate('Favorites')}
          >
            <Text style={styles.accionIcono}>❤️</Text>
            <Text style={styles.accionTexto}>Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8
  },
  date: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9
  },
  content: {
    padding: 16
  },
  resumenCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  resumenTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16
  },
  resumenGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resumenItem: {
    alignItems: 'center'
  },
  resumenValor: {
    fontSize: 24,
    fontWeight: '700',
    color: '#27ae60',
    marginBottom: 4
  },
  resumenLabel: {
    fontSize: 12,
    color: '#7f8c8d'
  },
  planSection: {
    marginBottom: 16
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  planTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50'
  },
  generarButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  generarButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  comidaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  comidaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  comidaIcono: {
    fontSize: 24,
    marginRight: 8
  },
  comidaTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50'
  },
  productoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  productoNombre: {
    flex: 1,
    fontSize: 14,
    color: '#34495e'
  },
  productoCalorias: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c'
  },
  sinProductos: {
    fontSize: 14,
    color: '#95a5a6',
    fontStyle: 'italic'
  },
  sinPlanContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center'
  },
  sinPlanTexto: {
    fontSize: 15,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22
  },
  accionesRapidas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  accionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  accionIcono: {
    fontSize: 32,
    marginBottom: 8
  },
  accionTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center'
  }
});

export default HomeScreen;