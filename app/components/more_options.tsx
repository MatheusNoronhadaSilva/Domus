import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Diaria from "../Diaria";
import Home from "../Home";

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function DrawerLayout(){

    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export default function MoreOptions(){
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="MoreOptions" component={DrawerLayout} />
        </Drawer.Navigator>
    </NavigationContainer>
}