# 🛠️ Utility App – Backend

This is the backend for the Utility App, built with **Node.js**, **Express**, and **SQLite**, and integrates with **Google Sheets** for data sync.

---

## ✅ Prerequisites

- Node.js (v18+ recommended)
- A Google Cloud Service Account with Google Sheets API enabled
- Access to the Google Sheet you want to sync with

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Utility-App.git
cd Utility-App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root folder:

```
PORT=
GOOGLE_SHEETS_KEY_PATH=./backend/keys/sheets-credentials.json
SHEET_ID=your_sheet_id_here

```

Replace `your_google_sheet_id_here` with the actual ID from your Google Sheet URL.


---

### 4. Google Sheets Credentials Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Sheets API**.
3. Create a **Service Account**, download the credentials JSON.
4. Save it as:

```
backend/keys/sheets-credentials.json
```

5. Share the Google Sheet with your Service Account's email (e.g. `your-service-account@your-project.iam.gserviceaccount.com`) as **Editor**.

---

### 5. Run the Project

```bash
npm run dev
```

Backend will start at:

```
http://localhost:7000
```

---

## 🔗 API Endpoints

### Google Sheet Sync

| Method | Endpoint     | Description                   |
|--------|--------------|-------------------------------|
| GET    | /api/load    | Load data from Google Sheet   |
| POST   | /api/save    | Save data to Google Sheet     |

### Property CRUD

| Method | Endpoint                      | Description                  |
|--------|-------------------------------|------------------------------|
| GET    | /api/properties               | Get all properties           |
| GET    | /api/properties/:id           | Get a property by ID         |
| GET    | /api/properties/city/:city    | Get properties by city       |
| POST   | /api/properties               | Add a new property           |
| PUT    | /api/properties/:id           | Update property by ID        |
| DELETE | /api/properties/:id           | Delete property by ID        |

---

## 📁 Folder Structure

```
Utility-App/
├── backend/
│   ├── app.js                 <-- Express app setup
│   ├── index.js               <-- Entry point (loads DB, then app.js)
│   ├── controllers/
│   ├── routes/
│   ├── db/
│   ├── sheets/
│   ├── keys/                  <-- sheets-credentials.json (ignored)
│   └── .env                   <-- local backend env file if needed
├── .env                       <-- root env for SHEET_ID etc.
├── package.json
└── README.md
```

---

## 🔐 Important Notes

- The file `backend/keys/sheets-credentials.json` is **ignored via .gitignore**.
- Do **not commit** any secrets or `.env` files.

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) or any REST client to test the API endpoints locally.

