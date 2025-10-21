import { View, Text, StyleSheet, Pressable, Image, ScrollView, ImageBackground } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuItem } from '../../App'; 


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


const HeaderIcon = require('../../assets/pexels-reneterp-2544829.jpg');
const WelcomeImage = require('../../assets/pexels-ella-olsson-572949-1640777.jpg');
const BgImage = require('../../assets/pexels-brettjordan-825661.jpg');


const COLORS = {
    PRIMARY: '#124559',
    SECONDARY: '#0C3853',
    BACKGROUND: '#F4F3EE',
    ACCENT: '#5E88A3',
    DANGER: '#B75D69',
    FOOTER: '#484848',
    TEXT: 'black',
};

// --- PROPS INTERFACE ---
interface HomeScreenProps {
    navigation: any;
    menuItems: MenuItem[]; 
}

// --- DISH DISPLAY COMPONENT ---
const DishItem = ({ dish }: { dish: MenuItem }) => (
    <View style={dishStyles.itemContainer}>
        
        {dish.imageIndex !== undefined && (
            <Image 
                source={LOCAL_FOOD_IMAGES[dish.imageIndex]} 
                style={dishStyles.smallImage} 
            />
        )}

        <View style={dishStyles.infoContainer}> 
      
            {/* Ligne 1 : Nom, Catégorie et Prix sur la MÊME ligne */}
            <View style={dishStyles.nameAndPriceContainer}>
                <Text style={dishStyles.name}>{dish.name} ({dish.category})</Text>
                <Text style={dishStyles.price}>R {dish.price.toFixed(2)}</Text>
            </View>

            {/* Ligne 2 : AJOUT DE LA DESCRIPTION (sous le nom/prix) */}
            {dish.description && dish.description.trim() !== 'No description provided.' && (
                <Text style={dishStyles.description}>{dish.description}</Text>
            )}
      
        </View>
        
    </View>
);


export default function HomeScreen({ navigation, menuItems }: HomeScreenProps) { 

    const handleAddDish = () => {
        navigation.navigate('AddDish');
    };

    // Calculates the total number of items 
    const totalItems = menuItems.length; 

    return (
        <ImageBackground source={BgImage} style={styles.backgroundImage}>
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Image source={HeaderIcon} style={styles.headerIcon} />
                    <Text style={styles.headerTitle}>At Chef Christophel's table</Text>
                </View>

                {/* Main content */}
                <View style={styles.content}>
                    <View style={styles.introSection}>
                        <Image source={WelcomeImage} style={styles.imagePlaceholder} />
                        <View style={styles.welcomeTextContainer}>
                            <Text style={styles.welcomeTitle}>WELCOME</Text>
                            <Text style={styles.welcomeBody}>
                                Welcome to Chef Christophe's table. Browse available dishes and filter by category to discover our starters, main courses, and desserts.
                            </Text>
                        </View>
                    </View>
                    
                    {/* COUNTER DISPLAY */}
                    <Text style={styles.totalCountText}>Total items: {totalItems}</Text>

                    {totalItems === 0 ? (
                        // Empty list
                        <>
                            <MaterialCommunityIcons name="silverware-fork-knife" size={100} color="#ccc" style={styles.iconPlaceholder} />
                            <Text style={styles.emptyListText}>No dishes added yet</Text>
                        </>
                    ) : (
                        // Displaying the list of dishes
                        <ScrollView style={styles.listContainer}>
                            {menuItems.map(dish => (
                                <DishItem key={dish.id} dish={dish} /> 
                            ))}
                        </ScrollView>
                    )}

                    <Pressable
                        onPress={handleAddDish}
                        
                        style={({ pressed }) => [
                            styles.addButton,
                            { 
                                opacity: pressed ? 0.8 : 1.0, 
                                
                                transform: [{ scale: pressed ? 1.28 : 1.0 }],
                            },
                        ]}
                       >
                        <Text style={styles.addButtonText}>Add a dish</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

// --- GLOBAL STYLES ---

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },

    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: COLORS.PRIMARY, 
    },

    headerIcon: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },

    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },

    introSection: {
        flexDirection: 'row',
        marginBottom: 20, 
    },

    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 15,
    },

    welcomeTextContainer: {
        flex: 1,
    },

    welcomeTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.FOOTER,
        marginBottom: 5,
    },

    welcomeBody: {
        fontSize: 13,
        color: COLORS.TEXT,
    },


    totalCountText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 10,
        color: COLORS.PRIMARY,
        marginTop: 10,
    },

    iconPlaceholder: {
        marginTop: 50,
        marginBottom: 15,
    },

    emptyListText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.FOOTER,
        marginBottom: 40,
    },

    listContainer: {
        width: '100%',
        flex: 1,
        marginBottom: 20,
    },

    addButton: {
        backgroundColor: COLORS.PRIMARY, 
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },

    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },

});

// STYLES FOR LIST ITEMS 

const dishStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 5,
        borderLeftColor: COLORS.ACCENT, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    smallImage: { 
        width: 45,
        height: 45,
        borderRadius: 4,
        marginRight: 15,
        resizeMode: 'cover',
    },

    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
    },

    nameAndPriceContainer: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    name: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.TEXT,
        flexShrink: 1,
        marginRight: 10,
    },

    description: {
        fontSize: 12,
        color: COLORS.FOOTER,
        marginTop: 2,
        fontStyle: 'italic',
    },

    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
    }

});