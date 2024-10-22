import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Courses from './Courses';
import FolderView from '../screens/FolderView';
import FileView from '../screens/FileView';

const Stack = createNativeStackNavigator();

const CourseStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Courses" component={Courses} />
            <Stack.Screen name="FolderView" component={FolderView} />
            <Stack.Screen name="FileView" component={FileView} />
        </Stack.Navigator>
    );
};

export default CourseStack;
