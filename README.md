# 🧠 Emotion-Aware Conversational AI (FastAPI + OpenAI)

A lightweight, text-based emotional companion chatbot backend built with **FastAPI** and **OpenAI**.
The service provides empathetic, therapist-style conversational responses with basic emotion detection and crisis-safety handling.

## 🚀 Features

* Emotion classification using LLM-based inference
* Empathetic, supportive response generation
* Crisis-related message detection
* FastAPI backend with CORS enabled
* Simple `/chat` POST endpoint
* Low-memory design suitable for lightweight cloud hosting

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

* **FastAPI** — API framework
* **Uvicorn** — ASGI server
* **OpenAI API** — emotion classification + dialogue generation
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

Create a `.env` or set environment variables:

```
OPENAI_API_KEY=your_key_here
```

## 🌐 Deployment

Use the following start command for production environments:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---
