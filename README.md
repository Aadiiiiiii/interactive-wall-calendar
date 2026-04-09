# Frontend Engineering Challenge

## About the Project

This project is an interactive wall calendar built using **Next.js and React**.

The idea was to take inspiration from a **physical wall calendar** and turn it into a clean, modern web component that is not just visually appealing but also fully functional.

Along with the basic calendar view, users can:

- select a date range
- add notes
- navigate across months
- and have their notes saved automatically

Everything is handled on the frontend using `localStorage`, as required.

## What It Can Do

### 🗓 Date Range Selection

You can select a start and end date directly from the calendar.
The UI clearly shows:

- start date
- end date
- and the selected range in between


### Notes for Selected Dates

Once a date range is selected, you can write notes for it.

- Notes are tied to that specific range
- They are saved automatically
- When you select the same range again, the written note loads back


### Month Navigation

You can move between months using the navigation buttons.
The calendar updates dynamically.


### Responsive Design

The component works smoothly on different screen sizes:

- **Desktop:** Hero image on top, notes and calendar below
- **Mobile:** Everything stacks neatly and remains easy to use


## Extra Features (Added for Better UX)--Creative Liberty

I added a few extra features to improve usability and show product thinking:

- **Season-based hero image** (changes with month)
- **Holiday markers** on important dates
- **Clear selection button**
- **Selected range summary** (e.g., “5 days selected”)


## Tech Stack

- **Next.js (App Router)**
- **React (TypeScript)**
- **CSS (custom styling + Tailwind base)**
- **localStorage** for saving notes


## Project Structure

```bash
calendar-component/
│
├── app/
│   ├── page.tsx
│   ├── globals.css
│
├── components/
│   ├── Hero.tsx
│   ├── Calendar.tsx
│   ├── Notes.tsx
│
├── public/
│   ├── spring.jpg
│   ├── summer.jpg
│   ├── autumn.jpg
│   ├── winter.jpg
```


## Running Locally

1. Clone the repo:

```bash
git clone https://github.com/your-username/calendar-component.git
cd calendar-component
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```


## Demo

Link for loom: https://www.loom.com/share/b046b995149e4b50b24fb475ce905c14
Link for Drive: https://drive.google.com/file/d/1-zmU4uplUeghwr-vNOrUhLFN6VkEK-aF/view?usp=sharing


## Live Demo

Link for Vercel: https://interactive-wall-calendar-topaz.vercel.app


## Thought Process

While building this, I focused on:

- keeping the UI close to a **wall calendar feel**
- making the component **intuitive and responsive**
- keeping the code modular (separate components for hero, calendar, notes)
- adding small features that improve real usability

## Author

Aditya

