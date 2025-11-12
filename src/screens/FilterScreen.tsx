import { 
    View, 
    Text, 
    StyleSheet, 
    Pressable, 
    ScrollView, 
    ImageBackground,
    Image,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuItem } from '../../App';

// --- LOCAL FOOD IMAGES ---
// A list of local images that can be used for dishes.
const LOCAL_FOOD_IMAGES = [
    require('../../assets/pexels-brettjordan-825661.jpg'), 
    require('../../assets/pexels-dzeninalukac-1583884.jpg'),
    require('../../assets/pexels-ella-olsson-572949-1640777.jpg'),
    require('../../assets/pexels-muffin-1653877.jpg'),
    require('../../assets/pexels-robinstickel-70497.jpg'), 
    require('../../assets/pexels-valeriya-1639557.jpg'),
    require('../../assets/pexels-willpicturethis-2641886.jpg'),
    require('../../assets/pexels-aishwarya-rivonker-2272675-3948523.jpg'),
    require('../../assets/pexels-alexander-cuelove-1194465-2273823.jpg'),
    require('../../assets/pexels-catscoming-674574.jpg'),
    require('../../assets/pexels-charlotte-may-5946656.jpg'),
    require('../../assets/pexels-cheasomben-1294943.jpg'),
    require('../../assets/pexels-chevanon-302899.jpg'),
    require('../../assets/pexels-david-disponett-1118410-2161643.jpg'),
    require('../../assets/pexels-enginakyurt-1437267.jpg'),
    require('../../assets/pexels-foodie-factor-162291-539451.jpg'),
    require('../../assets/pexels-fotios-photos-1279330.jpg'),
    require('../../assets/pexels-harry-dona-2338407.jpg'),
    require('../../assets/pexels-horizon-content-2100060-3727250.jpg'),
    require('../../assets/pexels-isabella-mendes-107313-338713.jpg'),
    require('../../assets/pexels-jayoke-851555.jpg'),
    require('../../assets/pexels-joshsorenson-990439.jpg'),
    require('../../assets/pexels-mali-64208.jpg'),
    require('../../assets/pexels-quang-nguyen-vinh-222549-2133989.jpg'),
    require('../../assets/pexels-rodrigo-ortega-2044210904-29174060.jpg'),
    require('../../assets/pexels-ruben-dao-cuentas-239930863-34303327.jpg'),
    require('../../assets/pexels-sadman-1564534.jpg'),
    require('../../assets/pexels-sebastian-coman-photography-1598188-3625372.jpg'),
    require('../../assets/pexels-sittisak-c-842235-1739347.jpg'),
    require('../../assets/pexels-suzyhazelwood-1126359.jpg'),
    require('../../assets/pexels-trista-chen-198334-723198.jpg'),
    require('../../assets/pexels-valeriya-1251210.jpg'),
];

// Default background and header images.
const BgImage = require('../../assets/pexels-brettjordan-825661.jpg');
const HeaderIcon = require('../../assets/pexels-reneterp-2544829.jpg');

// Color palette used throughout the screen.
const COLORS = {
    PRIMARY: '#124559',
    SECONDARY: '#0C3853',
    BACKGROUND: '#F4F3EE',
    ACCENT: '#5E88A3',
    DANGER: '#B75D69',
    FOOTER: '#484848',
    TEXT: 'black',
};

const CATEGORIES = ['All', 'Starter', 'Main', 'Dessert'];

// Props type for this screen
interface FilterScreenProps {
    navigation: any;
    menuItems: MenuItem[];
}

export default function FilterScreen({ navigation, menuItems }: FilterScreenProps) {
    // Track which category is selected
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    //Calculation of statistics by category
    const categoryStats = useMemo(() => {
        const stats: Record<string, { count: number; average: number }> = {};
        
        CATEGORIES.forEach(category => {
            if (category === 'All') {
                const total = menuItems.reduce((sum, item) => sum + item.price, 0);
                stats['All'] = {
                    count: menuItems.length,
                    average: menuItems.length > 0 ? total / menuItems.length : 0
                };
            } else {
                // Calculate stats per specific category
                const filtered = menuItems.filter(item => item.category === category);
                const total = filtered.reduce((sum, item) => sum + item.price, 0);
                stats[category] = {
                    count: filtered.length,
                    average: filtered.length > 0 ? total / filtered.length : 0
                };
            }
        });
        
        return stats;
    }, [menuItems]);

    // Filter dishes based on selected category
    const filteredDishes = useMemo(() => {
        if (!selectedCategory || selectedCategory === 'All') {
            return menuItems;
        }
        return menuItems.filter(item => item.category === selectedCategory);
    }, [selectedCategory, menuItems]);

    // Update selected category
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    // Button component for each category 
    const CategoryButton = ({ category }: { category: string }) => {
        const isSelected = category === selectedCategory;
        const stat = categoryStats[category] || { count: 0, average: 0 };

        return (
            <Pressable
                style={[
                    styles.categoryButton,
                    isSelected && styles.categoryButtonSelected
                ]}
                onPress={() => handleCategorySelect(category)}
            >
                <Text style={[
                    styles.categoryButtonText,
                    isSelected && styles.categoryButtonTextSelected
                ]}>
                    {category}
                </Text>
            </Pressable>
        );
    };

    //  Card component for each dish 
    const DishCard = ({ dish }: { dish: MenuItem }) => (
        <View style={styles.dishCard}>
            {dish.imageIndex !== undefined ? (
                <Image 
                    source={LOCAL_FOOD_IMAGES[dish.imageIndex]} 
                    style={styles.dishImage} 
                />
            ) : (
                <View style={styles.dishImagePlaceholder}>
                    <MaterialCommunityIcons 
                        name="silverware-fork-knife" 
                        size={40} 
                        color="#ccc" 
                    />
                </View>
            )}
            {/* Dish details */}
            <View style={styles.dishInfo}>
                <Text style={styles.dishName} numberOfLines={2}>
                    {dish.name}
                </Text>
                
                {dish.description && dish.description !== 'No description provided.' && (
                    <Text style={styles.dishDescription} numberOfLines={2}>
                        {dish.description}
                    </Text>
                )}
                {/* Optional ingredients */}
                {dish.ingredients && dish.ingredients.length > 0 && (
                    <Text style={styles.dishIngredients} numberOfLines={1}>
                        {dish.ingredients.join(', ')}
                    </Text>
                )}
                {/* Price */}
                <Text style={styles.dishPrice}>R {dish.price.toFixed(2)}</Text>
            </View>
        </View>
    );

    return (
        <ImageBackground source={BgImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Image source={HeaderIcon} style={styles.headerIcon} />
                    <Text style={styles.headerTitle}>At Chef Christophel's table</Text>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.screenTitle}>Filter dishes</Text>
                </View>

                {/* Category Buttons */}
                <View style={styles.categoriesContainer}>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesScrollContent}
                    >
                        {CATEGORIES.map(category => (
                            <CategoryButton key={category} category={category} />
                        ))}
                    </ScrollView>
                </View>

                {/* Stats section (visible when category selected) */}
                {selectedCategory && (
                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <MaterialCommunityIcons 
                                name="food" 
                                size={24} 
                                color={COLORS.PRIMARY} 
                            />
                            <Text style={styles.statNumber}>
                                {categoryStats[selectedCategory]?.count || 0}
                            </Text>
                            <Text style={styles.statLabel}>
                                {categoryStats[selectedCategory]?.count === 1 ? 'dish' : 'dishes'}
                            </Text>
                        </View>
                        
                        <View style={styles.statBox}>
                            <MaterialCommunityIcons 
                                name="currency-usd" 
                                size={24} 
                                color={COLORS.ACCENT} 
                            />
                            <Text style={styles.statNumber}>
                                R {categoryStats[selectedCategory]?.average.toFixed(2) || '0.00'}
                            </Text>
                            <Text style={styles.statLabel}>Average price</Text>
                        </View>
                    </View>
                )}

                {/*Dish list or empty state */}
                <ScrollView style={styles.content}>
                    {!selectedCategory ? (
                        // Initial state - no search
                        <View style={styles.emptyState}>
                            <MaterialCommunityIcons 
                                name="filter-outline" 
                                size={100} 
                                color="#ccc" 
                            />
                            <Text style={styles.emptyStateTitle}>
                                Select a category
                            </Text>
                            <Text style={styles.emptyStateText}>
                                Choose a category above to filter and view dishes
                            </Text>
                        </View>
                    ) : filteredDishes.length === 0 ? (
                        // Empty category
                        <View style={styles.emptyState}>
                            <MaterialCommunityIcons 
                                name="food-off" 
                                size={100} 
                                color="#ccc" 
                            />
                            <Text style={styles.emptyStateTitle}>
                                No dishes found
                            </Text>
                            <Text style={styles.emptyStateText}>
                                There are no dishes in the "{selectedCategory}" category yet
                            </Text>
                        </View>
                    ) : (
                        // Dish Grid
                        <View style={styles.dishGrid}>
                            {filteredDishes.map(dish => (
                                <DishCard key={dish.id} dish={dish} />
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </ImageBackground>
    );
}


// STYLES
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },

    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.85)',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(18,69,89,0.9)',
    },

    backButton: {
        marginRight: 10,
        padding: 5,
    },

    headerIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        flex: 1,
    },

    titleContainer: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },

    screenTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.TEXT,
    },

    categoriesContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.28)',
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.PRIMARY,
    },

    categoriesScrollContent: {
        paddingHorizontal: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: COLORS.BACKGROUND,
        borderWidth: 2,
        borderColor: COLORS.ACCENT,
    },

    categoryButtonSelected: {
        backgroundColor: COLORS.PRIMARY,
        borderColor: COLORS.PRIMARY,
    },

    categoryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.ACCENT,
    },

    categoryButtonTextSelected: {
        color: 'white',
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.34)',
    },

    statBox: {
        alignItems: 'center',
        flex: 1,
    },

    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.TEXT,
        marginTop: 5,
    },

    statLabel: {
        fontSize: 14,
        color: COLORS.FOOTER,
        marginTop: 2,
    },

    content: {
        flex: 1,
        padding: 15,
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },

    emptyStateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.FOOTER,
        marginTop: 20,
        marginBottom: 10,
    },

    emptyStateText: {
        fontSize: 16,
        color: COLORS.TEXT,
        textAlign: 'center',
        paddingHorizontal: 40,
    },

    dishGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    dishCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },

    dishImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },

    dishImagePlaceholder: {
        width: '100%',
        height: 120,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },

    dishInfo: {
        padding: 10,
    },

    dishName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.TEXT,
        marginBottom: 5,
    },

    dishDescription: {
        fontSize: 12,
        color: COLORS.FOOTER,
        fontStyle: 'italic',
        marginBottom: 5,
    },

    dishIngredients: {
        fontSize: 11,
        color: COLORS.ACCENT,
        marginBottom: 5,
    },

    dishPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
        marginTop: 5,
    },
});