# ChatGPT Question Sidebar

A Chrome extension that shows all your questions in a collapsible sidebar when using ChatGPT, making it easy to navigate long conversations.

## Features

- **Sidebar Navigation**: All your questions appear in a sidebar on the right
- **Quick Jump**: Click any question to scroll directly to that part of the conversation
- **Collapsible**: Hide/show the sidebar with a toggle button
- **Resizable**: Drag the left edge to resize the sidebar width
- **Auto-sync**: New questions automatically appear as you chat
- **URL Change Detection**: Sidebar resets when you switch between chats

## Installation

Since this is a local development extension, follow these steps:

1. **Download the extension**
   - Clone or download this repository to your computer

2. **Open Chrome Extensions page**
   - Go to `chrome://extensions` in your browser
   - Or click Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the extension**
   - Click "Load unpacked"
   - Select the `GPT_EXTENSION` folder (the one containing `manifest.json`)

5. **Verify installation**
   - You should see "ChatGPT Question Sidebar (Dev)" in your extensions list

## Usage

1. **Open ChatGPT**
2. **Start chatting**
   - Ask questions as you normally would
   - Your questions will automatically appear in the sidebar on the right or look for a hamburger icon and press it.

3. **Navigate**
   - Click any question in the sidebar to jump to that part of the conversation

4. **Toggle sidebar**
   - Click the × button to hide the sidebar
   - Click the ☰ button (bottom right) to show it again

5. **Resize**
   - Drag the left edge of the sidebar to adjust its width

## Giving Feedback

I'd love to hear your thoughts! Please share:

- **What works well**: Features you find useful
- **What's broken**: Any bugs or errors you encounter
- **What's missing**: Features you'd like to see
- **UI/UX feedback**: Design improvements or usability issues

You can send feedback via:
- [Create an issue on GitHub] (if applicable)
- Direct message, you have my number 😉

## Known Limitations

- Only works on ChatGPT Desktop pages (chatgpt.com)
- Sidebar resets when switching between conversations
- Questions are extracted from the DOM, so formatting is simplified

## Technical Details

- **Manifest Version**: 3
- **Bundled with**: Custom bundler (outputs to `dist/main.js`)
- **CSS**: Injected via content script
- **No external dependencies**: Pure vanilla JavaScript

### Note
If you're facing trouble with anything, kindly contact me or raise an issue in Github. currently I'm testing it. any kind of feedback is valuable. Cheers!!


Thanks for testing! Your feedback helps make this better.
