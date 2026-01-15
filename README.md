# Facility Management App


## Tech Stack

- **React 18+**
- **TypeScript**
- **Redux Toolkit** – state management
- **React Hook Form** – form handling & validation
- **Tailwind CSS** – styling
- **React Hot Toast** – user feedback
- **Mock API (in-memory)** – no real backend

---

## 1. Setup Instructions

### Prerequisites

- Node.js (v16 or above)
- npm or yarn

### Steps to run locally

```bash
git clone <repository-url>
cd facility-management
npm install
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 2. Key Design Decisions

### React + TypeScript

- Used TypeScript across the app for better type safety and clarity.
- Helps avoid runtime bugs, especially with forms and permissions.

### React Hook Form for Forms

- Chosen for:
  - Performance (minimal re-renders)
  - Easy integration with tab-based validation
- Validation is tab-aware:
  - Errors show only after interaction or on submit

### Redux Toolkit for State

- Facilities list is managed in Redux for:
  - Centralized state
  - Clear separation between UI and data layer
- API layer is mocked to simulate real async behavior.

### Tab-based Facility Form

- Facility creation/editing is split into logical tabs:
  - Basic
  - Contact
  - Location
  - Lifecycle
  - Area Details
  - Classification
- Navigation rules:
  - Forward navigation validates previous tabs
  - Backward navigation is always allowed

### Role & Permission System

- Simple role-based access control:
  - ADMIN, OPS, VIEWER
- Permissions are checked using a `usePermission` hook.
- UI actions (Create/Edit/Delete) are conditionally rendered.

### Reusable UI Components

- Common components like:
  - `Modal`
  - `Button`
  - `InputField`
  - `SelectField`
- Keeps UI consistent and code maintainable.

---

## 3. Trade-offs & Assumptions

### Mock API Instead of Backend

- Assumed backend is not required for this assignment.
- Used in-memory mock data to simulate CRUD operations.


### Single Page Focus

- App is focused only on Facilities management.
- No routing or multi-page navigation added to keep scope controlled.

### Validation UX Choices

- Validation messages:
  - Shown only after field interaction or submit
  - Prevents noisy UX on tab switch
- On final submit, all relevant errors are surfaced.

---

### User Feedback with React Hot Toast

Success and error feedback is provided using React Hot Toast for:

Facility creation success/failure
Facility update success/failure
Facility deletion success/failure


