# 🌾 Community Helper Chat - Multilingual LLM Assistant

A responsive web application for rural communities featuring multilingual support, voice input/output, image recognition, and accessibility-first design.

## ✨ Features

### 🌍 Multilingual Support
- **Languages**: English, Hindi (हिंदी), Telugu (తెలుగు), Marathi (मराठी)
- **Real-time UI Translation**: The entire interface updates when you change languages
- **Language-Aware Voice Input**: Automatically detects the language you speak

### 🎤 Voice Interaction
- **Voice-to-Text Input**: Speak your questions in your preferred language
- **Text-to-Speech Output**: Listen to assistant responses in the same language
- **Automatic Language Detection**: Microphone learns which language you're speaking

### 📸 Visual Query Support
- **Image Upload**: Share photos of crop diseases, pests, or other issues
- **Smart Image Handling**: The assistant analyzes uploaded images and provides context-aware responses

### 📱 Mobile-First Design
- **Responsive Layout**: Works seamlessly on all devices (mobile, tablet, desktop)
- **Large Touch Targets**: High-contrast buttons sized for easy interaction
- **Optimized Typography**: Clear, readable text with proper spacing

### 🔌 Offline-First Architecture
- **Connection Status Banner**: Shows real-time connectivity status
- **Light Mode on Low Connection**: Automatically switches to optimized rendering
- **Graceful Degradation**: Core features work even with limited connectivity

### ♿ Accessibility Features
- **High Contrast**: All elements meet WCAG contrast standards
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Friendly**: Semantic HTML and ARIA labels
- **Simple Language**: Content uses plain language, avoiding technical jargon

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Modern browser with Web Speech API support (Chrome, Edge, Safari 14+)

### Installation

1. **Clone and Install**
```bash
cd hackathon
npm install
```

2. **Configure API Keys**

Create a `.env.local` file:
```env
# Gemini API (Recommended for developing countries - free tier available)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# OpenAI API (Alternative)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

# Choose provider
NEXT_PUBLIC_LLM_PROVIDER=gemini
```

**Getting API Keys:**
- **Gemini**: https://makersuite.google.com/app/apikey (Free tier available)
- **OpenAI**: https://platform.openai.com/api-keys (Paid, but powerful)

3. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Guide

### For Users
1. **Select Language**: Choose your preferred language from the dropdown
2. **Ask Questions**: 
   - Type your question in the text box
   - Or click the Microphone button and speak
3. **Share Images**: Click the Camera button to upload photos for visual analysis
4. **Listen to Responses**: Click the Listen button on assistant messages to hear responses

### For Developers

#### Adding New Languages
Edit `public/translations.json`:
```json
{
  "language_code": {
    "key": "translation text",
    ...
  }
}
```

Then add to language selector in `src/components/LanguageSelector.tsx`.

#### Connecting to Your LLM
Edit `src/lib/llmAPI.ts`:
```typescript
export async function callLLMAPI(messages, provider) {
  // Replace with your API implementation
}
```

#### Customizing UI
- **Colors**: Edit Tailwind classes in components
- **Icons**: Import from `lucide-react`
- **Fonts**: Modify in `src/app/layout.tsx`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ChatInterface.tsx   # Main chat component
│   ├── ChatMessage.tsx     # Message display
│   ├── ImageUpload.tsx     # Image upload handler
│   ├── LanguageSelector.tsx # Language switcher
│   └── ConnectionStatusBanner.tsx
├── context/
│   └── LanguageContext.tsx # Multilingual state management
├── hooks/
│   ├── useVoiceHooks.ts    # Voice input/output
│   └── useConnectionStatus.ts
└── lib/
    └── llmAPI.ts           # LLM API integration

public/
└── translations.json       # Language translations
```

## 🎨 Design Philosophy

- **Simple is Better**: Avoid complexity and technical jargon
- **Rural-First**: Design for low bandwidth and touch interfaces
- **Accessibility**: Every user deserves access regardless of ability
- **Inclusive**: Support multiple languages and input methods

## 🔧 Technologies Used

- **Framework**: Next.js 14 with React 19
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **APIs**: Web Speech API, Fetch API, Geolocation API
- **State Management**: React Context API
- **Language Support**: Custom i18n solution

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t hackathon .
docker run -p 3000:3000 hackathon
```

### Manual
```bash
npm run build
npm start
```

## 📊 Performance Optimizations

- Code splitting for faster initial load
- Image optimization with Next.js Image component
- CSS purging with Tailwind
- Lazy loading of components
- Voice synthesis caching

## 🐛 Troubleshooting

### Voice Input Not Working
- Check browser support (Chrome/Edge/Safari 14+)
- Ensure microphone permissions are granted
- Verify language code is supported

### Text-to-Speech Issues
- Some languages may have limited browser support
- Check system language pack availability
- Try a different browser

### Slow API Responses
- Check internet connection
- Verify API key is valid
- Consider using mock API for development

## 📝 License

MIT - Feel free to use this project for educational and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Add more language support
- Improve voice recognition accuracy
- Add gesture-based navigation
- Implement image analysis for crop diseases
- Add offline capability with service workers

## 📞 Support

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Review component documentation
3. Open an issue on GitHub

## 🌟 Credits

Built with ❤️ for rural communities by developers who believe technology should be accessible to everyone.

---

**Happy Coding! 🎉**
