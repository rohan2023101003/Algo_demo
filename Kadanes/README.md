# Kadane's Algorithm Visualization

This is an interactive visualization of Kadane's algorithm, which finds the maximum subarray sum in a given array of integers.

## Features

- Interactive visualization of the algorithm steps
- Random array generation
- Step-by-step explanation of the algorithm
- Visual highlighting of current and processed elements
- Clear display of intermediate and final results

## How to Use

1. Open `index.html` in a web browser
2. Click "Generate New Array" to create a new random array
3. Click "Start Visualization" to see the algorithm in action
4. Click "Reset" to clear the current visualization

## How it Works

The visualization shows how Kadane's algorithm works:

1. It maintains two variables:
   - `maxSoFar`: The maximum subarray sum found so far
   - `maxEndingHere`: The maximum subarray sum ending at the current position

2. For each element in the array:
   - Updates `maxEndingHere` to be the maximum of:
     - The current element
     - The sum of `maxEndingHere` and the current element
   - If `maxEndingHere` becomes greater than `maxSoFar`, updates `maxSoFar`

3. The final value of `maxSoFar` is the maximum subarray sum

## Visual Elements

- Blue boxes: Array elements
- Green highlight: Current element being processed
- Yellow highlight: Previously processed elements
- Step-by-step explanation appears in the algorithm steps section

## Technical Details

- Built with vanilla JavaScript
- Uses CSS animations for smooth transitions
- Responsive design that works on different screen sizes 