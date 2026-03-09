import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Colors, Fonts } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface DashboardStatsProps {
  total: number;
  active: number;
  completed: number;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export const DashboardStats: React.FC<DashboardStatsProps> = ({ total, active, completed }) => {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 16}
      >
        {/* Main Progress Card */}
        <View style={[styles.card, styles.purpleCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Daily Progress</Text>
            <View style={styles.iconContainer}>
              <Ionicons name="trending-up" size={20} color="#fff" />
            </View>
          </View>
          
          <Text style={styles.cardSubtitle}>You have completed</Text>
          <Text style={styles.completionText}>{completionRate}%</Text>
          <Text style={styles.cardSubtitle}>of your tasks today</Text>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${completionRate}%` }]} />
          </View>
        </View>

        {/* Active Tasks Card */}
        <View style={[styles.card, styles.orangeCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, styles.darkText]}>Active Tasks</Text>
            <View style={[styles.iconContainer, styles.orangeIconBg]}>
              <Ionicons name="time-outline" size={20} color={Colors.white} />
            </View>
          </View>
          
          <Text style={[styles.bigNumber, styles.darkText]}>{active}</Text>
          <Text style={[styles.cardSubtitle, styles.darkText]}>tasks remaining</Text>
        </View>

         {/* Completed Tasks Card */}
         <View style={[styles.card, styles.greenCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, styles.whiteText]}>Completed</Text>
            <View style={[styles.iconContainer, styles.greenIconBg]}>
              <Ionicons name="checkmark-circle-outline" size={20} color={Colors.white} />
            </View>
          </View>
          
          <Text style={[styles.bigNumber, styles.whiteText]}>{completed}</Text>
          <Text style={[styles.cardSubtitle, styles.whiteText]}>tasks finished</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  card: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 24,
    padding: 24,
    marginRight: 16,
    justifyContent: 'space-between',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  purpleCard: {
    backgroundColor: Colors.primary,
  },
  orangeCard: {
    backgroundColor: '#FFE0B2', // Light Orange
  },
  greenCard: {
    backgroundColor: Colors.success,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.white,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeIconBg: {
    backgroundColor: '#FB8C00',
  },
  greenIconBg: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  cardSubtitle: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  completionText: {
    fontFamily: Fonts.bold,
    fontSize: 48,
    color: Colors.white,
    lineHeight: 56,
  },
  bigNumber: {
    fontFamily: Fonts.bold,
    fontSize: 48,
    color: Colors.white,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  darkText: {
    color: Colors.textPrimary,
  },
  whiteText: {
    color: Colors.white,
  },
});
