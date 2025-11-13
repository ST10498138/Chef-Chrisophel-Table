#  At Chef Christophel’s Table

##  Student Information
**Name:** Plamedie Muya Tshibangu 
**Module:**  Mobile App Scripting/MAST5112 
**Student Number:**ST10498138   

---

##  Project Links  
**GitHub Repository:** [https://github.com/ST10498138/Chef-Chrisophel-Table.git]  
**YouTube Video (Demo):** [https://youtu.be/FyAWpgZ61t0?si=zrS9HB2_bdAi0u3W]  

---

##  Project Overview  

This project is part of the **Final PoE**, aiming to enhance and expand the restaurant management app developed in the previous phase.  

The updated version introduces new features and improvements based on the latest project requirements.  
It allows the chef to manage dishes more effectively, view price averages by category, and filter dishes using a clean and organized interface.  

---

##  New Features and Improvements  

###  Home Screen  
- Shows the **average price per category** (Starters, Mains, Desserts).  
- Displays the **total number of dishes** currently on the menu.  
- Added a **Delete button** with confirmation to avoid accidental deletions.  
- Improved layout, icons, and readability.  

###  Add Dish Screen  
- Added a **new separate screen** for adding dishes (moved from HomeScreen).  
- Includes **ingredient input fields** for multiple ingredients per dish.  
- Updates the HomeScreen and FilterScreen automatically when a new dish is added.  

###  Filter Screen  
- **New page** that filters dishes by category (All, Starter, Main, Dessert).  
- Shows **the number of dishes** and **average price** for each selected category.  
- Automatically updates when dishes are added or removed.  
- Improved visuals with clean design and background images.  

###  General Improvements  
- Code **refactored into multiple files and components**.  
- Added **clear comments** throughout the code.  
- Enhanced **UI/UX** for consistency and ease of use.  

---

##  Change Log (from Part 2 to Final PoE)

| Feature | Description of Change |
|----------|----------------------|
| HomeScreen | Added average price display, delete button, and design updates |
| AddDishScreen | Created a new separate screen with ingredient support |
| FilterScreen | Added new filtering screen by category |
| App Structure | Refactored into multiple files for better organization |
| UI Design | Improved layout, added icons and images |
| Code Comments | Added detailed inline explanations |

---

##  How It Works  

1. **Add a Dish:**  
   Enter dish details (name, description, category, price, and optional ingredients).  

2. **View Averages:**  
   The HomeScreen calculates and displays the average price per category.  

3. **Filter Dishes:**  
   Use the Filter page to view dishes by category with updated statistics.  

4. **Delete a Dish:**  
   Delete with confirmation; all screens update automatically afterward.  

---

##  Technologies Used  
- React Native (Expo)  
- TypeScript  
- React Navigation  
- React Hooks (useState, useMemo)  
- Expo Icons and Local Assets  

---