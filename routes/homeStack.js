import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import InformationScreen from "../screens/InformationScreen";
import HomeScreen from "../screens/HomeScreen";
const screens = {
    Home: {
        screen: HomeScreen
    },
    Information: {
        screen: InformationScreen
    }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
