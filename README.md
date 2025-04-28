# 🛡️ toolDb - QUICK REFERENCE GUIDE TO USEFUL TOOLS AND COMMANDS

<div align="center">

![toolDb](https://img.shields.io/badge/toolDb-1.0.0-brightgreen)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

A fun interface for managing and organizing pen testing tools and commands. Built with React, TypeScript, and Chakra UI.

## 🚀 Features

- 📝 Collection of tools and commands
- 🔍 Search across tools, descriptions, and commands
- 🏷️ Category-based filtering system
- 🎨 Interactive UI with smooth animations
- ➕ Add your own tools and commands
- 📱 Fully responsive design
- 🌙 Dark mode optimized

## 🛠️ Tools Included

### Reconnaissance
- Nmap (Network scanning and enumeration)

### Web Security
- Burp Suite (Web application testing)
- SQLMap (SQL injection automation)
- Gobuster (Directory enumeration)
- Nikto (Web server scanning)
- Dirb (Web content scanning)

### Password Attacks
- Hydra (Password brute-forcing)
- John the Ripper (Password cracking)
- Hashcat (Advanced password recovery)

### Network Analysis
- Wireshark (Packet analysis)
- Responder (LLMNR/NBT-NS/MDNS poisoning)

### Wireless
- Aircrack-ng (Wireless security testing)

### Post Exploitation
- Empire (Post-exploitation framework)
- Mimikatz (Credential dumping)

## 🏃‍♂️ Quick Start

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/toolDb.git
cd toolDb
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`

## 💻 Development

The project uses:
- React 19.0.0
- TypeScript
- Vite
- Chakra UI
- React Icons

### Project Structure
\`\`\`
src/
├── pages/
│   └── Tools.tsx      # Main tools interface
├── App.tsx           # Root component
├── main.tsx         # Entry point
└── index.css        # Global styles
\`\`\`

## 🎨 Customization

### Adding New Tools

1. Click the "Add New Tool" button
2. Fill in the tool details:
   - Name
   - Category
   - Description
   - Commands (one per line)
3. Click "Add Tool" to save

### Categories

Current categories include:
- Reconnaissance
- Web Security
- Password Attacks
- Network Analysis
- Wireless
- Post Exploitation
- Network Attacks

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Disclaimer

This tool is designed for educational purposes and legitimate penetration testing activities only. Users are responsible for ensuring they comply with all applicable laws and regulations when using the included tools and commands.

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!
