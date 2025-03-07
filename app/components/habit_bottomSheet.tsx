import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons';
import AddItemButton from './add_item_button';

export default function CreateHabit() {

  const [isVisible, setIsVisible] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["75%"], []);
  const [title, setTitle] = useState('teste')
  const [description, setDescription] = useState('teste')
  const [difficultValue, setDifficultValue] = useState("easy")
  const [resetValue, setResetValue] = useState("weekly")
  const [selectedDays, setSelectedDays] = useState<String[]>([])
  const weekDays = [
    { name: "Dom", value: "sunday" },
    { name: "Seg", value: "monday" },
    { name: "Ter", value: "tuesday" },
    { name: "Qua", value: "wednesday" },
    { name: "Qui", value: "thursday" },
    { name: "Sex", value: "friday" },
    { name: "Sab", value: "saturday" }
  ]

  useEffect(() => {
    bottomSheetRef.current?.close()
  }, [])

  function handleCreateHabit() {

    const newHabit = {
      title: title,
      description: description,
      difficult: difficultValue,
      resetIn: resetValue,
    }

    console.log(newHabit);

  }

  function handleOpenBottomSheet() {

    bottomSheetRef.current?.expand()
    setIsVisible(true)
  }

  function handleCloseBottomSheet() {

    bottomSheetRef.current?.close()
    setIsVisible(false)
  }


  return (
    <>
      <TouchableOpacity style={styles.addItemButton} onPress={handleOpenBottomSheet}>
        <Ionicons size={30} color={"#fff"} name='add' />
      </TouchableOpacity>
      { isVisible && (
        <View style={{position: "absolute", height: "100%", width: "100%", backgroundColor: "#00000080"}}/>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={{ gap: 20 }}>
            <View style={styles.inputField}>
              <Text style={{ flex: 1, fontWeight: "bold" }}>Título</Text>
              <TextInput style={styles.textInput} value={title} onChangeText={setTitle} />
            </View>
            <View style={styles.inputField}>
              <Text style={{ flex: 1, fontWeight: "bold" }}>Descrição </Text>
              <TextInput style={styles.textInput} value={description} onChangeText={setDescription} />
            </View>
            <View style={styles.inputField}>
              <Text style={{ fontWeight: "bold" }}>Dificuldade da tarefa</Text>
              <View style={styles.selectField}>
                <Picker style={{ flex: 1 }} selectedValue={difficultValue} onValueChange={setDifficultValue}>
                  <Picker.Item label='Fácil' value="easy" />
                  <Picker.Item label='Médio' value="medium" />
                  <Picker.Item label='Difícil' value="hard" />
                  <Picker.Item label='Impossível' value="impossible" />
                </Picker>
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={{ fontWeight: "bold" }}>Resetar o contador</Text>
              <View style={styles.selectField}>
                <Picker style={{ flex: 1 }} selectedValue={resetValue} onValueChange={setResetValue}>
                  <Picker.Item label='Diariamente' value="daily" />
                  <Picker.Item label='Semanalmente' value="weekly" />
                  <Picker.Item label='Mensalmente' value="monthly" />
                </Picker>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleCreateHabit} style={[styles.button, { backgroundColor: "#65C9FF", marginTop: 50, marginBottom: 10 }]}>
            <Text>Criar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseBottomSheet} style={[styles.button, { borderColor: "#65C9FF", borderWidth: 2 }]}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  addItemButton: {
    zIndex: 0,
    position: "absolute",
    backgroundColor: "#65C9FF",
    height: 45,
    width: 45,
    right: 20,
    bottom: 20,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.5
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 8
  },
  selectField: {
    borderColor: "#E8F7FF",
    borderWidth: 3,
    backgroundColor: "white", // Garante que o Picker fique visível
    height: 65,
    justifyContent: "center", // Centraliza o Picker
    overflow: "hidden", // Pode ajudar a evitar cortes visuais
  },
  textInput: {
    backgroundColor: "#E8F7FF",
    flex: 1,
    padding: 10
  },
  inputField: {
    alignItems: "stretch",
    height: 70,
    flexDirection: "column"
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'stretch'
  },
});