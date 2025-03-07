import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import AddItemButton from './add_item_button';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreateToDo() {

    const [isVisible, setIsVisible] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["75%"], []);
    const [title, setTitle] = useState('teste');
    const [description, setDescription] = useState('teste');
    const [difficultValue, setDifficultValue] = useState("easy");
    const [resetValue, setResetValue] = useState("weekly");
    const [dateTask, setDateTask] = useState("");
    const [dateTaskFormat, setDateTaskFormat] = useState("");
    const [timeTask, setTimeTask] = useState("");
    const [selectedDays, setSelectedDays] = useState<String[]>([]);
    const [timePickerVisibility, setTimePickerVisibility] = useState(false);
    const [datePickerVisibility, setDatePickerVisibility] = useState(false);
    const weekDays = [
        { name: "Dom", value: "sunday" },
        { name: "Seg", value: "monday" },
        { name: "Ter", value: "tuesday" },
        { name: "Qua", value: "wednesday" },
        { name: "Qui", value: "thursday" },
        { name: "Sex", value: "friday" },
        { name: "Sab", value: "saturday" }
    ];
    const [subTasks, setSubTasks] = useState<string[]>([
        "sdsddsd",
        "sdsdsdds",
        "dsdsdsdsdsd",
        "teste"
    ]);

    useEffect(() => {
        bottomSheetRef.current?.close();
        setIsVisible(false);
    }, []);

    useEffect(() => {
        handleDateFormat();
    }, [dateTask]);

    useEffect(() => {
        handleValidateTime();
    }, [timeTask]);

    function handleDatePickerVisibility() {
        setDatePickerVisibility(!datePickerVisibility);
    }

    function handleTimePickerVisibility() {
        setTimePickerVisibility(!timePickerVisibility);
    }

    function handleDatePickerConfirm(date: Date) {

        setDateTask("");
        setDateTask(date.toISOString().split('T')[0]);
        setDatePickerVisibility(false);
    }

    function handleTimePickerConfirm(time: Date) {
        setTimeTask("")
        setTimeTask(time.toTimeString().split(' ')[0]);
        setTimePickerVisibility(false);
    }

    function handleCreateToDo() {
        const newHabit = {
            title: title,
            description: description,
            difficult: difficultValue,
            resetIn: resetValue,
        };

        console.log(newHabit);
    }

    function handleValidateDate(today: Date, dateFormat: Date) {

        console.log(today, dateFormat);
        

        if (today < dateFormat) {
            console.log("Data válida");
            
            return true
        } else {
            console.log("Data inválida");
            setDateTaskFormat("")
            return false
        }
    }

    function handleDateFormat() {
        
        const today = new Date();
        const dateFormat = new Date(dateTask);
    
        if (handleValidateDate(today, dateFormat)) {
            const dia = (dateFormat.getDate() + 1).toString().padStart(2, "0");
            const mes = (dateFormat.getMonth() + 1).toString().padStart(2, "0");
            const ano = dateFormat.getFullYear();

            const dataFormatada = `${dia}/${mes}/${ano}`;

            setDateTaskFormat(dataFormatada)

        }
    }

    function handleValidateTime() {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
        if (!timeRegex.test(timeTask)) {
            setTimeTask("");
        } else {
            setTimeTask(timeTask);
        }
    }

    function handleOpenBottomSheet() {
        bottomSheetRef.current?.expand();
        setIsVisible(true);
    }

    function handleCloseBottomSheet() {
        bottomSheetRef.current?.close();
        setIsVisible(false);
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
                                <Text style={{ fontWeight: "bold" }}>Repetir a cada</Text>
                                <View style={{ flexDirection: "row", gap: 10, height: 65, alignItems: "stretch" }}>
                                    <View style={styles.pickerContainer}>
                                        <Text>{dateTaskFormat}</Text>
                                        <TouchableOpacity onPress={handleDatePickerVisibility}>
                                                <Ionicons name='calendar-clear-outline' size={20} />
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={datePickerVisibility}
                                            mode="date"
                                            onConfirm={handleDatePickerConfirm}
                                            onCancel={handleDatePickerVisibility}
                                        />
                                    </View>
                                    <View style={styles.pickerContainer}>
                                        <Text>{timeTask}</Text>
                                        <TouchableOpacity onPress={handleTimePickerVisibility}>
                                            <Ionicons name='time-outline' size={20} />
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            mode='time'
                                            isVisible={timePickerVisibility}
                                            onConfirm={handleTimePickerConfirm}
                                            onCancel={handleTimePickerVisibility}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleCreateToDo} style={[styles.button, { backgroundColor: "#65C9FF", marginTop: 50, marginBottom: 10 }]}>
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
    pickerContainer: {
        flex: 1,
        flexDirection: "row",
        borderColor: "#E8F7FF",
        borderWidth: 3,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 10
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