import { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import {
    GestureHandlerRootView,
    TextInput,
} from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms';
import { useAuth } from '../hooks/useAuth';

type NavigationProps = NavigationProp<RootStackParamList>;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useAuth();
    const navigation = useNavigation<NavigationProps>();
    const theme = useRecoilValue(themeAtom);
    const isDarkTheme = theme === 'dark';

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        await login(email, password);
    };

    return (
        <GestureHandlerRootView className="flex flex-1">
            <View
                className={`${
                    isDarkTheme ? 'bg-[#020817]' : 'bg-[#FFFFFFF2]'
                } h-screen px-4 py-2`}
            >
                <View className="flex flex-row items-center mb-7">
                    <View className="space-y-2">
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#F8FAFC]'
                                    : 'text-[#020817]'
                            } text-2xl font-bold`}
                        >
                            Login Now
                        </Text>
                        <Text
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } text-sm`}
                        >
                            Log in to access your coding cohorts and continue
                            your journey.
                        </Text>
                    </View>
                </View>

                {/* Email/Phone Field */}
                <View>
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}
                    >
                        Email ID / Phone no.
                    </Text>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4 ${
                            Platform.OS === 'ios' ? 'py-2' : 'py-0'
                        }`}
                    >
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            editable={!isLoading}
                            placeholder="Enter Email ID / Phone no."
                            placeholderTextColor={
                                isDarkTheme ? '#94A3B8' : '#64748B'
                            }
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } w-full`}
                        />
                    </View>
                </View>

                {/* Password Field */}
                <View className="mt-4 mb-2">
                    <Text
                        className={`${
                            isDarkTheme ? 'text-[#F8FAFC]' : 'text-[#020817]'
                        }`}
                    >
                        Password
                    </Text>
                    <View
                        className={`${
                            isDarkTheme
                                ? 'border-[#1E293B]'
                                : 'border-[#E2E8F0]'
                        } flex flex-row items-center border rounded-lg my-2 px-4 ${
                            Platform.OS === 'ios' ? 'py-2' : 'py-0'
                        }`}
                    >
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            editable={!isLoading}
                            placeholder="Enter Password"
                            placeholderTextColor={
                                isDarkTheme ? '#94A3B8' : '#64748B'
                            }
                            className={`${
                                isDarkTheme
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#64748B]'
                            } w-full`}
                        />
                    </View>
                </View>

                <Text
                    className={`${
                        isDarkTheme ? 'text-[#4E7AFF]' : 'text-[#3259E8]'
                    } mb-4`}
                >
                    Forgot Password?
                </Text>

                {error && (
                    <View className="mt-6 mb-4">
                        <Text className="text-[#ee2222] text-center">
                            {error}
                        </Text>
                    </View>
                )}

                <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit}>
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text
                            className={`bg-[#3259E8] text-[#FFFFFF] rounded-2xl py-4 px-6 text-center`}
                        >
                            Login
                        </Text>
                    )}
                </TouchableOpacity>
                <Text className="text-[#94A3B8] font-medium mt-4 text-center">
                    Don't have an account?{' '}
                    <Text
                        className="text-[#4E7AFF]"
                        onPress={() => navigation.navigate('BottomTabs')}
                    >
                        Sign up
                    </Text>
                </Text>
            </View>
        </GestureHandlerRootView>
    );
};

export default Login;
