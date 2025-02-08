import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Alert, Button, FlatList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { customAlphabet } from 'nanoid/non-secure';
import Store from '@/Store';
import { ITask } from '@/Store';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const nanoid = customAlphabet("adcdefghijklmnopqrstuvwxyz0123456789", 10)
  const [text, setText] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks)
  const [switchTasks, setSwitchTasks] = useState(false)
  
  //const toggleSwitch = (id: string) => setTasks((state) => state.map((task) => task.id === id ? { ...task, state: !task.state } : task))
  const handleclick = () => {
    if (text.length >= 1 && text.trim()) {
      ([
        ...tasks,
        { id: nanoid(), text: text, state: false }
      ])
    }
  }
  useEffect(() => {
    if (switchTasks) {
      setFilteredTasks(tasks.filter(state => state.state === true))
    } else {
      setFilteredTasks(tasks)
    }
  }, [switchTasks, tasks])

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


  const handledelete = (id: string) => {
    setTasks(tasks.filter((text) => text.id !== id))
  }

  const handleChange = (e: string) => {
    if (text.length <= 15) {
      setText(e)
    }
    else {
      setText(state => state.slice(0, 15))
      Alert.alert("Ошибка, Запрос привысил 15 символов!!!")
    }

  }

  return (
    <View style={styles.view} >
     <Switch value={switchTasks}  onValueChange={() => setSwitchTasks((state) => !state)}
              
              trackColor={{ false: '#767577', true: '#81b0ff' }}
     >
     </Switch>
      <TextInput value={text} onChangeText={handleChange} placeholder="Напишите текст" style={styles.input}></TextInput>
      <TouchableOpacity onPress={handleclick} style={styles.button}><Text>Ответ</Text></TouchableOpacity>
      <FlatList data={filteredTasks} keyExtractor={(item) => item.id} renderItem={(
        { item },
      ) => (
        <View style={styles.grid}>
          <Text style={styles.text} >{item.text}</Text>
          <TouchableOpacity onPress={() => handledelete(item.id)} style={styles.deleted}><Text>Удалить</Text></TouchableOpacity>
          <View style={styles.switcha}>

            <Switch
              value={item.state}
              onValueChange={() => toggleSwitch(item.id)}
              thumbColor={item.state ? '#4CAF50' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
        </View>
      )} />

    </View>

  );
}
const styles = StyleSheet.create({
  input: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000000",
    color: "#fff",
    width: 150,
    height: 40,
  },
  view: {
    backgroundColor: "rgba(1, 60, 187,0.5)",
    justifyContent: "center",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 30,
  },
  button: {
    width: 150,
    height: 20,
    borderWidth: 1,
    borderColor: "#000000",
    alignContent: "center",
    alignItems: "center",
    margin: 10,
  },
  deleted: {
    alignContent: "center",
    alignItems: "center",
    width: 70,
    height: 35,
    borderWidth: 1,
    borderColor: "#000000",
  },
  text: {
    width: 50,
    height: 50,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  switcha: {
    width: 50,
    height: 35,
    color: "#ffa500",
  },
  grid: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  }
});


