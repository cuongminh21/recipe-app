import { useSignUp } from '@clerk/expo'

import { useState } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native'
import { authStyles } from '../../assets/styles/auth.styles'
import { Image } from 'expo-image'
import { COLORS } from '../../constants/colors.js';
const VerifyEmailScreen = ({email,onBack})=>{
    const {isLoaded,signUp,setActive} = useSignUp()
    const [code,setCode] = useState("")
    const [loading,setLoading] = useState(false)
    const handleVerification = async()=>{
        if (!isLoaded) return
        setLoading(true)
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({code})
            if(signUpAttempt.status === "complete"){
                await setActive({session:signUpAttempt.createdSessionId})
            }else{
                Alert.alert("Error","Verification failed.Please try again")
                console.error(JSON.stringify(signUpAttempt,null,2))
            }

        } catch (error) {
            Alert.alert("Error", error.errors?.[0]?.message || "Verification failed. Please try again")
            console.error(JSON.stringify(error,null,2))            
        }finally{
            setLoading(false)
        }
    }
    return(
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
                            source={require("../../assets/images/i3.png")}
                            style={authStyles.image}
                            contentFit="contain"
                        />
                    </View>
                    <Text style={authStyles.title}>Verify Your Email</Text>
                    <Text style={authStyles.subtitle}>We&apos;ve sent a verification code to {email}</Text>
                    <View style={authStyles.formContainer}>
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Enter Verification Code"
                                placeholderTextColor={COLORS.textLight}
                                value={code}
                                onChangeText={setCode}
                                keyboardType="number-pad"
                                autoCapitalize="none"
                            />
                        </View>                        
                        <TouchableOpacity
                            style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                            onPress={handleVerification}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={authStyles.buttonText}>
                                Verify Email
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[authStyles.linkContainer]}
                            onPress={onBack}
                        >
                            <Text style={authStyles.link}>Back to Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default VerifyEmailScreen