import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [ket, setKet] = useState('');
  const [nominal, setNominal] = useState('');
  const [transaksi, setTransaksi] = useState([]);

  // Fungsi tambah transaksi
  const tambahTransaksi = (tipe) => {
    // Validasi input kosong
    if (ket.trim() === '' || nominal.trim() === '') {
      Alert.alert('Peringatan', 'Semua input wajib diisi!');
      return;
    }

    // Validasi angka
    if (isNaN(nominal)) {
      Alert.alert('Error', 'Nominal harus berupa angka!');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      ket: ket,
      nominal: parseInt(nominal),
      tipe: tipe,
    };

    // Tambahkan data ke state array
    setTransaksi([...transaksi, newItem]);

    // Reset input
    setKet('');
    setNominal('');
  };

  // Hitung saldo total
  const totalSaldo = transaksi.reduce((total, item) => {
    return item.tipe === 'masuk'
      ? total + item.nominal
      : total - item.nominal;
  }, 0);

  // Render item FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardItem}>
        <View>
          <Text style={styles.namaTransaksi}>{item.ket}</Text>
          <Text style={styles.jenisTransaksi}>
            {item.tipe === 'masuk' ? 'Pemasukan' : 'Pengeluaran'}
          </Text>
        </View>

        <Text
          style={{
            color: item.tipe === 'keluar' ? 'red' : 'green',
            fontWeight: 'bold',
            fontSize: 17,
          }}
        >
          Rp {item.nominal}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <Text style={styles.title}>DompetKu</Text>

        {/* Card Saldo */}
        <View style={styles.cardSaldo}>
          <Text style={styles.labelSaldo}>Saldo Saat Ini</Text>
          <Text style={styles.saldo}>Rp {totalSaldo}</Text>
        </View>

        {/* Input Nama */}
        <TextInput
          placeholder="Nama Transaksi"
          style={styles.input}
          value={ket}
          onChangeText={setKet}
        />

        {/* Input Nominal */}
        <TextInput
          placeholder="Nominal"
          style={styles.input}
          keyboardType="numeric"
          value={nominal}
          onChangeText={setNominal}
        />

        {/* Tombol */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonMasuk]}
            onPress={() => tambahTransaksi('masuk')}
          >
            <Text style={styles.buttonText}>Pemasukan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonKeluar]}
            onPress={() => tambahTransaksi('keluar')}
          >
            <Text style={styles.buttonText}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>

        {/* Riwayat */}
        <Text style={styles.subTitle}>Riwayat Transaksi</Text>

        <FlatList
          data={transaksi}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Belum ada transaksi, Bro!
            </Text>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#111827',
  },

  cardSaldo: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },

  labelSaldo: {
    fontSize: 16,
    color: 'gray',
  },

  saldo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#111827',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonMasuk: {
    backgroundColor: 'green',
    marginRight: 10,
  },

  buttonKeluar: {
    backgroundColor: 'red',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
  },

  cardItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  namaTransaksi: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },

  jenisTransaksi: {
    marginTop: 5,
    color: 'gray',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: 'gray',
  },
});
