import { useSignUp } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native'
import { authStyles } from '../../assets/styles/auth.styles'
import { Image } from 'expo-image'
import { COLORS } from '../../constants/colors.js';
import { Ionicons } from '@expo/vector-icons';
import VerifyEmailScreen from './verify-email';

const SignUpScreen = () => {
    const router = useRouter();
    const { signUp, isLoaded } = useSignUp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    const handleSignUp = async () => {
       
        if (!email || !password) {
            Alert.alert("Error", "Email and password are required");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }
        
        // if (!isLoaded) return;
        setLoading(true);
        try {
            const result = await signUp.create({
                emailAddress: email,
                password
            })
            console.log(result)
            console.log(result.status)
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
            setPendingVerification(true)
            // if (result.status === "complete") {
            //     router.push("/(tabs)/home")
            // } else if (result.status === "needs_verification") {
            //     setPendingVerification(true)
            //     router.push("/(auth)/verify-email")
            // } else {
            //     Alert.alert("Error", "Sign up failed. Please try again")
            //     console.error(JSON.stringify(result, null, 2))
            // } 

        } catch (error) {
            Alert.alert("Error", error.errors?.[0]?.message || "Sign up failed. Please try again")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if(pendingVerification) return <VerifyEmailScreen email={email} onBack={()=> setPendingVerification(false)}/>

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
                            source={require("../../assets/images/i2.png")}
                            style={authStyles.image}
                            contentFit="contain"
                        />
                    </View>
                    <Text style={authStyles.title}>Create Account</Text>
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
                            onPress={handleSignUp}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={authStyles.buttonText}>
                                {loading ? "Creating account..." : "Sign Up"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[authStyles.linkContainer]}
                            onPress={() => router.back()}
                        >
                            <Text style={authStyles.linkText}>
                                Already have an account? <Text style={authStyles.link}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default SignUpScreen