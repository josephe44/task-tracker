# Task Tracker App

A simple mobile application to track tasks, built with React Native, Expo, and TypeScript.

## Setup Instructions

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Start the app**:

    ```bash
    npx expo start
    ```

3.  **Run on device/emulator**:
    - Press `a` for Android emulator.
    - Press `i` for iOS simulator.
    - Scan the QR code with the Expo Go app on your physical device.

## Architectural Decisions & Libraries

### Tech Stack

- **React Native with Expo**: Chosen for rapid development, ease of setup, and excellent cross-platform support.
- **TypeScript**: Used throughout the project to ensure type safety, improve code quality, and provide better developer tooling.
- **Expo Router**: Utilized for file-based routing, which simplifies navigation structure and deep linking.

### State Management & Persistence

- **Zustand**: Selected for global state management. It was chosen over React Context because:
  - It eliminates unnecessary re-renders by allowing components to subscribe only to the specific state slices they need.
  - It has a simpler, cleaner API with less boilerplate (no Provider wrapping hell).
  - It has built-in middleware for persistence.
- **AsyncStorage**: Used in conjunction with Zustand's `persist` middleware to automatically save and load tasks from local storage, ensuring data persistence across app restarts.

### UI/UX Design

- **Component-Based Architecture**: The UI is broken down into small, reusable components (`TaskItem`, `DashboardStats`, `AddTaskModal`, `FAB`) to promote maintainability and separation of concerns.
- **Styling**: A custom theme system (`constants/theme.ts`) is used to maintain consistent colors (`#5452F6` primary purple) and typography (`BricolageGrotesque`) across the app.
- **User Feedback**:
  - **Empty States**: Clear messaging when there are no tasks in progress or completed.
  - **Validation**: Prevents creation of empty tasks.
  - **Haptics**: Subtle feedback on interactions (like tab presses).
  - **Animations**: Smooth modal transitions and layout updates.

## Future Improvements

If I had more time, I would implement:

1.  **Task Editing**: Allow users to tap on a task to edit its title and description.
2.  **Categories/Tags**: Add the ability to categorize tasks (e.g., Work, Personal, Shopping) with color-coded tags.
3.  **Due Dates & Reminders**: Integrate local notifications to remind users of upcoming task deadlines.
4.  **Drag & Drop Reordering**: Allow users to manually reorder their task list.
5.  **Dark Mode Support**: Fully implement a dark theme toggle using the existing theme infrastructure.
6.  **Unit & E2E Tests**: Add Jest unit tests for the store logic and Maestro/Detox tests for critical user flows.
