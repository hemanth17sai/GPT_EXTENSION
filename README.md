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
   - Go to https://chatgpt.com/g/* or https://chatgpt.com/c/*

2. **Start chatting**
   - Ask questions as you normally would
   - Your questions will automatically appear in the sidebar on the right

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
- Direct message/email
- Share screenshots of any issues

## Known Limitations

- Only works on ChatGPT pages (chatgpt.com)
- Sidebar resets when switching between conversations
- Questions are extracted from the DOM, so formatting is simplified

## Technical Details

- **Manifest Version**: 3
- **Bundled with**: Custom bundler (outputs to `dist/main.js`)
- **CSS**: Injected via content script
- **No external dependencies**: Pure vanilla JavaScript

## Development

If you want to modify the extension:

1. **Source files**:
   - `main.js` - Entry point
   - `navigation.js` - URL change detection
   - `utils.js` - Sidebar building and DOM utilities
   - `chatState.js` - State management
   - `fetch.js` - Question processing
   - `style.css` - Styling

2. **After making changes**:
   - Rebuild `dist/main.js` (if using a bundler)
   - Go to `chrome://extensions`
   - Click the refresh icon on the extension card
   - Hard refresh ChatGPT page (Ctrl+Shift+R or Cmd+Shift+R)

## Troubleshooting

**Extension not appearing?**
- Make sure you're on a ChatGPT page (chatgpt.com/g/* or chatgpt.com/c/*)
- Check the browser console (F12) for any errors
- Try reloading the extension from chrome://extensions

**Questions not showing up?**
- Verify the sidebar is visible (look for ☰ button if hidden)
- Check if questions have the correct DOM structure
- Open browser console to see any warnings

**Sidebar looks broken?**
- Make sure `style.css` is being loaded
- Check manifest.json includes the CSS file

---

Thanks for testing! Your feedback helps make this better.
