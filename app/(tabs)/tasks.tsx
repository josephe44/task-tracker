import { AddTaskModal } from "@/components/AddTaskModal";
import { TaskFilter } from "@/components/TaskFilter";
import { TaskItem } from "@/components/TaskItem";
import Wrapper from "@/components/Wrapper";
import { Colors, Fonts } from "@/constants/theme";
import { useTaskStore } from "@/store/useTaskStore";
import { FilterType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Tasks = () => {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask, addTask } = useTaskStore();
  const [filter, setFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Active"
        ? !task.completed
        : task.completed;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <Wrapper paddingHorizontal={20} bg={Colors.secondary}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Projects</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={Colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title"
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tasks found.</Text>
          </View>
        ) : filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {filter.toLowerCase()} tasks found.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={addTask}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.textPrimary,
  },
  backButton: {
    padding: 8,
  },
  addButton: {
    padding: 8,
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.textPrimary,
    height: "100%",
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});

export default Tasks;
