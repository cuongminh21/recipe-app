import { useRouter } from 'expo-router'
import { View, Text, Alert, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native'
import { useSignIn } from '@clerk/expo';
import { useState } from 'react';
import { authStyles } from '../../assets/styles/auth.styles.js';
import { Image } from 'expo-image';
import { COLORS } from '../../constants/colors.js';
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = () => {
    const router = useRouter()
    const { signIn, setActive, isLoaded } = useSignIn()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handleSignIn = async () => {        
        if (!email || !password) {
            Alert.alert("Error", "Email and password are required")
            return
        }       
        if (!isLoaded) return
        setLoading(true)
        try {

            const result = await signIn.create({
                identifier: email,
                password
            })
            console.log(result)
            console.log(result.status)
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
                // router.push("/(tabs)/home")
            } else {
                Alert.alert("Error", "Sign in failed. Please try again")
                console.error(JSON.stringify(result, null, 2))
            }
        } catch (error) {
            Alert.alert("Error", error.errors?.[0]?.message || "Sign in failed. Please try again")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={authStyles.container}>
            <KeyboardAvoidingView
                style={authStyles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={authStyles.scrollContent}
                    // keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={authStyles.imageContainer}>
                        <Image
                            source={require("../../assets/images/i1.png")}
                            style={authStyles.image}
                            contentFit="contain"
                        />
                    </View>
                    <Text style={authStyles.title}>Welcome Back!</Text>
                    <View style={authStyles.formContainer}>
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Email"
                                placeholderTextColor={COLORS.textLight}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Password"
                                placeholderTextColor={COLORS.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={authStyles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={COLORS.textLight}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                            onPress={handleSignIn}                            
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={authStyles.buttonText}>
                                {loading ? "Signing In..." : "Sign In"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[authStyles.linkContainer]}
                            onPress={() => router.push("/(auth)/sign-up")}
                        >
                            <Text style={authStyles.linkText}>
                                Don&apos;t have an account? <Text style={authStyles.link}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default SignInScreen