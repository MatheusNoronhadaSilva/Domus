import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons';
import AddItemButton from './add_item_button';

export default function CreateDailyTask() {

  const [subTasks, setSubTasks] = useState<string[]>([
    "sdsddsd",
    "sdsdsdds",
    "dsdsdsdsdsd",
    "teste"
  ])
  const [isVisible, setIsVisible] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["75%"], []);
  const [title, setTitle] = useState('teste')
  const [description, setDescription] = useState('teste')
  const [difficultValue, setDifficultValue] = useState("easy")
  const [resetValue, setResetValue] = useState("weekly")
  const [resetIn, setResetIn] = useState(1)
  const [selectedDays, setSelectedDays] = useState<Number[]>([])
  const weekDays = [
    { name: "Dom", id: 1 },
    { name: "Seg", id: 2 },
    { name: "Ter", id: 3 },
    { name: "Qua", id: 4 },
    { name: "Qui", id: 5 },
    { name: "Sex", id: 6 },
    { name: "Sab", id: 7 }
  ]

  function handleCreateDailyTask() {

    const newDailyTask = {
      title: title,
      description: description,
      subTasks: subTasks,
      difficult: difficultValue,
      resetValue: resetValue,
    }

    console.log(newDailyTask);

  }

  useEffect(() => {
    bottomSheetRef.current?.close()
    setIsVisible(false)
  }, [])

  function handleOpenBottomSheet() {

    bottomSheetRef.current?.expand()
    setIsVisible(true)
  }

  function handleCloseBottomSheet() {

    bottomSheetRef.current?.close()
    setIsVisible(false)
  }

  function handleSubTaskChange(text: string, index: number) {
    const newSubTasks = [...subTasks];
    newSubTasks[index] = text;
    setSubTasks(newSubTasks);
  }

  function handleCreateSubTask() {
    const subTaskArray = [...subTasks];
    subTaskArray.push("");
    setSubTasks(subTaskArray);
  }

  function handleDeleteSubTask(index: number) {
    const subTaskArray = [...subTasks];
    subTaskArray.splice(index, 1);
    setSubTasks(subTaskArray);
  }

  function handleSelectWeekDay(id: number) {

    let weekDayArray
    
    if ( selectedDays.includes(id) ) {
      weekDayArray = selectedDays.filter( (day) => day !== id );
    } else {
      weekDayArray = [...selectedDays];
      weekDayArray.push(id);
    }

    console.log(weekDayArray);
    
    setSelectedDays(weekDayArray);
  }



  return (
    <>
      <TouchableOpacity style={styles.addItemButton} onPress={handleOpenBottomSheet}>
        <Ionicons size={30} color={"#fff"} name='add' />
      </TouchableOpacity>
      {isVisible && (
        <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "#00000080" }} />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ gap: 20 }}>
              <View style={styles.inputField}>
                <Text style={{ flex: 1, fontWeight: "bold" }}>Título</Text>
                <TextInput style={styles.textInput} value={title} onChangeText={setTitle} />
              </View>
              <View style={styles.inputField}>
                <Text style={{ flex: 1, fontWeight: "bold" }}>Descrição </Text>
                <TextInput style={styles.textInput} value={description} onChangeText={setDescription} />
              </View>
              <View style={[styles.inputField, { height: subTasks.length * 50 + 70 }]}>
                <Text style={{ fontWeight: "bold" }}>Sub-tarefa</Text>
                {subTasks.map((subTask, index) => (
                  <View key={index} style={[styles.subTaskContainer, { marginBottom: 10 }]}>
                    <View style={styles.subTask}>
                      <View style={styles.accountantContainer}>
                        <Text style={{ color: "#65c9ff", fontWeight: "bold" }}>{index + 1}</Text>
                      </View>
                      <TextInput style={{ flex: 1, alignSelf: "center" }} value={subTask} onChangeText={(text) => handleSubTaskChange(text, index)} />
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteSubTask(index)} style={styles.trashContainer}>
                      <Ionicons size={20} name='trash' />
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={styles.addNewSubTaskContainer}>
                  <TouchableOpacity onPress={handleCreateSubTask} style={styles.accountantContainer}>
                    <Ionicons name='add' color={"#65c9ff"} size={25} />
                  </TouchableOpacity>
                  <Text style={{ flex: 1, alignSelf: "center" }}>Adicionar Sub-tarefa</Text>
                </View>
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
              <View style={styles.inputField}>
                <Text style={{ fontWeight: "bold" }}>A cada</Text>
                <TextInput value={resetIn.toString()} onChangeText={(number) => setResetIn(Number(number))} keyboardType='numeric' style={styles.textInput} />
              </View>
              {resetValue === "weekly" && (
                <View style={styles.weekDaysContainer}>
                  {weekDays.map((day) => (
                      <TouchableOpacity onPress={ () => handleSelectWeekDay(day.id)} key={day.id} style={[styles.weekDay, { backgroundColor: selectedDays.includes(day.id) ? "#65C9FF" : "#fff" }]}>
                        <Text style={{}}>{day.name}</Text>
                      </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <TouchableOpacity onPress={handleCreateDailyTask} style={[styles.button, { backgroundColor: "#65C9FF", marginTop: 50, marginBottom: 10 }]}>
              <Text>Criar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseBottomSheet} style={[styles.button, { borderColor: "#65C9FF", borderWidth: 2 }]}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  weekDay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 3,
    borderRightColor: "#E8F7FF"
  },
  weekDaysContainer: {
    flexDirection: "row",
    height: 60,
    borderColor: "#E8F7FF",
    borderWidth: 3,
  },
  addNewSubTaskContainer: {
    borderTopLeftRadius: 360,
    borderBottomLeftRadius: 360,
    flexDirection: "row",
    gap: 10,
    alignItems: 'center',
    height: 40,
    paddingInline: 3,
    backgroundColor: "#E8F7FF",
  },
  subTask: {
    height: "100%",
    width: "90%",
    flexDirection: 'row',
    alignItems: "center",
    gap: 10,
    backgroundColor: "#E8F7FF",
    paddingInline: 3
  },
  trashContainer: {
    width: "10%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  accountantContainer: {
    borderRadius: 360,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 35,

  },
  subTaskContainer: {
    borderTopLeftRadius: 360,
    borderBottomLeftRadius: 360,
    flexDirection: "row",
    gap: 10,
    alignItems: 'center',
    height: 40,
    overflow: "hidden",
  },
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