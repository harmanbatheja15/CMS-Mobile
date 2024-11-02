import { View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Slides from '../screens/Slides';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Lectures from '../screens/Lectures';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';

type NavigationProps = NavigationProp<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();

const SlidingTabs = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowColor: 'transparent',
                    borderRadius: 10,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#4E7AFF',
                    height: 3,
                },
                tabBarActiveTintColor: isDarkTheme ? '#fff' : '#000',
                tabBarInactiveTintColor: '#94A3B8',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '500',
                    textTransform: 'none',
                },
                tabBarPressColor: '#334155',
                tabBarScrollEnabled: false,
            }}
        >
            <Tab.Screen name="Lectures" component={Lectures} />
            <Tab.Screen name="Slides" component={Slides} />
        </Tab.Navigator>
    );
};

const Downloads = () => {
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';
    const navigation = useNavigation<NavigationProps>();

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } h-screen px-4 py-2`}
            >
                <SlidingTabs />
            </View>
        </GestureHandlerRootView>
    );
};

export default Downloads;
