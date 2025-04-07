class KadaneVisualizer {
    constructor() {
        this.array = [];
        this.maxSoFar = 0;
        this.maxEndingHere = 0;
        this.currentIndex = 0;
        this.isVisualizing = false;
        this.isPaused = false;
        this.animationSpeed = 2000; // milliseconds

        // DOM elements
        this.arrayElements = document.getElementById('arrayElements');
        this.currentSumDisplay = document.getElementById('currentSum');
        this.maxSumDisplay = document.getElementById('maxSum');
        this.generateButton = document.getElementById('generateArray');
        this.startButton = document.getElementById('startVisualization');
        this.pauseButton = document.getElementById('pauseVisualization');
        this.resetButton = document.getElementById('reset');
        this.userInput = document.getElementById('userInput');
        this.useInputButton = document.getElementById('useInput');

        // Event listeners
        this.generateButton.addEventListener('click', () => this.generateNewArray());
        this.startButton.addEventListener('click', () => this.startVisualization());
        this.pauseButton.addEventListener('click', () => this.togglePause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.useInputButton.addEventListener('click', () => this.useUserInput());

        // Initialize
        this.generateNewArray();
    }

    useUserInput() {
        const input = this.userInput.value.trim();
        if (input) {
            this.array = input.split(',').map(num => parseInt(num.trim()));
            if (this.array.some(isNaN)) {
                alert('Please enter valid numbers separated by commas');
                return;
            }
            this.displayArray();
            this.reset();
        }
    }

    generateNewArray() {
        // Generate array of 8 random numbers between -10 and 10
        this.array = Array.from({ length: 8 }, () => Math.floor(Math.random() * 21) - 10);
        this.displayArray();
        this.reset();
    }

    displayArray() {
        this.arrayElements.innerHTML = '';
        this.array.forEach((num, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = num;
            element.dataset.index = index;
            this.arrayElements.appendChild(element);
        });
    }

    highlightElement(index, className) {
        const elements = document.querySelectorAll('.array-element');
        elements.forEach(el => el.classList.remove('active', 'visited'));
        if (index >= 0 && index < elements.length) {
            elements[index].classList.add(className);
        }
    }

    clearAllHighlighting() {
        const elements = document.querySelectorAll('.array-element');
        elements.forEach(el => {
            el.classList.remove('active', 'visited');
        });
    }

    togglePause() {
        if (this.isVisualizing) {
            this.isPaused = !this.isPaused;
            if (this.isPaused) {
                this.pauseButton.textContent = 'Resume';
                this.pauseButton.classList.add('paused');
            } else {
                this.pauseButton.textContent = 'Pause';
                this.pauseButton.classList.remove('paused');
            }
        }
    }

    async waitForResume() {
        while (this.isPaused && this.isVisualizing) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    async kadaneAlgorithm() {
        this.maxSoFar = 0;
        this.maxEndingHere = 0;
        this.currentIndex = 0;
        this.isVisualizing = true;
        this.isPaused = false;
        
        // Update button states
        this.startButton.disabled = true;
        this.generateButton.disabled = true;
        this.useInputButton.disabled = true;
        this.pauseButton.disabled = false;
        this.resetButton.disabled = false;
        this.pauseButton.textContent = 'Pause';
        this.pauseButton.classList.remove('paused');

        for (let i = 0; i < this.array.length; i++) {
            // Check if visualization was reset
            if (!this.isVisualizing) return;
            
            this.currentIndex = i;
            this.highlightElement(i, 'active');

            const currentElement = this.array[i];
            const previousSum = this.maxEndingHere;
            const potentialSum = previousSum + currentElement;
            
            // Show the calculation before applying it
            this.currentSumDisplay.textContent = `${previousSum} + ${currentElement} = ${potentialSum}`;
            await new Promise(resolve => setTimeout(resolve, this.animationSpeed / 2));
            await this.waitForResume();
            
            // Check if visualization was reset during pause
            if (!this.isVisualizing) return;
            
            // Check if sum would become negative
            if (potentialSum < 0) {
                this.currentSumDisplay.textContent = `${potentialSum} (Negative sum, resetting to 0)`;
                await new Promise(resolve => setTimeout(resolve, this.animationSpeed));
                await this.waitForResume();
                
                // Check if visualization was reset during pause
                if (!this.isVisualizing) return;
                
                this.maxEndingHere = 0;
            } else {
                this.maxEndingHere = potentialSum;
            }
            
            this.currentSumDisplay.textContent = this.maxEndingHere;
            
            if (this.maxEndingHere > this.maxSoFar) {
                this.maxSoFar = this.maxEndingHere;
                this.maxSumDisplay.textContent = this.maxSoFar;
            }

            this.highlightElement(i, 'visited');
            await new Promise(resolve => setTimeout(resolve, this.animationSpeed ));
            await this.waitForResume();
            
            // Check if visualization was reset during pause
            if (!this.isVisualizing) return;
        }

        // Visualization complete
        this.isVisualizing = false;
        this.isPaused = false;
        
        // Update button states
        this.startButton.disabled = false;
        this.generateButton.disabled = false;
        this.useInputButton.disabled = false;
        this.pauseButton.disabled = true;
        this.resetButton.disabled = false;
        this.pauseButton.textContent = 'Pause';
        this.pauseButton.classList.remove('paused');
        this.clearAllHighlighting();
    }

    startVisualization() {
        if (!this.isVisualizing) {
            this.kadaneAlgorithm();
        }
    }

    reset() {
        // Stop visualization if running
        this.isVisualizing = false;
        this.isPaused = false;
        
        // Reset algorithm variables
        this.maxSoFar = 0;
        this.maxEndingHere = 0;
        this.currentIndex = 0;

        // Reset visual elements
        this.currentSumDisplay.textContent = '0';
        this.maxSumDisplay.textContent = '0';
        
        // Reset button states
        this.startButton.disabled = false;
        this.generateButton.disabled = false;
        this.useInputButton.disabled = false;
        this.pauseButton.disabled = true;
        this.resetButton.disabled = false;
        this.pauseButton.textContent = 'Pause';
        this.pauseButton.classList.remove('paused');
        
        // Clear all highlighting from array elements
        this.clearAllHighlighting();
        
        // Force a re-render of the array elements to ensure no highlighting remains
        this.displayArray();
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new KadaneVisualizer();
}); 