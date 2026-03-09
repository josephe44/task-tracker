import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterType } from '../types';
import { Colors, Fonts } from '../constants/theme';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <View style={styles.container}>
      {(['All', 'Active', 'Completed'] as FilterType[]).map((filter) => (
        <TouchableOpacity 
          key={filter}
          style={[
            styles.filterButton, 
            currentFilter === filter && styles.activeFilter
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text style={[
            styles.filterText, 
            currentFilter === filter && styles.activeFilterText
          ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  activeFilter: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  filterText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textSecondary,
  },
  activeFilterText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
  },
});
