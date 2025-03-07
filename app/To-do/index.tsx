import { StyleSheet, View, Text, FlatList } from "react-native";
import StatusPerfil from "../components/status_perfil";
import { useState } from "react";
import TaskItem from "../components/taskItem";
import Container from "../components/container";
import TodoBottomSheet from "../components/to_do_bottomsheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ToDo() {

    const [toDoTasks, setToDoTasks] = useState([
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

        setToDoTasks(toDoTasks =>

            toDoTasks.map(toDoTask =>
                toDoTask.id === id ? { ...toDoTask, checked: !toDoTask.checked } : toDoTask
            )
        );
    }

    function handleCompleteSubTask(taskId: number, subTaskId: number) {

        setToDoTasks(toDoTasks =>
            toDoTasks.map(toDoTask =>
                toDoTask.id !== taskId ? toDoTask : {
                    ...toDoTask, subTasks: toDoTask.subTasks.map(subtask =>
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
                <Text style={styles.toDoList}>To-do List</Text>
                <FlatList
                    data={toDoTasks}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <TaskItem data={item} completeTask={() => handleCompleteTask(item.id)} completeSubTask={(taskId, subTaskId) => handleCompleteSubTask(taskId, subTaskId)} />} />
                <TodoBottomSheet />
            </Container>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    toDoList: {
        paddingTop: 25,
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center"
    }
})