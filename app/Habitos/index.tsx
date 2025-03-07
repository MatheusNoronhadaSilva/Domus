import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker'
import Container from '../components/container';
import StatusPerfil from '../components/status_perfil';
import HabitsItem from '../components/habits_item';
import { Ionicons } from '@expo/vector-icons';
import HabitBottomSheet from '../components/habit_bottomSheet'

export default function CriarHabito() {

  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "passear com os cachorros",
      description: "as 7 da manhã",
      like: 0,
      dislike: 0,
    },
    {
      id: 2,
      title: "passear com os cachorros",
      description: "as 7 da manhã",
      like: 0,
      dislike: 0,
    },
    {
      id: 3,
      title: "passear com os cachorros",
      description: "as 7 da manhã",
      like: 0,
      dislike: 0,
    }
  ])

  function handleAddHabit(habit: {}) {
    console.log(habit);

  }

  function handleLikeHabit(id: number) {

    setHabits(habits =>

      habits.map(habit =>
        habit.id == id ? { ...habit, like: habit.like += 1 } : habit
      )
    )
  }

  function handleDislikeHabit(id: number) {

    setHabits(habits =>
      habits.map(habit =>
        habit.id == id ? { ...habit, dislike: habit.dislike += 1 } : habit
      )
    )
  }

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

  function handleCreateHabit() {

    const newHabit = {
      title: title,
      description: description,
      difficult: difficultValue,
      resetIn: resetValue,
    }


  }

  function handleSelecionarDia(dia: string) {

    setSelectedDays(dias =>
      dias.includes(dia)
        ? dias.filter((item) => item !== dia)
        : [...dias, dia]
    );
  }


  return (
    <GestureHandlerRootView style={styles.container}>

      <Container>
        <StatusPerfil />
        <Text style={styles.habits}>Hábitos</Text>
        <FlatList
          data={habits}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <HabitsItem data={item} likeHabit={() => handleLikeHabit(item.id)} dislikeHabit={() => handleDislikeHabit(item.id)} />} />
      </Container>
      <HabitBottomSheet />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  addItemButton: {
    zIndex: 10,
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
  habits: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 25
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