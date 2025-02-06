import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Alert, Button, FlatList, StyleSheet,  Switch,  Text,  TextInput,  TouchableOpacity, View } from 'react-native';
import { customAlphabet} from 'nanoid/non-secure';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [text, setText] = useState("");
  const [isEnabled, setiIsEnable] = useState(false)
  const toggleSwitch  = () => setiIsEnable ((text) => !text)
  const nanoid = customAlphabet("adcdefghijklmnopqrstuvwxyz0123456789",10)
  const handleclick = () => { 
    setTasks([
      ...tasks,
      {id: nanoid(), text: text, state: false}
    ])
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
      text: "123",
      id: nanoid(),
      state: false      
    }, 
]
const handleSubmit = () => {

}
const handledelete = (id: string) => {
  setTasks(tasks.filter((text) => text.id !== id))
}
const [tasks, setTasks] = useState([...contacts])
  return (
    <View style={styles.view}>
      <TextInput value={text} onChangeText={setText} onSubmitEditing={handleSubmit} placeholder= "Напишите текст" style={styles.input}></TextInput>
      <TouchableOpacity onPress={handleclick} style={styles.button}><Text>Ответ</Text></TouchableOpacity>
      <FlatList  data={tasks} keyExtractor={(item) => item.id} renderItem={(
              {item},
            ) => (
              <View>  
                <Text>{item.text}</Text>
                <TouchableOpacity onPress={() => handledelete(item.id)} style={styles.deleted}><Text>Удалить</Text></TouchableOpacity>
              </View>
            )}/>
      <View style={styles.switcha}>
      <Text style={styles.text}>Согласен с условиями:</Text>
      <Switch 
      value={isEnabled}
        onValueChange={toggleSwitch} 
        thumbColor={isEnabled ? '#4CAF50' : '#f4f3f4'} 
        trackColor={{ false: '#767577', true: '#81b0ff' }} 
      />
    </View>
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
     deleted: {
      width: 50,
      height: 50,
     },
     text: {
      width: 150,
      height: 50,
      color: "#ff0000",
      justifyContent: "center",
      alignItems: "center",
     }, 
     switcha: {
      width: 50,
      height: 50,
      color: "#ffa500",
     }
   });


