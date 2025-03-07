import { StyleSheet, View, Text, FlatList } from "react-native";
import StatusPerfil from "../components/status_perfil";
import { useState } from "react";
import TaskItem from "../components/taskItem";          
import Container from "../components/container";
import DailtTaskBottomSheet from "../components/daily_bottomsheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Diaria() {

    const [dailyTasks, setDailyTasks] = useState([
        {
            id: 1,
            title: "Limpar a casa",
            description: "fsfbshff fhdbghd ghdgd hbghdbh fdfd fdfd fdfdfdfd fdfdfdfd fd fdfdfd fdfdfd fdfdffdfd dhfhdvf hdvfhdfhd",
            dateTask: "2025-05-01",
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
            dateTask: "2025-02-01",
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
            dateTask: "2025-05-01",
            difficult: "yellow",
            checked: false,
            subTasks: []
        },
        {
            id: 4,
            title: "Limpar a casa dsdsdsdsdd",
            description: "Lavar casa bhcdsfbdfdf dfhgdbfdfdhfdh fdhv dhvd dfbdbf",
            dateTask: "2025-01-01",
            difficult: "yellow",
            checked: false,
            subTasks: []
        },
        {
            id: 5,
            title: "Limpar a casa dsdsdsdsdd",
            description: "Lavar casa bhcdsfbdfdf dfhgdbfdfdhfdh fdhv dhvd dfbdbf",
            dateTask: "2025-12-01",
            difficult: "yellow",
            checked: false,
            subTasks: []
        },
        {
            id: 6,
            title: "Limpar a casa dsdsdsdsdd",
            description: "Lavar casa bhcdsfbdfdf dfhgdbfdfdhfdh fdhv dhvd dfbdbf",
            dateTask: "2025-05-01",
            difficult: "yellow",
            checked: false,
            subTasks: []
        }, {
            id: 7,
            title: "Limpar a casa dsdsdsdsdd",
            description: "Lavar casa bhcdsfbdfdf dfhgdbfdfdhfdh fdhv dhvd dfbdbf",
            dateTask: "2025-02-01",
            difficult: "yellow",
            checked: false,
            subTasks: []
        },
        {
            id: 8,
            title: "Limpar a casa dsdsdsdsdd",
            description: "Lavar casa bhcdsfbdfdf dfhgdbfdfdhfdh fdhv dhvd dfbdbf",
            dateTask: "2025-05-01",
            difficult: "yellow",
            checked: false,
            subTasks: []
        }
    ])


    function handleCompleteTask(id: number) {
        console.log("Tarefa concluída:", id);

        setDailyTasks(dailyTasks =>

            dailyTasks.map(dailyTask =>
                dailyTask.id === id ? { ...dailyTask, checked: !dailyTask.checked } : dailyTask
            )
        );
    }

    function handleCompleteSubTask(taskId: number, subTaskId: number) {

        setDailyTasks(dailyTasks =>
            dailyTasks.map(dailyTask =>
                dailyTask.id !== taskId ? dailyTask : {
                    ...dailyTask, subTasks: dailyTask.subTasks.map(subtask =>
                        subtask.id == subTaskId ? { ...subtask, checked: !subtask.checked } : subtask
                    )
                }
            )
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Container>
                <StatusPerfil />
                <FlatList
                    ListHeaderComponent={<Text style={styles.dailyTasks}>Tarefas diárias</Text>}
                    data={dailyTasks}
                    style={{ zIndex: -5 }}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <TaskItem data={item} completeTask={() => handleCompleteTask(item.id)} completeSubTask={(taskId, subTaskId) => handleCompleteSubTask(taskId, subTaskId)} />} />
                <DailtTaskBottomSheet />
            </Container>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    dailyTasks: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 25
    }
})