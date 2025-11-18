# 🧠 Emotion-Aware Conversational AI (FastAPI + OpenAI)

A lightweight, text-based emotional companion chatbot backend built with **FastAPI** and **OpenAI**, paired with a modern **React + TailwindCSS** frontend.
The system provides empathetic conversational responses, basic emotion detection, and crisis-safety handling.

## 🚀 Features

* Emotion classification using LLM inference
* Empathetic, supportive dialogue generation
* Crisis-related message detection
* FastAPI backend with CORS enabled
* Clean, modern React frontend with TailwindCSS styling
* Simple `/chat` POST endpoint for message exchange

## 📡 API Endpoint

### **POST `/chat`**

Request body:

```json
{
  "message": "I feel overwhelmed today.",
  "history": ["user: ...", "bot: ..."]
}
```

Response:

```json
{
  "emotion": "stress",
  "reply": "I'm really sorry you're feeling overwhelmed. I'm here with you."
}
```

## 🏗️ Tech Stack

### **Frontend**

* **React** — UI framework
* **TailwindCSS** — utility-first styling
* **JavaScript/TypeScript** (depending on project setup)

### **Backend**

* **FastAPI** — backend API framework
* **Uvicorn** — ASGI server
* **OpenAI API** — text generation & emotion classification
* **Python 3.10+**

## 📦 Installation

```bash
git clone <repo-url>
cd <repo>
pip install -r requirements.txt
```

## ▶️ Running Locally

```bash
uvicorn main:app --reload
```

API docs available at:

```
http://localhost:8000/docs
```

## 🔐 Environment Variables

Set:

```
OPENAI_API_KEY=your_key_here
```

## 🌐 Deployment

Use the following start command for production environments:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---
