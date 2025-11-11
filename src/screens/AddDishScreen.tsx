import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Pressable, 
    ScrollView, 
    ImageBackground,
    Alert, 
    Image, 
} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from "@expo/vector-icons";
import uuid from 'react-native-uuid'; 
import { MenuItem } from '../../App'; 

// --- LOCAL FOOD IMAGES ---

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

// bg image
const BgImage = require('../../assets/pexels-brettjordan-825661.jpg');
const HeaderIcon = require('../../assets/pexels-reneterp-2544829.jpg');

// categories
const COURSES = ['Starter', 'Main', 'Dessert', 'Drink', 'Special'];

const INGREDIENT_OPTIONS = ["Tomato", "Mozzarella", "Chicken", "Basil"] as const;

// colors
const COLORS = {
    PRIMARY: '#124559',
    SECONDARY: '#0C3853',
    BACKGROUND: '#F4F3EE',
    ACCENT: '#5E88A3',
    DANGER: '#B75D69',
    FOOTER: '#484848',
    TEXT: 'black',
};


// Inputs form
interface DishFormData {
    name: string;
    description: string;
    price: string;
}

// Props Interface receives the addDish function from App.tsx
interface AddDishScreenProps {
    navigation: any;
    addDish: (dish: MenuItem) => void; 
}


export default function AddDishScreen({ navigation, addDish }: AddDishScreenProps) { 
    
    const [dish, setDish] = useState<DishFormData>({
        name: '',
        description: '',
        price: '',
    });

    const [selectedCourse, setSelectedCourse] = useState<string | null>(null); 
    
    const [imageIndex, setImageIndex] = useState<number | null>(null); 
    // State for selected ingredients
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    // To manage ingredient selection
   const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => {
        //If the ingredient is already selected, it is removed
        if (prev.includes(ingredient)) {
            return prev.filter(ing => ing !== ingredient);
        }
        // Otherwise, we simply add it
        return [...prev, ingredient];
    });
};

    // Function to reset the form
    const clearInputs = () => {
        setDish({ name: '', description: '', price: '' });
        setSelectedCourse(null);
        setImageIndex(null);
        setSelectedIngredients([]); 
    };
    
    // Validation + Addition logic
    const handleSave = () => {
        
        // 1. Validation IF
        if (!dish.name.trim()) {
            Alert.alert("Validation Error", "The dish name is required.");
            return;
        }
        if (!selectedCourse) {
            Alert.alert("Validation Error", "Please select a category.");
            return;
        }
        
        const priceString = dish.price.trim().replace(',', '.').replace('R', '').trim(); 
        const priceValue = parseFloat(priceString); 

        if (isNaN(priceValue) || priceValue <= 0) {
            Alert.alert("Validation Error", "The price must be a valid positive number.");
            return;
        }

        // Creating the MenuItem object
        const newDish: MenuItem = {
            id: uuid.v4() as string, // Unique ID
            name: dish.name.trim(),
            description: dish.description.trim() || 'No description provided.',
            price: priceValue,
            category: selectedCourse,
            // Adds the imageIndex if it exists
            ...(imageIndex !== null && { imageIndex: imageIndex }), 
            // select ingredients
            ...(selectedIngredients.length > 0 && { ingredients: selectedIngredients }), 
        };

        // Add to List and Clean Up
        addDish(newDish); 
        clearInputs(); 
        
        navigation.goBack(); 
    };

    const handleCancel = () => {
        clearInputs(); 
        navigation.goBack(); 
    };
    
    // Logic for selecting local image by index
    const handleAddImage = () => {
        if (LOCAL_FOOD_IMAGES.length === 0) {
            Alert.alert("Error", "Please add valid image paths in LOCAL_FOOD_IMAGES.");
            return;
        }
        
        const nextIndex = imageIndex !== null ? (imageIndex + 1) % LOCAL_FOOD_IMAGES.length : 0;
        setImageIndex(nextIndex); 
        
    
    };

    const handleChange = (key: keyof DishFormData, value: string) => {
        setDish(prev => ({ ...prev, [key]: value }));
    };

    const CourseChip = ({ course }: { course: string }) => {
        
        const isSelected = course === selectedCourse;
        return (
            <Pressable 
                style={[
                    styles.chip, 
                    isSelected ? styles.chipSelected : styles.chipNotSelected
                ]}
                onPress={() => setSelectedCourse(course)}
            >
                <Text style={[
                    styles.chipText, 
                    isSelected ? styles.chipTextSelected : styles.chipTextNotSelected
                ]}>
                    {course}
                </Text>
            </Pressable>
        );
    };

    return (
        <ImageBackground source={BgImage} style={styles.backgroundImage}>
            <View style={styles.overlay}>

                <ScrollView 
                    style={styles.container} 
                    contentContainerStyle={styles.contentContainer}
                >
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Image source={HeaderIcon} style={styles.headerIcon} />
                        <Text style={styles.headerTitle}>At Chef Christophel's table</Text>
                    </View>

                    <Text style={styles.screenTitle}>Add a dish</Text>

                    {/* FORM */}
                    <View style={styles.formContainer}>
                        
                        <Text style={styles.label}>Dish Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter dish name"
                            value={dish.name}
                            onChangeText={(text) => handleChange('name', text)}
                        />
                        
                        <Text style={styles.label}>Description:</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Enter description"
                            multiline
                            value={dish.description}
                            onChangeText={(text) => handleChange('description', text)}
                        />

                        <Text style={styles.label}>Price:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="R 0.00"
                            value={dish.price}
                            onChangeText={(text) => handleChange('price', text)}
                            keyboardType="numeric"
                        />

                        {/* Category */}
                        <Text style={styles.label}>Category:</Text>
                        <View style={styles.chipsContainer}>
                            {COURSES.map(course => (
                                <CourseChip key={course} course={course} />
                            ))}
                        </View>

                        {/* Ingredients section */}
                        <Text style={styles.label}>Select up to 4 Ingredients</Text>
                        <View style={styles.chipsContainer}>
                            {INGREDIENT_OPTIONS.map((ing) => {
                                const active = selectedIngredients.includes(ing);
                                
                                return (
                                    <Pressable
                                        key={ing}
                                        onPress={() => toggleIngredient(ing)}
                                        style={[
                                            styles.chip,
                                            active ? styles.chipSelected : styles.chipNotSelected
                                        ]}
                                    >
                                        <Ionicons
                                            name={active ? "checkbox" : "square-outline"}
                                            size={18}
                                            color={active ? "white" : COLORS.ACCENT}
                                            style={{ marginRight: 6 }}
                                        />
                                        <Text style={[
                                            styles.chipText,
                                            active ? styles.chipTextSelected : styles.chipTextNotSelected
                                        ]}>
                                            {ing}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        

                        {/* ADD IMAGE BUTTON */}
                        <Pressable 
                            onPress={handleAddImage}
                            style={styles.selectImageButton}
                        >
                            <MaterialCommunityIcons 
                                name={imageIndex !== null ? "image-edit-outline" : "image-plus"} 
                                size={20} 
                                color={COLORS.PRIMARY} 
                            />
                            <Text style={styles.selectImageText}>
                                {imageIndex !== null ? `Selected Image (${imageIndex + 1})` : "Add image (optional)"}
                            </Text>
                        </Pressable>
                        
                        {/* Image preview */}
                        {imageIndex !== null && (
                            <Image 
                                source={LOCAL_FOOD_IMAGES[imageIndex]} 
                                style={styles.imagePreview} 
                            />
                        )}

                        {/* SAVE / CANCEL BUTTONS */}
                        <View style={styles.buttonGroup}>
                            <Pressable 
                                style={[styles.actionButton, styles.saveButton]}
                                onPress={handleSave} 
                            >
                                <Text style={styles.actionButtonText}>Save</Text>
                            </Pressable>
                            
                            <Pressable 
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={handleCancel}
                            >
                                <Text style={styles.actionButtonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({

    //STYLES

    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginTop: 15,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: COLORS.ACCENT,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.85)',
    },

    container: {
        flex: 1,
    },

    contentContainer: {
        paddingBottom: 30,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(18,69,89,0.9)',
    },

    headerIcon: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: COLORS.FOOTER,
        marginRight: 10,

    },

    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },

    screenTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
        color: COLORS.TEXT,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },

    formContainer: {
        padding: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.TEXT,
        marginTop: 15,
        marginBottom: 5,
    },

    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },

    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },

    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
        marginBottom: 10,
    },

    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,

    },

    chipText: { fontSize: 14 },

    chipNotSelected: {
        backgroundColor: COLORS.BACKGROUND,
        borderColor: COLORS.ACCENT,
    },

    chipTextNotSelected: {
        color: COLORS.ACCENT,
    },

    chipSelected: {
        backgroundColor: COLORS.SECONDARY,
        borderColor: COLORS.SECONDARY,
    },

    chipTextSelected: {
        color: 'white',
        fontWeight: 'bold',
    },

    selectImageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.ACCENT,
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.7)',
    },

    selectImageText: {
        color: COLORS.PRIMARY,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },

    buttonGroup: {
        marginTop: 30,
    },

    actionButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },

    actionButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    saveButton: {
        backgroundColor: COLORS.ACCENT,
    },

    cancelButton: {
        backgroundColor: COLORS.DANGER,
    },
    ingredientCount: {
        fontSize: 14,
        color: COLORS.ACCENT,
        fontStyle: 'italic',
        marginTop: 5,
    },

});