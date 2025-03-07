import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import { Ionicons } from '@expo/vector-icons'
import Habitos from "./Habitos";
import Diaria from "./Diaria"
import ToDo from "./To-do";
import Group from "./Group"
import Teste from './Teste'
const Tab = createBottomTabNavigator()

export default function Routes() {

    return (
            <Tab.Navigator screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 60,
                    flexDirection: "row",
                    paddingTop: 10,
                }
            }}>

                <Tab.Screen
                    name="Habitos"
                    component={Habitos}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => {
                            if(focused){
                                return <Ionicons size={size} color={"#65C9FF"} name="body"/>
                            }

                            return <Ionicons size={size} color={"#65C9FF"} name="body-outline" />
                        }
                    }} />

                <Tab.Screen
                    name="Diaria"
                    component={Diaria}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => {
                            if(focused){
                                return <Ionicons size={size} color={"#65C9FF"} name="grid"/>
                            }

                            return <Ionicons size={size} color={"#65C9FF"} name="grid-outline" />
                        }
                    }} />

                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => {
                            if(focused){
                                return <Ionicons size={size} color={"#65C9FF"} name='home' />
                            }
        
                            return <Ionicons size={size} color={"#65C9FF"} name='home-outline' />
                        }
                    }} />

                <Tab.Screen
                    name="To-Do"
                    component={ToDo}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => {
                            if(focused){
                                return <Ionicons size={size} color={"#65C9FF"} name="compass"/>
                            }

                            return <Ionicons size={size} color={"#65C9FF"} name="compass-outline" />
                        }
                    }} />

                <Tab.Screen
                    name="Group"
                    component={Teste}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => {
                            if(focused){
                                return <Ionicons size={size} color={"#65C9FF"} name="people"/>
                            }

                            return <Ionicons size={size} color={"#65C9FF"} name="people-outline" />
                        }
                    }} />


            </Tab.Navigator>
    )
}