import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Alert, Button, FlatList, StyleSheet,  Text,  TextInput,  TouchableOpacity, View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [text, setText] = useState("");
  const [save, setSave] = useState([]);
  const handleclick = () => { 
 Alert.alert(text)

  }
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const contacts = [
    {
        id: '1',       
    }, 
]
  return (
    <View style={styles.view}>
      <TextInput value={text} onChangeText={setText}  placeholder= "Напишите текст" style={styles.input}></TextInput>
      <TouchableOpacity onPress={handleclick} style={styles.button}><Text>Ответ</Text></TouchableOpacity>
      <FlatList
                data={contacts} 
                keyExtractor={(item) => item.id} 
                renderItem={(
                ) => (
                    <View >                   
                            <Text>{save}</Text>    
                    </View>
                )}
            />
    </View>
    
  );
}
const styles = StyleSheet.create({
    input: {
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#000000",
       color: "#ff0000",
       width: 150,
       height: 40,
     },
     view: {
      justifyContent: "center",
      alignItems: 'center',
     },
     button : {
      width: 150,
      height: 20,
      borderWidth: 1,
      borderColor: "#000000",
      alignContent: "center",
      alignItems: "center",
     },
     text: {
      width:50,
      height: 50,
      color: "#ff0000",
     }
   });


