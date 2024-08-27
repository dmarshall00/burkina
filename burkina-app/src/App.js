import './App.css';
import './languages.js'
import './script.js'


function App() {
  return (
    <div class="container">
        <div class="card input-wrapper">
            <div class="from">
                <div class="dropdown-container" id="input-language">
                    <div class="dropdown-toggle">
                        <ion-icon name="globe-outline"></ion-icon>
                        <span class="selected" data-value="auto">Select Language</span>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </div>
                    <ul class="dropdown-menu"></ul>
                </div>
                <div class="text-area">
                    <textarea id="input-text" cols="30" rows="10" placeholder="Enter your text here..."></textarea>
                    <div class="chars"><span id="input-chars">0</span> / 10000 </div>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="swap-position">
                <ion-icon name="swap-horizontal-outline"></ion-icon>
            </div>
        </div>
        <div class="card output-wrapper">
            <div class="to">
                <div class="dropdown-container" id="output-language">
                    <div class="dropdown-toggle">
                        <ion-icon name="globe-outline"></ion-icon>
                        <span class="selected" data-value="en">English</span>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </div>
                    <ul class="dropdown-menu"></ul>
                </div>
                <div class="text-area">
                    <textarea id="output-text" cols="30" rows="10"
                        placeholder="Translated text will appear here..."></textarea>
                </div>
            </div>
        </div>
        <script src="scripts/languages.js"></script>
        <script src="scripts/script.js"></script>
    </div>
  );
}

export default App;
