// pantallas/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { 
  obtenerPerfilUsuario, 
  guardarPerfilUsuario 
} from '../servicios/firebaseService';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [perfil, setPerfil] = useState({
    nombre: '',
    edad: '',
    genero: '',
    peso: '',
    altura: '',
    nivelActividad: 'moderado',
    objetivoSalud: 'mantener',
    restriccionesAlimentarias: []
  });

  const user = auth.currentUser;

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      setLoading(true);
      const perfilData = await obtenerPerfilUsuario(user.uid);
      
      if (perfilData) {
        setPerfil({
          nombre: perfilData.nombre || user.displayName || '',
          edad: perfilData.edad?.toString() || '',
          genero: perfilData.genero || '',
          peso: perfilData.peso?.toString() || '',
          altura: perfilData.altura?.toString() || '',
          nivelActividad: perfilData.nivelActividad || 'moderado',
          objetivoSalud: perfilData.objetivoSalud || 'mantener',
          restriccionesAlimentarias: perfilData.restriccionesAlimentarias || []
        });
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarPerfil = async () => {
    setSaving(true);

    try {
      await guardarPerfilUsuario(user.uid, {
        nombre: perfil.nombre,
        edad: perfil.edad ? parseInt(perfil.edad) : null,
        genero: perfil.genero,
        peso: perfil.peso ? parseFloat(perfil.peso) : null,
        altura: perfil.altura ? parseFloat(perfil.altura) : null,
        nivelActividad: perfil.nivelActividad,
        objetivoSalud: perfil.objetivoSalud,
        restriccionesAlimentarias: perfil.restriccionesAlimentarias
      });

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      setEditing(false);
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          }
        }
      ]
    );
  };

  const calcularIMC = () => {
    const peso = parseFloat(perfil.peso);
    const altura = parseFloat(perfil.altura) / 100; // convertir cm a m
    
    if (peso && altura && altura > 0) {
      const imc = peso / (altura * altura);
      return imc.toFixed(1);
    }
    return null;
  };

  const obtenerCategoriaIMC = (imc) => {
    if (!imc) return null;
    
    const imcNum = parseFloat(imc);
    if (imcNum < 18.5) return { texto: 'Bajo peso', color: '#3498db' };
    if (imcNum < 25) return { texto: 'Normal', color: '#27ae60' };
    if (imcNum < 30) return { texto: 'Sobrepeso', color: '#f39c12' };
    return { texto: 'Obesidad', color: '#e74c3c' };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }

  const imc = calcularIMC();
  const categoriaIMC = obtenerCategoriaIMC(imc);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(perfil.nombre || user.displayName || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.userName}>{perfil.nombre || user.displayName}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* IMC Card */}
        {imc && (
          <View style={styles.imcCard}>
            <Text style={styles.imcLabel}>Índice de Masa Corporal (IMC)</Text>
            <View style={styles.imcInfo}>
              <Text style={styles.imcValue}>{imc}</Text>
              {categoriaIMC && (
                <View style={[styles.imcBadge, { backgroundColor: categoriaIMC.color }]}>
                  <Text style={styles.imcBadgeText}>{categoriaIMC.texto}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Botón de edición */}
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editing ? handleGuardarPerfil() : setEditing(true)}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.editButtonText}>
                {editing ? '💾 Guardar' : '✏️ Editar Perfil'}
              </Text>
            )}
          </TouchableOpacity>
          
          {editing && (
            <TouchableOpacity
              style={[styles.editButton, styles.cancelButton]}
              onPress={() => {
                setEditing(false);
                cargarPerfil();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Información Personal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              style={[styles.input, !editing && styles.inputDisabled]}
              value={perfil.nombre}
              onChangeText={(text) => setPerfil({ ...perfil, nombre: text })}
              editable={editing}
              placeholder="Tu nombre"
            />
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Edad</Text>
              <TextInput
                style={[styles.input, !editing && styles.inputDisabled]}
                value={perfil.edad}
                onChangeText={(text) => setPerfil({ ...perfil, edad: text })}
                editable={editing}
                keyboardType="numeric"
                placeholder="Años"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Género</Text>
              <TextInput
                style={[styles.input, !editing && styles.inputDisabled]}
                value={perfil.genero}
                onChangeText={(text) => setPerfil({ ...perfil, genero: text })}
                editable={editing}
                placeholder="M/F"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Peso (kg)</Text>
              <TextInput
                style={[styles.input, !editing && styles.inputDisabled]}
                value={perfil.peso}
                onChangeText={(text) => setPerfil({ ...perfil, peso: text })}
                editable={editing}
                keyboardType="numeric"
                placeholder="70"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Altura (cm)</Text>
              <TextInput
                style={[styles.input, !editing && styles.inputDisabled]}
                value={perfil.altura}
                onChangeText={(text) => setPerfil({ ...perfil, altura: text })}
                editable={editing}
                keyboardType="numeric"
                placeholder="170"
              />
            </View>
          </View>
        </View>

        {/* Objetivos de Salud */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objetivos de Salud</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nivel de Actividad</Text>
            <View style={styles.optionsContainer}>
              {['bajo', 'moderado', 'alto'].map((nivel) => (
                <TouchableOpacity
                  key={nivel}
                  style={[
                    styles.optionChip,
                    perfil.nivelActividad === nivel && styles.optionChipSelected,
                    !editing && styles.optionChipDisabled
                  ]}
                  onPress={() => editing && setPerfil({ ...perfil, nivelActividad: nivel })}
                  disabled={!editing}
                >
                  <Text
                    style={[
                      styles.optionText,
                      perfil.nivelActividad === nivel && styles.optionTextSelected
                    ]}
                  >
                    {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Objetivo</Text>
            <View style={styles.optionsContainer}>
              {['perder', 'mantener', 'ganar'].map((objetivo) => (
                <TouchableOpacity
                  key={objetivo}
                  style={[
                    styles.optionChip,
                    perfil.objetivoSalud === objetivo && styles.optionChipSelected,
                    !editing && styles.optionChipDisabled
                  ]}
                  onPress={() => editing && setPerfil({ ...perfil, objetivoSalud: objetivo })}
                  disabled={!editing}
                >
                  <Text
                    style={[
                      styles.optionText,
                      perfil.objetivoSalud === objetivo && styles.optionTextSelected
                    ]}
                  >
                    {objetivo === 'perder' ? 'Perder peso' : 
                     objetivo === 'mantener' ? 'Mantener peso' : 'Ganar peso'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('Información', 'Funcionalidad próximamente')}
          >
            <Text style={styles.actionButtonIcon}>📊</Text>
            <Text style={styles.actionButtonText}>Ver Estadísticas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('Información', 'Funcionalidad próximamente')}
          >
            <Text style={styles.actionButtonIcon}>⚙️</Text>
            <Text style={styles.actionButtonText}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleCerrarSesion}
          >
            <Text style={styles.actionButtonIcon}>🚪</Text>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  avatarContainer: {
    marginBottom: 16
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#27ae60'
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9
  },
  content: {
    padding: 16
  },
  imcCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  imcLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8
  },
  imcInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imcValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2c3e50',
    marginRight: 16
  },
  imcBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  imcBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  editButtonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8
  },
  editButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  cancelButton: {
    backgroundColor: '#95a5a6'
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16
  },
  inputGroup: {
    marginBottom: 16
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  inputDisabled: {
    backgroundColor: '#ecf0f1',
    color: '#7f8c8d'
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  optionChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  optionChipSelected: {
    backgroundColor: '#27ae60',
    borderColor: '#27ae60'
  },
  optionChipDisabled: {
    opacity: 0.6
  },
  optionText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600'
  },
  optionTextSelected: {
    color: '#fff'
  },
  actionsSection: {
    marginTop: 8,
    gap: 12
  },
  actionButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  actionButtonIcon: {
    fontSize: 24,
    marginRight: 12
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50'
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e74c3c'
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c'
  }
});

export default ProfileScreen;