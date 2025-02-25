# Parking Saver

Parking Saver is a **Progressive Web App (PWA)** built with **Django** to help users **save and retrieve their parking spot effortlessly**. It utilizes **geolocation** to store the user's location and provides **Google Maps integration** to navigate back when needed. The app supports **offline functionality**, **dark mode**, and is optimized for **mobile use**.

---

## 🚀 Features

- 📍 **Save your parking spot** with a single tap
- 🗺️ **Retrieve location** and navigate via Google Maps
- 🌙 **Dark mode toggle** for better visibility
- 📶 **Offline support** through service workers
- 📱 **Mobile-first responsive design**
- 🔧 **PWA installable** for a native app-like experience

---

## 🛠️ Technologies Used

- **Backend:** Django
- **Frontend:** Bootstrap 5, JavaScript
- **PWA Features:** Service Workers, Web App Manifest
- **Deployment:** Railway

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
 git clone https://github.com/yourusername/parking-saver.git
 cd parking-saver
```

### 2️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Set up environment variables
Create a `.env` file and add the following:
```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1, localhost
```

### 4️⃣ Run migrations
```bash
python manage.py migrate
```

### 5️⃣ Collect static files
```bash
python manage.py collectstatic
```

### 6️⃣ Run the Django server
```bash
python manage.py runserver
```

The app should now be accessible at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🤝 Contributing
Feel free to **fork** this repository and submit **pull requests** to improve the project.

---

## 📜 License
This project is **open-source** and available under the **MIT License**.
