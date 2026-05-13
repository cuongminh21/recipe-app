import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL } from './../../constants/api';
import { favoritesStyles } from './../../assets/styles/favorites.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useClerk, useUser } from '@clerk/expo'
import RecipeCard from '../../components/RecipeCard';
import FavoritesNotFound from './../../components/NotFoundFavorites';
import LoadingSpinner from '../../components/LoadingSpinner';

const FavoritesScreen = () => {
  const { signOut } = useClerk()
  const { user } = useUser()
  const [favoriteRecipes, setFavoriteRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch(`${API_URL}/favorites/${user.id}`)
        if (!response.ok) throw new Error("Failed to fetch favorites")
        const favorites = await response.json()

        const transformedFavorites = favorites.map(favorite => ({
          ...favorite,
          id: favorite.recipeId
        }))
        setFavoriteRecipes(transformedFavorites)
      } catch (error) {
        Alert.alert("Error", "Failed to load favorites")
        console.error("Failed to load favorites", error);

      } finally {
        setLoading(false)
      }
    }
    loadFavorites()
  }, [user.id])

  const handleSignOut = async () => {
    Alert.alert("Logout", "Are your sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: signOut },
    ])
  }
  if (loading) return <LoadingSpinner message='Loading your favorites...' />

  return (
    <View style={favoritesStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Favorites</Text>
          <TouchableOpacity style={favoritesStyles.logoutButton}
            onPress={handleSignOut}
          >
            <Ionicons name='log-out-outline' size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favoriteRecipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={searchStyles.row}
            contentContainerStyle={searchStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<FavoritesNotFound />}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default FavoritesScreen