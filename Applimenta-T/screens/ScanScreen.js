// pantallas/ScanScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { buscarPorCodigoBarras } from '../servicios/openFoodFactsApi';

const { width } = Dimensions.get('window');

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status !== 'granted') {
      Alert.alert(
        'Permiso Denegado',
        'Se necesita permiso de cámara para escanear códigos de barras'
      );
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanning) return; // Evitar múltiples escaneos

    setScanned(true);
    setScanning(true);

    try {
      // Buscar producto por código de barras
      const producto = await buscarPorCodigoBarras(data);

      if (producto) {
        Alert.alert(
          'Producto Encontrado',
          `${producto.product_name || 'Producto'}`,
          [
            {
              text: 'Ver Detalles',
              onPress: () => {
                navigation.navigate('FoodDetail', { producto });
                setScanned(false);
                setScanning(false);
              }
            },
            {
              text: 'Escanear Otro',
              onPress: () => {
                setScanned(false);
                setScanning(false);
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Producto No Encontrado',
          `No se encontró información para el código: ${data}`,
          [
            {
              text: 'Escanear Otro',
              onPress: () => {
                setScanned(false);
                setScanning(false);
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error al buscar producto:', error);
      Alert.alert(
        'Error',
        'No se pudo buscar el producto',
        [
          {
            text: 'Reintentar',
            onPress: () => {
              setScanned(false);
              setScanning(false);
            }
          }
        ]
      );
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>Solicitando permiso de cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageIcon}>📷</Text>
        <Text style={styles.messageText}>
          No se otorgó permiso para usar la cámara
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Solicitar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay con marco de escaneo */}
      <View style={styles.overlay}>
        {/* Área superior */}
        <View style={styles.overlayTop}>
          <Text style={styles.instructionText}>
            Apunta la cámara al código de barras del producto
          </Text>
        </View>

        {/* Marco de escaneo */}
        <View style={styles.scanAreaContainer}>
          <View style={styles.overlayLeft} />
          
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
          </View>
          
          <View style={styles.overlayRight} />
        </View>

        {/* Área inferior */}
        <View style={styles.overlayBottom}>
          {scanned && (
            <TouchableOpacity
              style={styles.rescanButton}
              onPress={() => {
                setScanned(false);
                setScanning(false);
              }}
            >
              <Text style={styles.rescanButtonText}>Escanear Otro</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.manualButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.manualButtonText}>Buscar Manualmente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const scanFrameSize = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageIcon: {
    fontSize: 64,
    marginBottom: 16
  },
  messageText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 26
  },
  permissionButton: {
    marginTop: 24,
    backgroundColor: '#27ae60',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between'
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  instructionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24
  },
  scanAreaContainer: {
    flexDirection: 'row'
  },
  overlayLeft: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  overlayRight: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  scanFrame: {
    width: scanFrameSize,
    height: scanFrameSize * 0.6,
    borderWidth: 2,
    borderColor: '#27ae60',
    borderRadius: 12,
    position: 'relative'
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#27ae60'
  },
  cornerTopLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12
  },
  cornerTopRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12
  },
  cornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12
  },
  cornerBottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  rescanButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16
  },
  rescanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  manualButton: {
    paddingHorizontal: 32,
    paddingVertical: 12
  },
  manualButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline'
  }
});

export default ScanScreen;