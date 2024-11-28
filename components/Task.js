import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { themeColour, componentColour } from "../constants";

const Task = ({
  text,
  index,
  checked,
  tasks,
  setTasks,
  completed,
  setCompleted,
}) => {
  const checkHandler = (index) => {
    if (!checked) checkTask(index);
    else unCheckTask(index);
  };

  const checkTask = (index) => {
    // add to completed tasks
    setCompleted([...completed, tasks[index]]);

    // remove from To Do tasks
    let itemsCopy = [...tasks];
    itemsCopy.splice(index, 1);
    setTasks(itemsCopy);
  };

  const unCheckTask = (index) => {
    // add to To Do tasks
    setTasks([...tasks, completed[index]]);

    // remove from completed tasks
    let itemsCopy = [...completed];
    itemsCopy.splice(index, 1);
    setCompleted(itemsCopy);
  };

  const deleteTask = (index) => {
    let itemsCopy = [...completed];
    itemsCopy.splice(index, 1);
    setCompleted(itemsCopy);
  };

  const updateTask = (newText) => {
    if (checked) {
      let itemsCopy = [...completed];
      itemsCopy[index] = newText;
      setCompleted(itemsCopy);
    } else {
      let itemsCopy = [...tasks];
      itemsCopy[index] = newText;
      setTasks(itemsCopy);
    }
  };

  return (
    <View style={[styles.item, checked ? styles.checkedItem : ""]}>
      <View style={styles.itemLeft}>
        <View style={styles.circular}></View>
        <TextInput
          style={[styles.itemText, checked ? styles.checkedItemText : ""]}
          cursorColor="#FFF"
          multiline={true}
          value={text}
          onChangeText={(text) => updateTask(text)}
        />
      </View>
      <View style={styles.itemButtons}>
        <TouchableOpacity
          style={[styles.square, checked ? styles.checkedSquare : ""]}
          onPress={() => checkHandler(index)}
        ></TouchableOpacity>
        {checked && (
          <TouchableOpacity
            style={styles.trashWrapper}
            onPress={() => deleteTask(index)}
          >
            <View>
              <Text style={styles.trash}>🗑️</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: componentColour,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkedItem: {
    opacity: 0.6,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "80%",
  },
  itemButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: themeColour,
    opacity: 0.4,
    borderRadius: 5,
  },
  checkedSquare: {
    backgroundColor: "#FFF",
    opacity: 0.3,
  },
  trashWrapper: {
    marginLeft: 10,
  },
  trash: {
    marginBottom: 2,
    fontSize: 20,
  },
  itemText: {
    maxWidth: "80%",
    color: "#FFF",
  },
  checkedItemText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: themeColour,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 15,
  },
});

export default Task;
