import { AddTaskModal } from "@/components/AddTaskModal";
import { DashboardStats } from "@/components/DashboardStats";
import { FAB } from "@/components/FAB";
import { TaskItem } from "@/components/TaskItem";
import Wrapper from "@/components/Wrapper";
import { Colors, Fonts } from "@/constants/theme";
import { useTaskStore } from "@/store/useTaskStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const router = useRouter();
  const { tasks, addTask, toggleTask, deleteTask } = useTaskStore();
  const [modalVisible, setModalVisible] = useState(false);

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  // Get recent incomplete tasks (last 5)
  const recentTasks = tasks.filter((t) => !t.completed).slice(0, 5);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
  });

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="grid-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.dateText}>{today}</Text>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.greetingTitle}>
        Let&apos;s make a{"\n"}habits together 🙌
      </Text>
    </View>
  );

  return (
    <Wrapper paddingHorizontal={20} bg={Colors.secondary}>
      {renderHeader()}

      <View style={styles.container}>
        <DashboardStats
          total={totalTasks}
          active={activeTasks}
          completed={completedTasks}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>In Progress</Text>
          <TouchableOpacity onPress={() => router.push("/tasks")}>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {recentTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No tasks in progress. Great job!
            </Text>
          </View>
        ) : (
          <FlatList
            data={recentTasks}
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

      <FAB onPress={() => setModalVisible(true)} />

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={addTask}
      />

      <StatusBar style="dark" />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  dateText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  greetingTitle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.textPrimary,
    lineHeight: 36,
  },
  container: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 24,
    paddingHorizontal: 4,
  },

  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  listContent: {
    paddingBottom: 100,
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

export default Home;
