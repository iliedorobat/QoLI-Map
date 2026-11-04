# [European Life Index](http://life-index.eu/)

## About the Project

The European Life Leaf (eLife) is a data-driven platform designed to provide a comprehensive perspective on quality of life across European countries. It integrates 76 indicators identified by Eurostat as relevant to population well-being, organized into eight objective dimensions and one subjective dimension. The platform allows users to explore and visualize individual indicators, examine relationships between different factors, and assess their combined impact through a single, holistic measure: the Quality of Life Index (QoLI). Users can analyze indicator trends and gain insights into the factors influencing quality of life.

### Homepage

<img width="1726" alt="01" src="https://github.com/user-attachments/assets/e2c44656-6402-4ba0-8cfc-69a39a84d83f">

### Data Insights

<img width="1727" alt="02" src="https://github.com/user-attachments/assets/e83c938f-150f-411e-b2f4-3a80ae111824">

<img width="1727" alt="03" src="https://github.com/user-attachments/assets/34ea74a4-165c-4376-97e6-0f0e2e2c9460">

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/QoLI-Map.git
   cd QoLI-Map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the UI**
   ```bash
   cd ui
   npm install
   ```

4. **Set up the web server**
   ```bash
   cd ../web-server
   npm install
   ```

5. **Start the development server**
   ```bash
   # From the root directory
   npm start
   ```

## Technologies Used

This project is built with a modern tech stack:

- **Frontend Framework**: Angular 18.1.0
- **Language**: TypeScript 5.5.4
- **UI Components**:
    - Bootstrap 5.3.3
    - Angular Material 18.1.0
    - Font Awesome 6.5.2
    - Bootstrap Icons 1.11.3
- **Mapping**:
    - Leaflet 1.9.4
    - ngx-Leaflet 18.0.1
- **Data Visualization**: Chart.js 4.4.3 with ng2-charts 6.0.0
- **Backend**: Express.js 4.19.2
- **State Management & Reactivity**: RxJS 7.8.1
- **Internationalization**: @ngx-translate 15.0.0
- **Testing**:
    - Jasmine 5.1.2
    - Karma 6.4.3
- **Package Manager**: npm
