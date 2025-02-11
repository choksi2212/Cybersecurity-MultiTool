🛡️ CyberGuard: The Ultimate Cybersecurity Toolkit

CyberGuard is a powerful cybersecurity toolkit built with Python and React, designed to enhance digital security through cutting-edge techniques. Whether you’re a security researcher, ethical hacker, or privacy-conscious user, CyberGuard provides essential tools to safeguard data and detect threats.

🔍 Features
	•	🖼️ Image Forensics – Uncover hidden details in images, detect tampering, and analyze metadata.
	•	⌨️ Keystroke Authentication – Verify identity through unique typing patterns.
	•	🌐 Packet Sniffer – Monitor network traffic and analyze packets in real-time.
	•	🔑 Password Checker – Assess password strength and improve security.
	•	🕵️ Steganography – Hide and extract data inside images for secure communication.

🚀 Get Started
	1.	Clone the repository:

git clone https://github.com/yourusername/cyberguard.git


	2.	Follow setup instructions for backend (Python) and frontend (React).
	3.	Start protecting your data!

🛠️ Contributions

Contributions are welcome! Submit issues, suggest features, or fork the project to make improvements.

⚠️ Disclaimer

CyberGuard is for educational and ethical use only. Unauthorized use is strictly prohibited.

Stay safe, stay secure! 🛡️




🔍 Advanced Image Forensics Tool
A powerful image forensic analysis tool to detect tampering, verify authenticity, and analyze digital images.


🚀 Features
✅ Metadata Extraction → View EXIF metadata (Camera details, GPS, etc.)
✅ Histogram Analysis → Analyze pixel intensity distribution
✅ Clone Detection → Identify image forgery using pattern matching
✅ Edge & Shadow Detection → Find inconsistencies in lighting and shadows
✅ Error Level Analysis (ELA) → Identify modified regions in an image
✅ Fourier Transform Analysis → Detect anomalies in frequency components
✅ DCT-Based Forgery Detection → Spot image manipulation using Discrete Cosine Transform
✅ Checksum Verification → Generate MD5 & SHA-256 hashes for image integrity
✅ Intuitive GUI → User-friendly PyQt5 interface

🛠 Installation Guide
1️⃣ Clone the Repository
git clone https://github.com/your-username/image-forensics-tool.git
cd image-forensics-tool

2️⃣ Install Dependencies
pip install -r requirements.txt

If requirements.txt is missing, install dependencies manually:

pip install numpy opencv-python matplotlib exifread PyQt5 scikit-image pillow
3️⃣ Run the Application
python forensic.py

🎯 Usage Guide
📌 Step 1: Load an Image
Click "Load Image" → Select an image file (.jpg, .png, .jpeg)


📌 Step 2: Perform Analysis
Feature	Description
Extract Metadata	         Displays EXIF data (Camera info, GPS, etc.)
Show Histogram	                 Plots pixel intensity distribution
Clone Detection	                 Detects copy-move forgery using edge maps
Edge & Shadow Detection	         Identifies inconsistencies in lighting
Error Level Analysis (ELA)	 Highlights modified regions
Fourier Transform	         Analyzes image in frequency domain
DCT-Based Forgery Detection	 Identifies tampering using Discrete Cosine Transform
Checksum Verification	         Generates MD5 & SHA-256 hash values


📌 Step 3: View Results
Results will be displayed in the GUI Output Panel
Some features will generate visual plots
