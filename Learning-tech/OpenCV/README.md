
# learning-open-CV

A personal sandbox of Python scripts and Jupyter notebooks built while following the **FreeCodeCamp OpenCV** tutorial on YouTube. This collection walks through core OpenCV concepts—from basic image I/O and color transforms to edge detection, contour analysis, face detection/recognition, and more.

---

## 📖 Table of Contents

- [🚀 Features](#-features)  
- [🗂️ Project Structure](#️-project-structure)  
- [⚙️ Prerequisites](#️-prerequisites)  
- [💾 Installation](#-installation)  
- [▶️ Usage Examples](#️-usage-examples)  
- [🤝 Contributing](#-contributing)  
- [📄 License](#-license)  
- [✉️ Contact](#️-contact)  

---

## 🚀 Features

- **Image I/O & Display** (`read.py`, `basic.py`)  
- **Rescaling & Cropping** (`rescale.py`)  
- **Color Spaces** (`spaces.py`)  
- **Histogram Analysis** (`histogram.py`)  
- **Filtering & Smoothing** (`smoothing.py`)  
- **Edge & Gradient Detection** (`gradient_and_edge.py`)  
- **Thresholding** (`thres.py`)  
- **Bitwise Operations & Masking** (`bitwise.py`, `masking.py`)  
- **Drawing Primitives** (`draw.py`)  
- **Contour Detection** (`contours.py`)  
- **Geometric Transformations** (`transformations.py`)  
- **Channel Split & Merge** (`splitmerge.py`)  
- **Face Detection & Recognition**  
  - **Detection**: `face_detect.py` (Haar cascade)  
  - **Training**: `faces_train.py` → produces `features.npy`, `labels.npy`, `face_trained.yml`  
  - **Recognition**: `face_recognization.py`  
- **Interactive Tutorial**: `simpsons.ipynb` with inline explanations  
- **Sample Assets**:  
  - `photos/`, `videos/` for test media  
  - `Faces/` for recognition training images  

---

## 🗂️ Project Structure


learning-open-CV/
├── Faces/                 # Images used for face-recognition training
├── photos/                # Sample images
├── videos/                # Sample video clips
├── basic.py               # I/O, grayscale, blur, edges, dilation/erosion, resize, crop
├── read.py                # Simple image read & display
├── rescale.py             # Resizing utilities
├── spaces.py              # Color-space conversions
├── histogram.py           # Plotting image histograms
├── smoothing.py           # Blurring filters
├── gradient\_and\_edge.py   # Sobel, Laplacian, Canny edges
├── thres.py               # Thresholding
├── bitwise.py             # Bitwise mask operations
├── masking.py             # Applying masks
├── draw\.py                # Drawing shapes/text
├── contours.py            # Contour detection/drawing
├── splitmerge.py          # Channel splitting/merging
├── transformations.py     # Rotate, flip, warp perspective
├── face\_detect.py         # Haar-cascade face detection
├── faces\_train.py         # Train LBPH face recognizer
├── face\_recognization.py  # Recognize faces
├── haar\_face.xml          # Pretrained Haar cascade
├── features.npy           # Extracted training features
├── labels.npy             # Corresponding labels
├── face\_trained.yml       # Serialized recognizer model
└── simpsons.ipynb         # Jupyter tutorial with commentary



---

## ⚙️ Prerequisites

- **Python 3.7+**  
- **OpenCV** (`opencv-python`)  
- **NumPy**  
- *(Optional)* **Jupyter Notebook** for `simpsons.ipynb`  

---

## 💾 Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Hemantcods/learning-open-CV.git
   cd learning-open-CV

2. **(Recommended) Create a virtual environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate   # macOS/Linux
   venv\Scripts\activate      # Windows
   ```
3. **Install dependencies**

   ```bash
   pip install --upgrade pip
   pip install opencv-python numpy
   ```


## ▶️ Usage Examples

* **Run a script** (e.g. show filters):

  ```bash
  python basic.py
  ```
* **Detect faces**:

  ```bash
  python face_detect.py --image photos/group.jpg
  ```
* **Train & recognize**:

  ```bash
  python faces_train.py
  python face_recognization.py --image Faces/user1.jpg
  ```
* **Open tutorial notebook**:

  ```bash
  jupyter notebook simpsons.ipynb
  ```

---

## 🤝 Contributing

1. Fork
2. Create branch: `git checkout -b feature/YourFeature`
3. Commit: `git commit -m "Add YourFeature"`
4. Push & PR: `git push origin feature/YourFeature`

Please follow PEP 8 and add docstrings or comments for new code.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## ✉️ Contact

**Hemant** — [hy564636@gmail.com](mailto:hy564636@gmail.com)

*Originally built while learning OpenCV on the FreeCodeCamp YouTube channel.*

Project link: [https://github.com/Hemantcods/learning-open-CV](https://github.com/Hemantcods/learning-open-CV)

```
```
