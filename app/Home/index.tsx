import React, { useState } from "react";
import { StyleSheet, Text, View, Animated, TouchableOpacity, ScrollView } from "react-native";
import StatusPerfil from "../components/status_perfil";
import { FlatList } from "react-native";
import TaskItem from "../components/taskItem";
import Container from "../components/container";
import CriarHabito from "../Teste";

export default function Home() {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Limpar a casa",
            description: "fsfbshff fhdbghd ghdgd hbghdbh fdfd fdfd fdfdfdfd fdfdfdfd fd fdfdfd fdfdfd fdfdffdfd dhfhdvf hdvfhdfhd",
            dateTask: "10/10/1000",
            difficult: "red",
            checked: false,
            subTasks: [
                { id: 1, description: "shdsdhshd", checked: false },
                { id: 2, description: "shdsdhshd", checked: false },
                { id: 3, description: "shdsdhshd", checked: false }
            ]
        },
        {
            id: 2,
            title: "Limpar a casa dsdsd",
            description: "Lavar casa bhcdsfbdfdf dfhgdbfdfdhfdh fdhv dhvd dfbdbf",
            dateTask: "10/10/1000",
            difficult: "green",
            checked: false,
            subTasks: [
                { id: 1, description: "shdsdhshd", checked: false },
                { id: 2, description: "shdsdhshd", checked: false }
            ]
        },
        {
            id: 3,
            title: "Limpar a casa dsdsdsdsdd",
            description: "Lavar casa bhcdsfbdfdf dfhgdbfdfdhfdh fdhv dhvd dfbdbf",
            dateTask: "10/10/1000",
            difficult: "yellow",
            checked: false,
            subTasks: []
        }
    ]);

    function handleCompleteTask(id: number) {
        console.log("Tarefa concluída:", id);

        setTasks(tasks =>

            tasks.map(task =>
                task.id === id ? { ...task, checked: !task.checked } : task
            )
        );
    }

    function handleCompleteSubTask(taskId: number, subTaskId: number) {

        setTasks(tasks =>
            tasks.map(task =>
                task.id !== taskId ? task : {
                    ...task, subTasks: task.subTasks.map(subtask =>
                        subtask.id == subTaskId ? { ...subtask, checked: !subtask.checked } : subtask
                    )
                }
            )
        )
    }

    return (
            <Container>
                <StatusPerfil />
                <FlatList
                    ListHeaderComponent={<>
                        <View style={styles.graphicGroup}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tarefas do dia concluídas</Text>
                            <View style={styles.graphicContainer} />
                        </View>
                        <Text style={styles.tasksToday}>Suas tarefas marcadas para hoje</Text>
                    </>}
                    data={tasks}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <TaskItem data={item} completeTask={() => handleCompleteTask(item.id)} completeSubTask={(taskId, subTaskId) => handleCompleteSubTask(taskId, subTaskId)} />} />
            </Container>
    )
}

const styles = StyleSheet.create({
    tasksToday: {
        textAlign: "center",
        width: "70%",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center"
    },
    graphicContainer: {
        backgroundColor: "red",
        flex: 1,
        flexDirection: "row",
    },
    graphicGroup: {
        flexDirection: "column",
        height: 250,
        paddingTop: 30,
        alignItems: "center"
    }
});
